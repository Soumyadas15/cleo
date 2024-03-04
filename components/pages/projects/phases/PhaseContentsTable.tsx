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

import { MoreHorizontal, Pen, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import EditPhaseContentModal from "@/components/modals/editModals/EditPhaseContentModal";
import useEditPhaseContentModal from "@/hooks/editModalHooks/useEditPhaseContentModal";

interface PhaseContentsTableProps {
  project: any;
  phaseContents: any;
  user: any;
}



/**
 * Component representing a table of resources
 * @param project The project data
 * @param audits Array of audits to display
 * @param user The user data
 */


export const PhaseContentsTable = ({ 
    project, 
    phaseContents, 
    user 
}: PhaseContentsTableProps) => {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [sureToDeleteId, setSureToDeleteId] = useState<string | null>(null);
  const editPhaseContentModal = useEditPhaseContentModal();

  /**
   * Handler for clicking the delete button of an audit
   * @param resource The audit data to delete
   */

  const clickDelete = async (phaseContent: any) => {
    console.log(phaseContent.id);
    setIsLoading(true);
    try {
      await axios.delete(`/api/phases/phase-content/${phaseContent.id}`);
      router.refresh();
      toast.success("Phase data deleted");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
      setSureToDeleteId(null);
    }
  };

  const toggleSureToDelete = (resourceId: string) => {
    setSureToDeleteId(sureToDeleteId === resourceId ? null : resourceId);
  };

  return (
    <Table className="">
      <TableHeader className="bg-neutral-200 dark:bg-neutral-800">
        <TableRow>
          <TableHead className="w-[100px] font-bold">Serial</TableHead>
          <TableHead className="w-[150px] font-bold">Resources</TableHead>
          <TableHead className="w-[150px] font-bold">Role</TableHead>
          <TableHead className="w-[200px] font-bold">Availability</TableHead>
          <TableHead className="w-[200px] font-bold">Duration</TableHead>
          {user.role === "MANAGER" ? (
            <TableHead className="w-[130px]">Actions</TableHead>
          ) : (
            <div></div>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>

        {phaseContents.map((phaseContent: any, index: number) => (
          <>
          <EditPhaseContentModal phaseContent={phaseContent}/>
          <TableRow key={phaseContent.id} className="dark:border-slate-600">

            <TableCell className="font-medium">{index}</TableCell>

            <TableCell className="font-medium">{phaseContent.resources} %</TableCell>
            

            <TableCell>{phaseContent.role}</TableCell>

            <TableCell>{phaseContent.availability} %</TableCell>

            <TableCell>{phaseContent.duration} months</TableCell>


            {user.role === "MANAGER" && (
              <TableCell className="flex items-center justify-start gap-5">
                {sureToDeleteId === phaseContent.id ? (
                  <>
                    
                  </>
                ) : (
                  <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <MoreHorizontal
                                className="hover:opacity-50 hover:cursor-pointer transition font-bold"
                                onClick={() => toggleSureToDelete(phaseContent.id)}
                            />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-32 z-[9999] bg-white dark:bg-neutral-800 border-none rounded-[5px]">
                            <DropdownMenuGroup>
                                <DropdownMenuItem 
                                    className="hover:cursor-pointer rounded-[5px] focus:bg-neutral-100 dark:focus:bg-neutral-700"
                                    onClick={editPhaseContentModal.onOpen}
                                >
                                    <Pen className="mr-2 h-4 w-4"/>
                                    <span>Edit</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                    className="hover:cursor-pointer rounded-[5px] focus:bg-neutral-100 dark:focus:bg-neutral-700"
                                    onClick={() => {clickDelete(phaseContent)}}
                                >
                                    <Trash className="mr-2 h-4 w-4 text-red-700 dark:text-500" />
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
  );
};
