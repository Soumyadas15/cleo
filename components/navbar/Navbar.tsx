"use client"

import { ModeToggle } from "../ThemeToggle";
import { useRouter } from "next/navigation";
import UserMenu from "./UserMenu";
import { Notifications } from "./Notifications";
import { ConnectionIndicator } from "../ConnectionIndicator";

interface NavbarProps {
    user: any;
    notifications: any;
    count: number;
}

export const Navbar = ({
    user,
    notifications,
    count
}: NavbarProps) => {

    const router = useRouter();

    return (
        <div className="h-full w-full flex items-center justify-between ">
            
            <input
                placeholder="search"
                className="w-[50vw] md:w-[30rem] p-2 rounded-[5px] !outline-none pl-3 bg-neutral-100 dark:bg-white/5"
            />
            <div className="flex items-center gap-2">
                <Notifications user={user} notifications={notifications} count={count} isUnread/>
                <ModeToggle/>
                {/* <ConnectionIndicator/> */}
                <UserMenu user={user} />
            </div>
            
        </div>
    )
}