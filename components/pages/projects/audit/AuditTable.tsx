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

interface AuditTableProps {
  project: any;
  audits: any;
  user: any;
}



/**
 * Component representing a table of audits
 * @param project The project data
 * @param audits Array of audits to display
 * @param user The user data
 */


export const AuditTable = ({ project, audits, user }: AuditTableProps) => {
  const router = useRouter();
  const editAuditModal = useEditAuditModal();
  const deleteAuditModal = useDeleteAuditModal();
  const [isLoading, setIsLoading] = useState(false);
  const [sureToDeleteId, setSureToDeleteId] = useState<string | null>(null);
  const [editAuditId, setEditAuditId] = useState<string | null>(null);

  const clickEdit = (audit: any) => {
    setEditAuditId(audit.id);
    editAuditModal.onOpen();
  };

  /**
   * Handler for clicking the delete button of an audit
   * @param audit The audit data to delete
   */

  const clickDelete = async (audit: any) => {
    setIsLoading(true);
    const backendServer = process.env.NEXT_PUBLIC_BACKEND_SERVER;
    try {
        await axios.delete(`${backendServer}/audits/${audit.id}`, { data: { userId: user.id }});
        router.refresh();
        toast.success('Audit deleted');
    } catch (firstError) {
        try {
            await axios.delete(`/api/audits/${audit.id}`);
            router.refresh();
            toast.success('Audit deleted (backup)');
        } catch (secondError : any) {
            const errorMessage = (secondError.response && secondError.response.data && secondError.response.data.error) || "An error occurred";
            toast.error(errorMessage);
        }
    } finally {
        setIsLoading(false);
    }
  };

  const toggleSureToDelete = (auditId: string) => {
    setSureToDeleteId(sureToDeleteId === auditId ? null : auditId);
  };

  const closeEditModal = () => {
    setEditAuditId(null);
    editAuditModal.onClose();
  }

  return (
    <>
    {editAuditId && (
        <EditAuditModal project={project} user={user} audit={audits.find((res: any) => res.id === editAuditId)} onClose={closeEditModal}/>
    )}
    <Table className="">
      <TableHeader className="bg-neutral-200 dark:bg-neutral-800">
        <TableRow>
          <TableHead className="w-[100px] font-bold">Serial</TableHead>
          <TableHead className="w-[15rem] font-bold">Date</TableHead>
          <TableHead className="font-bold w-[40rem]">Reviewed sec.</TableHead>
          <TableHead className="font-bold w-[40rem]">Reviewed by</TableHead>
          <TableHead className="font-bold w-[40rem]">Status</TableHead>
          <TableHead className="font-bold w-[40rem]">Comments</TableHead>
          <TableHead className="font-bold w-[40rem]">Action</TableHead>
          {(user.role === "AUDITOR" || user.role === "ADMIN") ? (
            <TableHead className="font-bold">Actions</TableHead>
          ) : (
            <div></div>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {audits.map((audit: any, index: number) => (
          <>
          <TableRow key={audit.id} className="dark:border-slate-600 text-[12px]">

            <TableCell className="font-medium">{index}</TableCell>

            <TableCell>{format(new Date(audit.date), "MMM do yyyy")}</TableCell>

            <TableCell>{audit.reviewedSection}</TableCell>
            <TableCell>{audit.reviewedBy}</TableCell>
            <TableCell>{audit.status}</TableCell>
            <TableCell>
              <DisplayText title="Comments" text={audit.comments} limit={30}/>
            </TableCell>
            <TableCell>
              <DisplayText title="Action" text={audit.actionItem} limit={30}/>
            </TableCell>
            {(user.role === "AUDITOR" || user.role === "ADMIN") && (
              <TableCell className="flex items-center justify-start gap-5">
                {sureToDeleteId === audit.id ? (
                  <>
                    
                  </>
                ) : (
                  <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <MoreHorizontal
                                className="hover:opacity-50 hover:cursor-pointer transition font-bold"
                                onClick={() => toggleSureToDelete(audit.id)}
                            />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-32 z-[9999] bg-white dark:bg-neutral-800 border-none rounded-[5px]">
                            <DropdownMenuGroup>
                                <DropdownMenuItem 
                                    className="hover:cursor-pointer rounded-[5px] focus:bg-neutral-100 dark:focus:bg-neutral-700"
                                    onClick={() => {clickEdit(audit)}}
                                >
                                    <Pen className="mr-2 h-4 w-4"/>
                                    <span>Edit</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                    className="hover:cursor-pointer rounded-[5px] focus:bg-neutral-100 dark:focus:bg-neutral-700"
                                    onClick={() => {clickDelete(audit)}}
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
