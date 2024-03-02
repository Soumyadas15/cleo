"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProjectNavbarItemProps {
    label: string;
    icon?: React.ReactNode;
    to?: string;
    highlight?: string;
    isActive?: boolean;
}

export const ProjectNavbarItem = ({
    label,
    icon,
    to,
    highlight,
    isActive
}: ProjectNavbarItemProps) => {

    const router = useRouter();
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(true);
        setTimeout(() => setClicked(false), 150);
        router.push(`${to}`);
    };

    return (
        <div 
            onClick={handleClick}
            className={`hover:cursor-pointer hover:opacity-80 transition rounded-[5px] underline-offset-4
                        ${isActive ? 'text-black dark:text-white font-bold' : 'text-neutral-400 dark:text-neutral-600 font-semibold'}`}
            style={{ transform: clicked ? 'scale(0.9)' : 'scale(1)' }}
        >
                {label}
        </div>
    )
}