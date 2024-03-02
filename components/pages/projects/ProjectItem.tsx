"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProjectItemProps {
    project: any;
}

export const ProjectItem = ({
    project,
}: ProjectItemProps) => {

    const router = useRouter();
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(true);
        setTimeout(() => setClicked(false), 150);
        router.push(`/main/projects/${project.id}`);
    };

    return (
        <div 
            onClick={handleClick}
            className="bg-neutral-100 dark:bg-neutral-800 border-[1px] border-black border-opacity-5 p-2 rounded-[5px] hover:opacity-80 hover:cursor-pointer pl-4 pr-4 h-[10vw] transition"
            style={{ transform: clicked ? 'scale(0.95)' : 'scale(1)' }}
        >
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