"use client"

import Heading from "@/components/reusable/Heading";
import { Member, Project, User } from "@prisma/client"
import { ProjectMembers } from "./ProjectMembers";
import { Pencil, Trash2 } from "lucide-react";
import useEditProjectModal from "@/hooks/editModalHooks/useEditProjectModal";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface ProjectHeaderProps {
    project: Project;
    members: any[];
    user: User;
}

export const ProjectHeader = ({
    project,
    members,
    user
} : ProjectHeaderProps) => {

    const editProjectModal = useEditProjectModal();
    const router = useRouter()

    const handleDeleteClick = async (project: any) => {
        try {
            await axios.delete(`http://127.0.0.1:3001/projects/${project.id}`, {
                data: { userId: user.id }
            });
            router.push('/main/projects');
            router.refresh();
            toast.success("Project deleted");
        } catch (error : any) {
            toast.error(error.response.data);
        }
    };

    return (
        <div className="w-full h-full flex items-center justify-between">
            <div className="h-full flex items-center gap-4">
                <Heading title={`${project?.name}`}/>
                {(user.role === "ADMIN" || user.role === "AUDITOR") ? (
                        <div className="flex items-center gap-2">
                            <Pencil onClick={editProjectModal.onOpen} className="mb-2 hover:cursor-pointer hover:opacity-75 transition"/>
                            <Trash2 onClick={() => {handleDeleteClick(project)}} className="mb-2 text-red-700 hover:cursor-pointer hover:opacity-75 transition" />
                        </div>
                    ) : (
                        <div></div>
                )}
            </div>
            <div>
                <ProjectMembers 
                    //@ts-ignore
                    members={members}
                />
            </div>
        </div>
    )
}