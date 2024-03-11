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
    try {
      await axios.delete(`/api/audits/${audit.id}`);
      toast.success("Deleted audit");
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
    setEditAuditId(null);
    editAuditModal.onClose();
  }

  return (
    <>
    {editAuditId && (
        <EditAuditModal audit={audits.find((res: any) => res.id === editAuditId)} onClose={closeEditModal}/>
    )}
    <Table className="">
      <TableHeader className="bg-neutral-200 dark:bg-neutral-800">
        <TableRow>
          <TableHead className="w-[100px] font-bold">Serial</TableHead>
          <TableHead className="w-[180px] font-bold">Date</TableHead>
          <TableHead className="font-bold w-[45rem]">Body</TableHead>
          {user.role === "AUDITOR" ? (
            <TableHead className="">Actions</TableHead>
          ) : (
            <div></div>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {audits.map((audit: any, index: number) => (
          <>
          <TableRow key={audit.id} className="dark:border-slate-600">

            <TableCell className="font-medium">{index}</TableCell>

            <TableCell>{format(new Date(audit.date), "MMM do yyyy")}</TableCell>

            <TableCell>
              {audit.body} 
              {audit.isEdited ? (
                 <span className="text-neutral-400 text-[12px] ml-2">(edited)</span>
              ) : (
                <div></div>
              )}
            </TableCell>

            {user.role === "AUDITOR" && (
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
