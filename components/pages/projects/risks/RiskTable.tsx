"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { format } from "date-fns";
import toast from "react-hot-toast";
import useEditResourceModal from "@/hooks/editModalHooks/useEditResourceModal";
import EditResourceModal from "@/components/modals/editModals/EditResourceModal";
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
} from "@/components/ui/dropdown";
import { MoreHorizontal, Pen, Trash } from "lucide-react";
import EditRiskModal from "@/components/modals/editModals/EditRiskModal";
import useEditRiskModal from "@/hooks/editModalHooks/useEditRiskModal";
import DisplayText from "@/components/reusable/DisplayText";


interface RiskTableProps {
  project: any;
  risks: any;
  user: any;
}

export const RiskTable = ({
  project,
  risks,
  user,
}: RiskTableProps) => {
  const router = useRouter();
  const editRiskModal = useEditRiskModal();
  const [isLoading, setIsLoading] = useState(false);
  const [sureToDeleteId, setSureToDeleteId] = useState<string | null>(null);
  const [editRiskId, setEditResourceId] = useState<string | null>(null);

  const clickEdit = (risk: any) => {
    setEditResourceId(risk.id);
    editRiskModal.onOpen();
  };



  const clickDelete = async (risk: any) => {
    setIsLoading(true);
    try {
      await axios.delete(`/api/risks/${risk.id}`);
      router.refresh();
      toast.success("Risk deleted");
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setIsLoading(false);
      setSureToDeleteId(null);
    }
  };

  const toggleSureToDelete = (riskId: string) => {
    setSureToDeleteId(sureToDeleteId === riskId ? null : riskId);
  };

  const closeEditModal = () => {
    setEditResourceId(null);
    editRiskModal.onClose();
  };

  return (
    <>
      {editRiskId && (
        <EditRiskModal risk={risks.find((res: any) => res.id === editRiskId)} onClose={closeEditModal}/>
      )}
      <Table className="scrollbar-hide">
        <TableHeader className="bg-neutral-200 border-none dark:bg-neutral-800">
          <TableRow>
            <TableHead className="w-[100px] font-bold">Serial</TableHead>
            <TableHead className="w-[150px] font-bold">Type</TableHead>
            <TableHead className="w-[10rem] font-bold">Description</TableHead>
            <TableHead className="font-bold">Severity</TableHead>
            <TableHead className="font-bold">Impact</TableHead>
            <TableHead className="font-bold">Remedial</TableHead>
            <TableHead className="font-bold">Closure date</TableHead>
            <TableHead className="font-bold">Status</TableHead>
            {(user.role === "MANAGER" || user.role === "ADMIN") ? (
              <TableHead className="w-[130px] font-bold">Actions</TableHead>
            ) : (
              <div></div>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {risks.map((risk: any, index: number) => (
            <TableRow key={risk.id} className="dark:border-slate-600 text-[12px]">
              <TableCell className="">{index}</TableCell>
              <TableCell className="">{risk.type}</TableCell>
              <TableCell className="">
                <DisplayText text={risk.description} title="Description" limit={30}/>
              </TableCell>
              <TableCell className="">{risk.severity}</TableCell>
              <TableCell className="">{risk.impact}</TableCell>
              <TableCell className="">{risk.remedialSteps}</TableCell>
              <TableCell className="">{risk.status}</TableCell>
              <TableCell> {format(new Date(risk.closureDate), "MMM do yyyy")} </TableCell>
              
              {(user.role === "MANAGER" || user.role === "ADMIN") && (
                <TableCell className="flex items-center justify-start gap-5">
                  {sureToDeleteId === risk.id ? (
                    <>
                      
                    </>
                  ) : (
                    <>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <MoreHorizontal
                            className="hover:opacity-50 hover:cursor-pointer transition font-bold"
                            onClick={() => toggleSureToDelete(risk.id)}
                          />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-32 z-[9999] bg-white dark:bg-neutral-800 border-none rounded-[5px]">
                          <DropdownMenuGroup>
                            <DropdownMenuItem
                              className="hover:cursor-pointer rounded-[5px] focus:bg-neutral-100 dark:focus:bg-neutral-700"
                              onClick={() => {
                                clickEdit(risk);
                              }}
                            >
                              <Pen className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="hover:cursor-pointer rounded-[5px] focus:bg-neutral-100 dark:focus:bg-neutral-700"
                              onClick={() => {
                                clickDelete(risk);
                              }}
                            >
                              <Trash className="mr-2 h-4 w-4 text-red-700 dark:text-500" />
                              <span className="text-red-700 dark:text-red-500">
                                Delete
                              </span>
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
    </>
  );
};
