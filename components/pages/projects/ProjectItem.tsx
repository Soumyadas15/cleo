"use client"

import { useRouter } from "next/navigation";

interface ProjectItemProps {
    project: any;
}

export const ProjectItem = ({
    project,
}: ProjectItemProps) => {

    const router = useRouter();
    return (
        <div 
            onClick={() => {router.push(`/main/projects/${project.id}`)}}
            className="bg-neutral-100 p-2 rounded-[5px] hover:opacity-80 hover:cursor-pointer pl-4 pr-4">
            {project.name}
        </div>
    )
}