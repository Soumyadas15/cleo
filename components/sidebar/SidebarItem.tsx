import { useRouter } from "next/navigation";
import { useState } from "react";

interface SidebarItemProps {
    label: string;
    icon?: React.ReactNode;
    to?: string;
    highlight?: string;
    isActive?: boolean;
}

export const SidebarItem = ({
    label,
    icon,
    to,
    highlight,
    isActive
}: SidebarItemProps) => {

    const router = useRouter();
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(true);
        setTimeout(() => setClicked(false), 150);
        router.push(`/${to}`);
    };

    return (
        <div  
            onClick={handleClick}
            className={`p-2 rounded-[5px] text-sm hover:bg-neutral-300/30 dark:hover:bg-neutral-600/20 transition cursor-pointer flex gap-2 items-center
                    ${isActive ? 'dark:bg-neutral-700 bg-neutral-300 font-bold' : ''}
        `}
            style={{ transform: clicked ? 'scale(0.9)' : 'scale(1)' }}
        >
            <div className="scale-[0.8]">
                {icon}
            </div>
            <div>
                {label}
            </div>
        </div>
    );
}
