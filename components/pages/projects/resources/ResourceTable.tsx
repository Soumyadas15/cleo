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


/**
 * Component representing a table of resources
 * @param project The project data
 * @param audits Array of audits to display
 * @param user The user data
*/


interface ResourceTableProps {
  project: any;
  resources: any;
  user: any;
}

export const ResourceTable = ({
  project,
  resources,
  user,
}: ResourceTableProps) => {
  const router = useRouter();
  const editResourceModal = useEditResourceModal();
  const [isLoading, setIsLoading] = useState(false);
  const [sureToDeleteId, setSureToDeleteId] = useState<string | null>(null);
  const [editResourceId, setEditResourceId] = useState<string | null>(null);

  const clickEdit = (resource: any) => {
    setEditResourceId(resource.id);
    editResourceModal.onOpen();
  };

  /**
   * Handler for clicking the delete button of an audit
   * @param resource The audit data to delete
  */


  const clickDelete = async (resource: any) => {
    setIsLoading(true);
    try {
      await axios.delete(`/api/resources/${resource.id}`);
      router.refresh();
      toast.success("Resource deleted");
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
    <>
      {editResourceId && (
        <EditResourceModal resource={resources.find((res: any) => res.id === editResourceId)} />
      )}
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
          {resources.map((resource: any, index: number) => (
            <TableRow key={resource.id} className="dark:border-slate-600">
              <TableCell className="font-medium">{index}</TableCell>
              <TableCell className="font-medium">{resource.name}</TableCell>
              <TableCell>{resource.role}</TableCell>
              <TableCell>
                {format(new Date(resource.startDate), "MMM do yyyy")}
              </TableCell>
              <TableCell>
                {format(new Date(resource.endDate), "MMM do yyyy")}
              </TableCell>
              <TableCell>
                {resource.comment}
                {resource.isEdited ? (
                  <span className="text-neutral-400 text-[12px] ml-2">
                    (edited)
                  </span>
                ) : (
                  <div></div>
                )}
              </TableCell>
              {user.role === "MANAGER" && (
                <TableCell className="flex items-center justify-start gap-5">
                  {sureToDeleteId === resource.id ? (
                    <>
                      
                    </>
                  ) : (
                    <>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <MoreHorizontal
                            className="hover:opacity-50 hover:cursor-pointer transition font-bold"
                            onClick={() => toggleSureToDelete(resource.id)}
                          />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-32 z-[9999] bg-white dark:bg-neutral-800 border-none rounded-[5px]">
                          <DropdownMenuGroup>
                            <DropdownMenuItem
                              className="hover:cursor-pointer rounded-[5px] focus:bg-neutral-100 dark:focus:bg-neutral-700"
                              onClick={() => {
                                clickEdit(resource);
                              }}
                            >
                              <Pen className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="hover:cursor-pointer rounded-[5px] focus:bg-neutral-100 dark:focus:bg-neutral-700"
                              onClick={() => {
                                clickDelete(resource);
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
