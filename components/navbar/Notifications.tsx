"use client"

import { Bell } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown";
import { useEffect } from "react";
import { Badge } from "../ui/badge";
import { NotificationItem } from "./NotificationItem";

interface NotificationProps {
    user: any;
    isUnread: boolean;
    notifications: any[];
    count: number;
}

export const Notifications = ({
    user,
    isUnread,
    notifications,
    count
}: NotificationProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="relative">
                    <Bell/>
                    {(count !== 0) ? (
                        <div className="absolute p-1 w-5 h-5 bottom-3 bg-red-600 rounded-full left-2 flex items-center justify-center text-white font-semibold text-sm">
                            {count}
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
                
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 max-w-56 bg-white dark:border-none dark:bg-neutral-800 rounded-[5px]">
                <DropdownMenuLabel>
                    Notifications
                </DropdownMenuLabel>
                <DropdownMenuSeparator></DropdownMenuSeparator>
                <DropdownMenuGroup>
                    {notifications.length === 0 ? (
                        <DropdownMenuItem className="focus:bg-neutral-200 dark:focus:bg-neutral-700 hover:cursor-pointer">
                            No notifications
                        </DropdownMenuItem>
                    ) : (
                        notifications.map((notification: any, index: number) => (
                            <DropdownMenuItem key={index} className="focus:bg-neutral-200 dark:focus:bg-neutral-700 hover:cursor-pointer">
                                <NotificationItem notification={notification} />
                            </DropdownMenuItem>
                        ))
                    )}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
