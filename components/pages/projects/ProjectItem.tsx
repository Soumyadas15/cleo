"use client"

import EditProjectModal from "@/components/modals/editModals/EditProjectModal";
import DisplayText from "@/components/reusable/DisplayText";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown";
import useEditProjectModal from "@/hooks/editModalHooks/useEditProjectModal";
import { Project, User } from "@prisma/client";
import axios from "axios";
import { format } from 'date-fns';
import { Calendar, MoreHorizontal, Pen, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ProjectItemProps {
    user: User;
    project: Project;
}

export const ProjectItem = ({ 
    project,
    user
}: ProjectItemProps) => {
    const router = useRouter();
    const [clicked, setClicked] = useState(false);
    
    const handleClick = () => {
        router.push(`/main/projects/${project.id}/teams`);
    };

    const handleDeleteClick = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>, project: any) => {
        e.stopPropagation();
        try {
            await axios.delete(`/api/projects/${project.id}`);
            router.refresh();
            toast.success("Project deleted");
        } catch (error : any) {
            toast.error(error.response.data);
        }
    };

    return (
        <>
        <div 
            onClick={handleClick}
            className="transition"
            style={{ transform: clicked ? 'scale(0.95)' : 'scale(1)' }}
        >
            <Card className="w-full rounded-[5px] transition hover:cursor-pointer bg-neutral-100 dark:bg-white/5 dark:border-none">
                <CardHeader className="justify-between">
                    <div className="flex items-start justify-between">
                        <div className="flex flex-col">
                            <CardTitle className="text-lg font-semibold">
                                {project.name}
                            </CardTitle>
                            <CardDescription className="text-neutral-400 w-[90%]">
                                <DisplayText limit={80} title="Project description" text={project.description}/>
                            </CardDescription>
                        </div>
                        {(user.role === "ADMIN" || user.role === "AUDITOR") && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <MoreHorizontal
                                        className="hover:opacity-50 hover:cursor-pointer transition font-bold"
                                    />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-white dark:bg-black dark:border-none rounded-[5px]">
                                    <DropdownMenuLabel>Options</DropdownMenuLabel>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuItem 
                                        className="rounded-[5px] focus:bg-neutral-100 dark:focus:bg-black hover:cursor-pointer"
                                        onClick={(e) => handleDeleteClick(e, project)}
                                    >
                                        <Trash className="mr-2 h-4 w-4 text-red-700 dark:text-500" />
                                        <span className="text-red-700 dark:text-red-500">Delete</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                </CardHeader>

                <CardFooter>
                    <div className="w-full flex justify-between">
                        <div className="font-semibold text-[12px] flex items-center gap-1">
                            <Calendar size={12}/>
                            {format(new Date(project.createdAt), 'MMMM dd, yyyy')}
                        </div>
                        <Badge className="bg-green-300 text-[10px] dark:bg-green-800 hover:cursor-pointer hover:bg-green-400 dark:hover:bg-green-700 p-1 pr-2 pl-2 rounded-[5px]">
                            Ongoing
                        </Badge>
                    </div>
                </CardFooter>
            </Card>
        </div>
        
        </>
    );
}
