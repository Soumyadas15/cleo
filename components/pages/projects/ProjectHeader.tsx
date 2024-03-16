"use client"

import Heading from "@/components/reusable/Heading";
import { Member, Project } from "@prisma/client"
import { ProjectMembers } from "./ProjectMembers";
import { Pencil } from "lucide-react";
import useEditProjectModal from "@/hooks/editModalHooks/useEditProjectModal";

interface ProjectHeaderProps {
    project: Project;
    members: Member[];
}

export const ProjectHeader = ({
    project,
    members
} : ProjectHeaderProps) => {

    const editProjectModal = useEditProjectModal();

    return (
        <div className="w-full h-full flex items-center justify-between">
            <div className="h-full flex items-center gap-4">
                <Heading title={`${project?.name}`}/>
                <Pencil onClick={editProjectModal.onOpen} className="mb-2 hover:cursor-pointer hover:opacity-75 transition"/>
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