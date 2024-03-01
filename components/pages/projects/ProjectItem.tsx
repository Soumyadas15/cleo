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
            className="bg-neutral-100 dark:bg-slate-900/40 border-[1px] border-black border-opacity-5 p-2 rounded-[5px] hover:opacity-80 hover:cursor-pointer pl-4 pr-4 h-[10vw]">
            <div className="text-lg font-bold text-neutral-700 dark:text-neutral-300">
                {project.name}
            </div>
            <div className="text-sm opacity-50">
                {project.name}
            </div>
            <div className="text-sm opacity-50">
                {project.name}
            </div>
        </div>
    )
}