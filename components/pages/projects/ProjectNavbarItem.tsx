"use client"

import { useRouter } from "next/navigation";

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

    return (
        <div 
            onClick={() => {router.push(`${to}`)}}
            className={`font-bold hover:cursor-pointer hover:opacity-80 transition rounded-[5px] underline-offset-4
                        ${isActive ? 'text-black' : 'text-neutral-400'}
            `}>
                {label}
        </div>
    )
}