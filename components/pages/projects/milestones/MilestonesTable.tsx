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
import DisplayText from "@/components/reusable/DisplayText";
import { Milestone } from "@prisma/client";
import EditMilestoneModal from "@/components/modals/editModals/EditMilestoneModal";
import useEditMilestoneModal from "@/hooks/editModalHooks/useMilestoneModal";
  
  interface MilestoneTableProps {
    project: any;
    milestones: any;
    user: any;
  }
  
  
  export const MilestoneTable = ({ project, milestones, user }: MilestoneTableProps) => {
    const router = useRouter();
    const editMiletoneModal = useEditMilestoneModal();  
    const [isLoading, setIsLoading] = useState(false);
    const [sureToDeleteId, setSureToDeleteId] = useState<string | null>(null);
    const [editMilestoneId, setEditMilestoneId] = useState<string | null>(null);
  
    const clickEdit = (milestone: any) => {
        setEditMilestoneId(milestone.id);
        editMiletoneModal.onOpen();
    };
  
    const clickDelete = async (milestone: any) => {
      setIsLoading(true);
      try {
        await axios.delete(`/api/audits/${milestone.id}`);
        toast.success("Deleted audit");
        router.refresh();
      } catch (error: any) {
        toast.error(error.response.data);
      } finally {
        setIsLoading(false);
        setSureToDeleteId(null);
      }
    };
  
    const toggleSureToDelete = (milestoneId: string) => {
      setSureToDeleteId(sureToDeleteId === milestoneId ? null : milestoneId);
    };
  
    const closeEditModal = () => {
      setEditMilestoneId(null);
      editMiletoneModal.onClose();
    }
  
    return (
      <>
      {editMilestoneId && (
          <EditMilestoneModal milestone={milestones.find((res: any) => res.id === editMilestoneId)} onClose={closeEditModal}/>
      )}
      <Table className="">
        <TableHeader className="bg-neutral-200 dark:bg-neutral-800">
          <TableRow>
            <TableHead className="font-bold">Serial</TableHead>
            <TableHead className="font-bold">Phase</TableHead>
            <TableHead className="font-bold">Start date</TableHead>
            <TableHead className="font-bold">Completion date</TableHead>
            <TableHead className="font-bold">Approval date</TableHead>
            <TableHead className="font-bold">Status</TableHead>
            <TableHead className="font-bold">Revised date</TableHead>
            <TableHead className="font-bold">Comments</TableHead>
            {(user.role === "ADMIN" || user.role === "MANAGER") ? (
              <TableHead className="font-bold">Actions</TableHead>
            ) : (
              <div></div>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {milestones.map((milestone: Milestone, index: number) => (
            <>
            <TableRow key={milestone.id} className="dark:border-slate-600 text-[12px]">
  
              <TableCell className="font-medium">{index}</TableCell>
              <TableCell>{milestone.phase}</TableCell>
              <TableCell>{format(new Date(milestone.startDate), "MMM do yyyy")}</TableCell>
              <TableCell>{format(new Date(milestone.completionDate), "MMM do yyyy")}</TableCell>
              <TableCell>{format(new Date(milestone.approvalDate), "MMM do yyyy")}</TableCell>
              <TableCell>{milestone.status}</TableCell>
              <TableCell>{format(new Date(milestone.revisedCompletionDate), "MMM do yyyy")}</TableCell>
              <TableCell><DisplayText text={milestone.comments} title="Comments" limit={30}/></TableCell>


              {(user.role === "ADMIN" || user.role === "MANAGER") && (
                <TableCell className="flex items-center justify-start gap-5">
                  {sureToDeleteId === milestone.id ? (
                    <>
                      
                    </>
                  ) : (
                    <>
                      <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                              <MoreHorizontal
                                  className="hover:opacity-50 hover:cursor-pointer transition font-bold"
                                  onClick={() => toggleSureToDelete(milestone.id)}
                              />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-32 z-[9999] bg-white dark:bg-neutral-800 border-none rounded-[5px]">
                              <DropdownMenuGroup>
                                  <DropdownMenuItem 
                                      className="hover:cursor-pointer rounded-[5px] focus:bg-neutral-100 dark:focus:bg-neutral-700"
                                      onClick={() => {clickEdit(milestone)}}
                                  >
                                      <Pen className="mr-2 h-4 w-4"/>
                                      <span>Edit</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                      className="hover:cursor-pointer rounded-[5px] focus:bg-neutral-100 dark:focus:bg-neutral-700"
                                      onClick={() => {clickDelete(milestone)}}
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