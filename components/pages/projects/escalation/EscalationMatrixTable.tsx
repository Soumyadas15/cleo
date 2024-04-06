"use client"

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
import { Project, User } from "@prisma/client";
import useEditEscalationMatrixModal from "@/hooks/editModalHooks/useEditEscalationMatrixModal";
import EditEscalationMatrixModal from "@/components/modals/editModals/EditEscalationMatrixModal";
  


interface EscalationMatrixTableProps {
    project: Project;
    matrices: any;
    user: User;
}

  
export const EscalationMatrixTable = ({ 
    project, 
    matrices, 
    user ,
}: EscalationMatrixTableProps) => {
    const router = useRouter();
    const editEscalationMatrixModal = useEditEscalationMatrixModal();
    const deleteAuditModal = useDeleteAuditModal();
    const [isLoading, setIsLoading] = useState(false);
    const [sureToDeleteId, setSureToDeleteId] = useState<string | null>(null);
    const [editMatrixId, setEditMatrixId] = useState<string | null>(null);
  
    const clickEdit = (matrix: any) => {
        setEditMatrixId(matrix.id);
        editEscalationMatrixModal.onOpen();
    };
  
    /**
     * Handler for clicking the delete button of an audit
     * @param audit The audit data to delete
     */
  
    const clickDelete = async (data: any) => {
      setIsLoading(true);
      const backendServer = process.env.NEXT_PUBLIC_BACKEND_SERVER;
      try {
        await axios.delete(`${backendServer}/escalation/${data.id}`, { data: { userId: user.id }});
        router.refresh();
        toast.success('Escalation deleted');
      } catch (firstError) {
          try {
              await axios.delete(`/api/escalation/${data.id}`);
              router.refresh();
              toast.success('Escalation deleted (backup)');
          } catch (secondError : any) {
              const errorMessage = (secondError.response && secondError.response.data && secondError.response.data.error) || "An error occurred";
              toast.error(errorMessage);
          }
      } finally {
          setIsLoading(false);
      }
    };
  
    const toggleSureToDelete = (dataId: string) => {
      setSureToDeleteId(sureToDeleteId === dataId ? null : dataId);
    };
  
    const closeEditModal = () => {
      setEditMatrixId(null);
      editEscalationMatrixModal.onClose();
    }
  
    return (
      <>
      {editMatrixId && (
          <EditEscalationMatrixModal project={project} user={user} matrix={matrices.find((res: any) => res.id === editMatrixId)} onClose={closeEditModal}/>
      )}
      <Table className="scrollbar-hide">
        <TableHeader className="bg-neutral-200 dark:bg-neutral-800">
          <TableRow>
            <TableHead className="w-[100px] font-bold">Serial</TableHead>
            <TableHead className="w-[180px] font-bold">Level</TableHead>
            <TableHead className="font-bold w-[45rem]">Name</TableHead>
            {(user.role === "MANAGER" || user.role === "ADMIN") ? (
              <TableHead className="font-bold">Actions</TableHead>
            ) : (
              <div></div>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {matrices.map((data: any, index: number) => (
            <>
            <TableRow key={data.id} className="dark:border-slate-600 text-[12px]">
  
              <TableCell className="font-medium">{index}</TableCell>
              <TableCell>{data.level}</TableCell>
              <TableCell>{data.name} </TableCell>

              {(user.role === "MANAGER" || user.role === "ADMIN") && (
                <TableCell className="flex items-center justify-start gap-5">
                  {sureToDeleteId === data.id ? (
                    <>
                      
                    </>
                  ) : (
                    <>
                      <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                              <MoreHorizontal
                                  className="hover:opacity-50 hover:cursor-pointer transition font-bold"
                                  onClick={() => toggleSureToDelete(data.id)}
                              />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-32 z-[9999] bg-white dark:bg-neutral-800 border-none rounded-[5px]">
                              <DropdownMenuGroup>
                                  <DropdownMenuItem 
                                      className="hover:cursor-pointer rounded-[5px] focus:bg-neutral-100 dark:focus:bg-neutral-700"
                                      onClick={() => {clickEdit(data)}}
                                  >
                                      <Pen className="mr-2 h-4 w-4"/>
                                      <span>Edit</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                      className="hover:cursor-pointer rounded-[5px] focus:bg-neutral-100 dark:focus:bg-neutral-700"
                                      onClick={() => {clickDelete(data)}}
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
  