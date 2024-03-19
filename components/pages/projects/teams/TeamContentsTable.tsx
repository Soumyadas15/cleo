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
import EditPhaseContentModal from "@/components/modals/editModals/EditTeamContentModal";
import useEditPhaseContentModal from "@/hooks/editModalHooks/useEditTeamContentModal";
import EditTeamContentModal from "@/components/modals/editModals/EditTeamContentModal";
import useEditTeamContentModal from "@/hooks/editModalHooks/useEditTeamContentModal";

interface TeamContentsTableProps {
  project: any;
  teamContents: any;
  user: any;
}



/**
 * Component representing a table of resources
 * @param project The project data
 * @param audits Array of audits to display
 * @param user The user data
 */


export const TeamContentsTable = ({ 
    project, 
    teamContents, 
    user 
}: TeamContentsTableProps) => {

    const router = useRouter();
    const editTeamContentModal = useEditTeamContentModal();
    const [isLoading, setIsLoading] = useState(false);
    const [sureToDeleteId, setSureToDeleteId] = useState<string | null>(null);
    const [editTeamContentId, setEditTeamContentId] = useState<string | null>(null);

    const clickEdit = (teamContent: any) => {
        setEditTeamContentId(teamContent.id);
        editTeamContentModal.onOpen();
    };

  const clickDelete = async (teamContent: any) => {
    setIsLoading(true);
    try {
      await axios.delete(`/api/teams/team-content/${teamContent.id}`);
      router.refresh();
      toast.success("Phase data deleted");
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setIsLoading(false);
      setSureToDeleteId(null);
    }
  };

  const toggleSureToDelete = (teamContentId: string) => {
    setSureToDeleteId(sureToDeleteId === teamContentId ? null : teamContentId);
};

const closeEditModal = () => {
    setEditTeamContentId(null);
    editTeamContentModal.onClose();
};

  return (
    <>
    {editTeamContentId && (
        <EditTeamContentModal user={user} teamContent={teamContents.find((res: any) => res.id === editTeamContentId)} onClose={closeEditModal} />
    )}
    <Table className="">
      <TableHeader className="bg-neutral-200 dark:bg-neutral-800">
        <TableRow>
          <TableHead className="w-[100px] font-bold">Serial</TableHead>
          <TableHead className="w-[150px] font-bold">Resources</TableHead>
          <TableHead className="w-[150px] font-bold">Role</TableHead>
          <TableHead className="w-[200px] font-bold">Availability</TableHead>
          <TableHead className="w-[200px] font-bold">Duration</TableHead>
          {(user.role === "MANAGER" || user.role === "ADMIN") ? (
            <TableHead className="w-[130px] font-bold">Actions</TableHead>
          ) : (
            <div></div>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>

        {teamContents.map((teamContent: any, index: number) => (
          <>
          <TableRow key={teamContent.id} className="dark:border-slate-600 text-[12px]">

            <TableCell className="font-medium">{index}</TableCell>

            <TableCell className="font-medium">{teamContent.resources} %</TableCell>
            

            <TableCell>{teamContent.role}</TableCell>

            <TableCell>{teamContent.availability} %</TableCell>

            <TableCell>{teamContent.duration} months</TableCell>


            {(user.role === "MANAGER" || user.role === "ADMIN") && (
              <TableCell className="flex items-center justify-start gap-5">
                {sureToDeleteId === teamContent.id ? (
                  <>
                    
                  </>
                ) : (
                  <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <MoreHorizontal
                                className="hover:opacity-50 hover:cursor-pointer transition font-bold"
                                onClick={() => toggleSureToDelete(teamContent.id)}
                            />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-32 z-[9999] bg-white dark:bg-neutral-800 border-none rounded-[5px]">
                            <DropdownMenuGroup>
                                <DropdownMenuItem 
                                    className="hover:cursor-pointer rounded-[5px] focus:bg-neutral-100 dark:focus:bg-neutral-700"
                                    onClick={() => {clickEdit(teamContent)}}
                                >
                                    <Pen className="mr-2 h-4 w-4"/>
                                    <span>Edit</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                    className="hover:cursor-pointer rounded-[5px] focus:bg-neutral-100 dark:focus:bg-neutral-700"
                                    onClick={() => {clickDelete(teamContent)}}
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
    </>
  );
};
