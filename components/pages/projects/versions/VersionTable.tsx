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

import useDeleteAuditModal from "@/hooks/useDeleteAuditModal";
import axios from "axios";
import { format } from "date-fns";
import { MoreHorizontal, Pen, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Version } from "@prisma/client";
import EditVersionHistoryModal from "@/components/modals/editModals/EditVersionHistoryModal";
import useEditVersionHistoryModal from "@/hooks/editModalHooks/useEditVersionHistoryModal";

interface VersionTableProps {
  project: any;
  versions: any;
  user: any;
}


export const VersionTable = ({ project, versions, user }: VersionTableProps) => {
  const router = useRouter();
  const editVersionHistoryModal = useEditVersionHistoryModal();
  const deleteAuditModal = useDeleteAuditModal();
  const [isLoading, setIsLoading] = useState(false);
  const [sureToDeleteId, setSureToDeleteId] = useState<string | null>(null);
  const [editVersionId, setEditVersionId] = useState<string | null>(null);

  const clickEdit = (version: any) => {
    setEditVersionId(version.id);
    editVersionHistoryModal.onOpen();
  };

  /**
   * Handler for clicking the delete button of an audit
   * @param audit The audit data to delete
  */

  const clickDelete = async (version: any) => {
    setIsLoading(true);
    const backendServer = process.env.NEXT_PUBLIC_BACKEND_SERVER;
    try {
        await axios.delete(`${backendServer}/versions/${version.id}`, { data: { userId: user.id }});
        router.refresh();
        toast.success('Update deleted');
    } catch (firstError) {
        try {
            await axios.delete(`/api/versions/${version.id}`);
            router.refresh();
            toast.success('Update deleted (backup)');
        } catch (secondError : any) {
            const errorMessage = (secondError.response && secondError.response.data && secondError.response.data.error) || "An error occurred";
            toast.error(errorMessage);
        }
    }
  };

  const toggleSureToDelete = (versionId: string) => {
    setSureToDeleteId(sureToDeleteId === versionId ? null : versionId);
  };

  const closeEditModal = () => {
    setEditVersionId(null);
    editVersionHistoryModal.onClose();
  }

  return (
    <>
    {editVersionId && (
        <EditVersionHistoryModal user={user} version={versions.find((res: any) => res.id === editVersionId)} onClose={closeEditModal}/>
    )}
    <Table className="">
      <TableHeader className="bg-neutral-200 dark:bg-neutral-800">
        <TableRow>
          <TableHead className="w-[100px] font-bold">Serial</TableHead>
          <TableHead className="w-[180px] font-bold">Version</TableHead>
          <TableHead className="font-bold">Type</TableHead>
          <TableHead className="font-bold">Change</TableHead>
          <TableHead className="font-bold">Change reason</TableHead>
          <TableHead className="font-bold">Created by</TableHead>
          <TableHead className="font-bold">Revision date</TableHead>
          <TableHead className="font-bold">Approval date</TableHead>
          <TableHead className="font-bold">Approved by</TableHead>
          {(user.role === "MANAGER" || user.role === "ADMIN") ? (
            <TableHead className="font-bold">Actions</TableHead>
          ) : (
            <div></div>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {versions.map((version: Version, index: number) => (
          <>
          <TableRow key={version.id} className="dark:border-slate-600 text-[12px]">

            <TableCell className="font-medium">{index}</TableCell>

            <TableCell>{version.version}</TableCell>
            <TableCell>{version.changeType}</TableCell>
            <TableCell>{version.change}</TableCell>
            <TableCell>{version.changeReason}</TableCell>
            <TableCell>{version.createdBy}</TableCell>
            <TableCell>{format(new Date(version.revisionDate!), "MMM do yyyy")}</TableCell>
            <TableCell>{format(new Date(version.approvalDate!), "MMM do yyyy")}</TableCell>
            <TableCell>{version.approvedBy}</TableCell>
            {(user.role === "MANAGER" || user.role === "ADMIN") && (
              <TableCell className="flex items-center justify-start gap-5">
                {sureToDeleteId === version.id ? (
                  <>
                    
                  </>
                ) : (
                  <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <MoreHorizontal
                                className="hover:opacity-50 hover:cursor-pointer transition font-bold"
                                onClick={() => toggleSureToDelete(version.id)}
                            />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-32 z-[9999] bg-white dark:bg-neutral-800 border-none rounded-[5px]">
                            <DropdownMenuGroup>
                                <DropdownMenuItem 
                                    className="hover:cursor-pointer rounded-[5px] focus:bg-neutral-100 dark:focus:bg-neutral-700"
                                    onClick={() => {clickEdit(version)}}
                                >
                                    <Pen className="mr-2 h-4 w-4"/>
                                    <span>Edit</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                    className="hover:cursor-pointer rounded-[5px] focus:bg-neutral-100 dark:focus:bg-neutral-700"
                                    onClick={() => {clickDelete(version)}}
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
