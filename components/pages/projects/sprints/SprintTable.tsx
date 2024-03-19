import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown"

import useAuditModal from "@/hooks/createModalHooks/useAuditModal";
import useDeleteAuditModal from "@/hooks/useDeleteAuditModal";
import useEditAuditModal from "@/hooks/editModalHooks/useEditAuditModal";
import axios from "axios";
import { format } from "date-fns";
import { MoreHorizontal, Pen, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import EditAuditModal from "@/components/modals/editModals/EditAuditModal";
import DisplayText from "@/components/reusable/DisplayText";
import { Project, Sprint, User } from "@prisma/client";
import EditSprintModal from "@/components/modals/editModals/EditSprintModal";
import useEditSprintModal from "@/hooks/editModalHooks/useEditSprintModal";

interface SprintTableProps {
  project: Project;
  sprints: Sprint[];
  user: User;
}


export const SprintTable = ({ project, sprints, user }: SprintTableProps) => {
  const router = useRouter();
  const editSprintModal = useEditSprintModal();
  const [sureToDeleteId, setSureToDeleteId] = useState<string | null>(null);
  const [editSprintId, setEditSprintId] = useState<string | null>(null);

  const clickEdit = (audit: any) => {
    setEditSprintId(audit.id);
    editSprintModal.onOpen();
  };

  const clickDelete = async (sprint: any) => {
    const backendServer = process.env.NEXT_PUBLIC_BACKEND_SERVER;
    try {
      await axios.delete(`${backendServer}/sprints/${sprint.id}`, { data: { userId: user.id }});
      router.refresh();
      toast.success('Sprint deleted');
    } catch (firstError) {
        try {
            await axios.delete(`/api/sprints/${sprint.id}`);
            router.refresh();
            toast.success('Sprint deleted (backup)');
        } catch (secondError : any) {
            const errorMessage = (secondError.response && secondError.response.data && secondError.response.data.error) || "An error occurred";
            toast.error(errorMessage);
        }
    }
  };

  const toggleSureToDelete = (auditId: string) => {
    setSureToDeleteId(sureToDeleteId === auditId ? null : auditId);
  };

  const closeEditModal = () => {
    setEditSprintId(null);
    editSprintModal.onClose();
  }

  return (
    <>
    {editSprintId && (
        <EditSprintModal 
         //@ts-ignore
          sprint={sprints.find((res: any) => res.id === editSprintId)} 
          onClose={closeEditModal}
          user={user}
        />
    )}
    <Table className="">
      <TableHeader className="bg-neutral-200 dark:bg-neutral-800">
        <TableRow>
          <TableHead className="w-[100px] font-bold">Serial</TableHead>
          <TableHead className="font-bold">Start date</TableHead>
          <TableHead className="font-bold">End date</TableHead>
          <TableHead className="font-bold">Status</TableHead>
          <TableHead className="font-bold">Comments</TableHead>
          {(user.role === "ADMIN" || user.role === "MANAGER") ? (
            <TableHead className="font-bold">Actions</TableHead>
          ) : (
            <div></div>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {sprints.map((sprint: Sprint, index: number) => (
          <>
          <TableRow key={sprint.id} className="dark:border-slate-600 text-[12px]">

            <TableCell className="font-medium">{index + 1}</TableCell>

            <TableCell>{format(new Date(sprint.startDate), "MMM do yyyy")}</TableCell>
            <TableCell>{format(new Date(sprint.endDate), "MMM do yyyy")}</TableCell>
            <TableCell>{sprint.status}</TableCell>
            <TableCell>
              <DisplayText title="Comments" text={sprint.comments} limit={30}/>
            </TableCell>
            {(user.role === "ADMIN" || user.role === "MANAGER") && (
              <TableCell className="flex items-center justify-start gap-5">
                {sureToDeleteId === sprint.id ? (
                  <>
                    
                  </>
                ) : (
                  <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <MoreHorizontal
                                className="hover:opacity-50 hover:cursor-pointer transition font-bold"
                                onClick={() => toggleSureToDelete(sprint.id)}
                            />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-32 z-[9999] bg-white dark:bg-neutral-800 border-none rounded-[5px]">
                            <DropdownMenuGroup>
                                <DropdownMenuItem 
                                    className="hover:cursor-pointer rounded-[5px] focus:bg-neutral-100 dark:focus:bg-neutral-700"
                                    onClick={() => {clickEdit(sprint)}}
                                >
                                    <Pen className="mr-2 h-4 w-4"/>
                                    <span>Edit</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                    className="hover:cursor-pointer rounded-[5px] focus:bg-neutral-100 dark:focus:bg-neutral-700"
                                    onClick={() => {clickDelete(sprint)}}
                                >
                                    <Trash className="mr-2 h-4 w-4 text-red-700 dark:text-red-500" />
                                    <span className="text-red-700 dark:text-red-500">Delete</span>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                )}
              </TableCell>
            )}
          </TableRow>
          </>
          
        ))}
      </TableBody>
    </Table>
    </>
  );
};
