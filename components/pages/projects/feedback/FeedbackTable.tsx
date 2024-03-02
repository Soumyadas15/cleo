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
import useEditResourceModal from "@/hooks/useEditResourceModal";

interface FeedbackTableProps {
  project: any;
  feedbacks: any;
  user: any;
}



/**
 * Component representing a table of resources
 * @param project The project data
 * @param audits Array of audits to display
 * @param user The user data
 */


export const FeedbackTable = ({ 
    project, 
    feedbacks, 
    user 
}: FeedbackTableProps) => {

  const router = useRouter();
  const editResourceModal = useEditResourceModal();
  const [isLoading, setIsLoading] = useState(false);
  const [sureToDeleteId, setSureToDeleteId] = useState<string | null>(null);

  const clickEdit = (feedback: any) => {
    router.push(`/main/projects/${project.id}/feedbacks/${feedback.id}`);
    editResourceModal.onOpen();
  };

  /**
   * Handler for clicking the delete button of an audit
   * @param feedback The feedback data to delete
   */

  const clickDelete = async (feedback: any) => {
    setIsLoading(true);
    try {
      await axios.delete(`/api/feedbacks/${feedback.id}`);
      toast.success("Resource deleted");
      router.refresh();
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
          <TableHead className="w-[150px] font-bold">Name</TableHead>
          <TableHead className="w-[150px] font-bold">Role</TableHead>
          <TableHead className="w-[200px] font-bold">Start Date</TableHead>
          <TableHead className="w-[200px] font-bold">End Date</TableHead>
          <TableHead className="font-bold w-[45rem]">Comment</TableHead>
          {user.role === "MANAGER" ? (
            <TableHead className="w-[130px]">Actions</TableHead>
          ) : (
            <div></div>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>


        {feedbacks.map((feedback: any, index: number) => (
          <TableRow key={feedback.id} className="dark:border-slate-600">

            <TableCell className="font-medium">{index}</TableCell>

            <TableCell className="font-medium">{feedback.type}</TableCell>
            

            <TableCell>{feedback.role}</TableCell>

            <TableCell>{format(new Date(feedback.date), "MMM do yyyy")}</TableCell>

            <TableCell>{format(new Date(feedback.endDate), "MMM do yyyy")}</TableCell>

            <TableCell>
              {feedback.comment}
              {feedback.isEdited ? (
                 <span className="text-neutral-400 text-[12px] ml-2">(edited)</span>
              ) : (
                <div></div>
              )}
            </TableCell>

            {user.role === "MANAGER" && (
              <TableCell className="flex items-center justify-start gap-5">
                {sureToDeleteId === feedback.id ? (
                  <>
                    
                  </>
                ) : (
                  <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <MoreHorizontal
                                className="hover:opacity-50 hover:cursor-pointer transition font-bold"
                                onClick={() => toggleSureToDelete(feedback.id)}
                            />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-32 z-[9999] bg-white dark:bg-neutral-800 border-none rounded-[5px]">
                            <DropdownMenuGroup>
                                <DropdownMenuItem 
                                    className="hover:cursor-pointer rounded-[5px] focus:bg-neutral-100 dark:focus:bg-neutral-700"
                                    onClick={() => {clickEdit(feedback)}}
                                >
                                    <Pen className="mr-2 h-4 w-4"/>
                                    <span>Edit</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                    className="hover:cursor-pointer rounded-[5px] focus:bg-neutral-100 dark:focus:bg-neutral-700"
                                    onClick={() => {clickDelete(feedback)}}
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
        ))}
      </TableBody>
    </Table>
  );
};
