interface SidebarItemProps {
    label: string;
    icon?: React.ReactNode;
    to?: string;
    highlight?: string;
}

export const SidebarItem = ({
    label,
    icon,
    to,
    highlight
}: SidebarItemProps) => {

    return (
        <div  className={`p-2 rounded-[5px] text-sm hover:bg-cyan-300/40 dark:hover:bg-cyan-600/20 transition cursor-pointer flex gap-2 items-center`}>
             <div className="scale-[0.8]">
                {icon}
            </div>
            <div>
                {label}
            </div>
        </div>
    );
}