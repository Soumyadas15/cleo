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
import { Stakeholder, User } from "@prisma/client";
import EditStakeholderModal from "@/components/modals/editModals/EditStakeholderModal";
import useEditStakeholderModal from "@/hooks/editModalHooks/useEditStakeholderModal";

interface StakeholdersTableProps {
    project: any;
    stakeholders: any;
    user: User;
}
export const StakeholdersTable = ({ project, stakeholders, user }: StakeholdersTableProps) => {
    const router = useRouter();
    const editStakeholderModal = useEditStakeholderModal();
    const [isLoading, setIsLoading] = useState(false);
    const [sureToDeleteId, setSureToDeleteId] = useState<string | null>(null);
    const [editStakeholderId, setEditStakeholderId] = useState<string | null>(null);

    const clickEdit = (stakeholder: any) => {
        setEditStakeholderId(stakeholder.id);
        editStakeholderModal.onOpen();
    };

    const clickDelete = async (stakeholder: any) => {
        setIsLoading(true);
        const backendServer = process.env.NEXT_PUBLIC_BACKEND_SERVER;
        try {
            await axios.delete(`${backendServer}/stakeholders/${stakeholder.id}`, { data: { userId: user.id }});
            router.refresh();
            toast.success('Stakeholder deleted');
        } catch (firstError) {
            try {
                await axios.delete(`/api/stakeholders/${stakeholder.id}`);
                router.refresh();
                toast.success('Stakeholder deleted (backup)');
            } catch (secondError : any) {
                const errorMessage = (secondError.response && secondError.response.data && secondError.response.data.error) || "An error occurred";
                toast.error(errorMessage);
            }
        }
    };

    const toggleSureToDelete = (resourceId: string) => {
        setSureToDeleteId(sureToDeleteId === resourceId ? null : resourceId);
    };

    const closeEditModal = () => {
        setEditStakeholderId(null);
        editStakeholderModal.onClose();
    };

    return (
        <>
        {editStakeholderId && (
            <EditStakeholderModal user={user} stakeholder={stakeholders.find((res: any) => res.id === editStakeholderId)} onClose={closeEditModal} />
        )}
        <Table className="scrollbar-hide">
            <TableHeader className="bg-neutral-200 border-none dark:bg-neutral-800">
                <TableRow>
                    <TableHead className="w-[100px] font-bold">Serial</TableHead>
                    <TableHead className="w-[250px] font-bold">Title</TableHead>
                    <TableHead className="w-[200px] font-bold">Name</TableHead>
                    <TableHead className="w-[400] font-bold">Contact</TableHead>
                    {(user.role === "MANAGER" || user.role === "ADMIN") ? (
                        <TableHead className="w-[130px] font-bold">Actions</TableHead>
                    ) : (
                        <div></div>
                    )}
                </TableRow>
            </TableHeader>
            <TableBody>

                {stakeholders.map((stakeholder: any, index: number) => (

                    <TableRow key={stakeholder.id} className="dark:border-neutral-600 text-[12px]">
                        <TableCell className="">{index}</TableCell>
                        <TableCell className="">{stakeholder.title}</TableCell>
                        <TableCell>{stakeholder.name}</TableCell>
                        <TableCell>{stakeholder.contact}</TableCell>

                        {(user.role === "MANAGER" || user.role === "ADMIN") && (
                            <TableCell className="flex items-center justify-start gap-5">
                                {sureToDeleteId === stakeholder.id ? (
                                    <>
                                    </>
                                ) : (
                                    <>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <MoreHorizontal
                                                    className="hover:opacity-50 hover:cursor-pointer transition font-bold"
                                                    onClick={() => toggleSureToDelete(stakeholder.id)}
                                                />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-32 z-[9999] bg-white dark:bg-neutral-800 border-none rounded-[5px]">
                                                <DropdownMenuGroup>
                                                    <DropdownMenuItem
                                                        className="hover:cursor-pointer rounded-[5px] focus:bg-neutral-100 dark:focus:bg-neutral-700"
                                                        onClick={() => {
                                                            clickEdit(stakeholder);
                                                        }}
                                                    >
                                                        <Pen className="mr-2 h-4 w-4" />
                                                        <span>Edit</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="hover:cursor-pointer rounded-[5px] focus:bg-neutral-100 dark:focus:bg-neutral-700"
                                                        onClick={() => {
                                                            clickDelete(stakeholder);
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
