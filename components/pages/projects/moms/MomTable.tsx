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

import axios from "axios";
import { format } from "date-fns";
import { MoreHorizontal, Pen, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import EditMomModal from "@/components/modals/editModals/EditMomModal";
import useEditMomModal from "@/hooks/editModalHooks/useEditMomModal";

interface MomTableProps {
  project: any;
  moms: any;
  user: any;
}



/**
 * Component representing a table of resources
 * @param project The project data
 * @param moms Array of MoMs to display
 * @param user The user data
 */


export const MomTable = ({ 
    project, 
    moms, 
    user 
}: MomTableProps) => {

  const router = useRouter();
  const editMomModal = useEditMomModal();
  const [isLoading, setIsLoading] = useState(false);
  const [sureToDeleteId, setSureToDeleteId] = useState<string | null>(null);

  const clickEdit = (mom: any) => {
    editMomModal.onOpen();
  };

  /**
   * Handler for clicking the delete button of an audit
   * @param mom The MoM data to delete
   */

  const clickDelete = async (mom: any) => {
    setIsLoading(true);
    try {
      await axios.delete(`/api/moms/${mom.id}`);
      router.refresh();
      toast.success("MoM deleted");
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
          <TableHead className="w-[150px] font-bold">Date</TableHead>
          <TableHead className="w-[150px] font-bold">Duration</TableHead>
          <TableHead className="w-[200px] font-bold">Link</TableHead>
          <TableHead className="font-bold w-[45rem]">Comments</TableHead>
          {user.role === "MANAGER" ? (
            <TableHead className="w-[130px]">Actions</TableHead>
          ) : (
            <div></div>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>


        {moms.map((mom: any, index: number) => (
          <>
          <EditMomModal mom={mom}/>
          <TableRow key={mom.id} className="dark:border-slate-600">

            <TableCell className="font-medium">{index}</TableCell>

            <TableCell>{format(new Date(mom.date), "MMM do yyyy")}</TableCell>

            <TableCell className="">{mom.duration} mins.</TableCell>
            

            <TableCell>{mom.link}</TableCell>

            <TableCell>
              {mom.comments}
              {mom.isEdited ? (
                 <span className="text-neutral-400 text-[12px] ml-2">(edited)</span>
              ) : (
                <div></div>
              )}
            </TableCell>

            {user.role === "MANAGER" && (
              <TableCell className="flex items-center justify-start gap-5">
                {sureToDeleteId === mom.id ? (
                  <>
                    
                  </>
                ) : (
                  <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <MoreHorizontal
                                className="hover:opacity-50 hover:cursor-pointer transition font-bold"
                                onClick={() => toggleSureToDelete(mom.id)}
                            />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-32 z-[9999] bg-white dark:bg-neutral-800 border-none rounded-[5px]">
                            <DropdownMenuGroup>
                                <DropdownMenuItem 
                                    className="hover:cursor-pointer rounded-[5px] focus:bg-neutral-100 dark:focus:bg-neutral-700"
                                    onClick={() => {clickEdit(mom)}}
                                >
                                    <Pen className="mr-2 h-4 w-4"/>
                                    <span>Edit</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                    className="hover:cursor-pointer rounded-[5px] focus:bg-neutral-100 dark:focus:bg-neutral-700"
                                    onClick={() => {clickDelete(mom)}}
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
