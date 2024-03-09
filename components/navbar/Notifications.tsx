"use client"

import { Bell } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown";
import { useEffect } from "react";
import { NotificationItem } from "./NotificationItem";
import { Badge } from "../ui/badge";

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
        <div className="relative">
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Bell/>
                    {(count !== 0) ? (
                        <div className="absolute pl-1 pr-1 bg-red-600 rounded-full bottom-5 left-2 flex items-center justify-center text-white font-semibold text-sm">
                            {count}
                        </div>
                    ) : (
                        <div></div>
                    )}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 max-w-56 bg-white rounded-[5px] dark:border-none dark:bg-black">
                    <DropdownMenuLabel>
                        Notifications
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator></DropdownMenuSeparator>
                    <DropdownMenuGroup>
                        {notifications.length === 0 ? (
                            <DropdownMenuItem className="text-neutral-600 dark:text-neutral-300">
                                No notifications
                            </DropdownMenuItem>
                        ) : (
                            notifications.map((notification: any, index: number) => (
                                <DropdownMenuItem key={index}>
                                    <NotificationItem notification={notification} />
                                </DropdownMenuItem>
                            ))
                        )}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
