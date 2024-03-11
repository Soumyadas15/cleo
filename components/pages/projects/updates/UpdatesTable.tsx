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

import axios from "axios";
import { format } from "date-fns";
import { MoreHorizontal, Pen, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import EditUpdateModal from "@/components/modals/editModals/EditUpdateModal";
import useEditUpdateModal from "@/hooks/editModalHooks/useEditUpdateModa";

interface UpdateTableProps {
  project: any;
  updates: any;
  user: any;
}



/**
 * Component representing a table of audits
 * @param project The project data
 * @param audits Array of audits to display
 * @param user The user data
 */


export const UpdateTable = ({ project, updates, user }: UpdateTableProps) => {
  const router = useRouter();
  const editUpdateModal = useEditUpdateModal();
  const [isLoading, setIsLoading] = useState(false);
  const [sureToDeleteId, setSureToDeleteId] = useState<string | null>(null);
  const [editUpdateId, setEditUpdateId] = useState<string | null>(null);

  const clickEdit = (update: any) => {
    setEditUpdateId(update.id);
    editUpdateModal.onOpen();
  };

  /**
   * Handler for clicking the delete button of an audit
   * @param audit The audit data to delete
   */

  const clickDelete = async (update: any) => {
    setIsLoading(true);
    try {
      await axios.delete(`/api/updates/${update.id}`);
      toast.success("Deleted update");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
      setSureToDeleteId(null);
    }
  };

  const toggleSureToDelete = (auditId: string) => {
    setSureToDeleteId(sureToDeleteId === auditId ? null : auditId);
  };

  const closeEditModal = () => {
    setEditUpdateId(null);
    editUpdateModal.onClose();
  }

  return (
    <>
    {editUpdateId && (
          <EditUpdateModal update={updates.find((res: any) => res.id === editUpdateId)} onClose={closeEditModal} />
    )}
    <Table className="">
      <TableHeader className="bg-neutral-200 dark:bg-neutral-800">
        <TableRow>
          <TableHead className="w-[100px] font-bold">Serial</TableHead>
          <TableHead className="w-[180px] font-bold">Date</TableHead>
          <TableHead className="font-bold w-[45rem]">Body</TableHead>
          {(user.role === "MANAGER" || user.role === "ADMIN") ? (
            <TableHead className="">Actions</TableHead>
          ) : (
            <div></div>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {updates.map((update: any, index: number) => (
          <>
          <TableRow key={update.id} className="dark:border-slate-600">

            <TableCell className="font-medium">{index}</TableCell>

            <TableCell>{format(new Date(update.date), "MMM do yyyy")}</TableCell>

            <TableCell>
              {update.body} 
              {update.isEdited ? (
                 <span className="text-neutral-400 text-[12px] ml-2">(edited)</span>
              ) : (
                <div></div>
              )}
            </TableCell>

            {(user.role === "MANAGER" || user.role === "ADMIN") && (
              <TableCell className="flex items-center justify-start gap-5">
                {sureToDeleteId === update.id ? (
                  <>
                    
                  </>
                ) : (
                  <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <MoreHorizontal
                                className="hover:opacity-50 hover:cursor-pointer transition font-bold"
                                onClick={() => toggleSureToDelete(update.id)}
                            />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-32 z-[9999] bg-white dark:bg-neutral-800 border-none rounded-[5px]">
                            <DropdownMenuGroup>
                                <DropdownMenuItem 
                                    className="hover:cursor-pointer rounded-[5px] focus:bg-neutral-100 dark:focus:bg-neutral-700"
                                    onClick={() => {clickEdit(update)}}
                                >
                                    <Pen className="mr-2 h-4 w-4"/>
                                    <span>Edit</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                    className="hover:cursor-pointer rounded-[5px] focus:bg-neutral-100 dark:focus:bg-neutral-700"
                                    onClick={() => {clickDelete(update)}}
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
