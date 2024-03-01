import { useRouter } from "next/navigation";

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

    return (
        <div  
            onClick={() => {router.push(`/${to}`)}}
            className={`p-2 rounded-[5px] text-sm hover:bg-neutral-300/30 dark:hover:bg-cyan-600/20 transition cursor-pointer flex gap-2 items-center
                    ${isActive ? 'dark:bg-slate-900 bg-neutral-300 font-bold' : ''}
        `}>
             <div className="scale-[0.8]">
                {icon}
            </div>
            <div>
                {label}
            </div>
        </div>
    );
}