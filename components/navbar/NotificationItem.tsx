"use client"

import { Notification } from "@prisma/client"
import axios from "axios"
import { format } from "date-fns" 
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

interface NotificationItemProps {
    notification: Notification
}

export const NotificationItem = ({
    notification,
}: NotificationItemProps) => {

    const router = useRouter()

    const handleRead = (notification: Notification) => {
        try {
            axios.delete(`/api/notifications/${notification.id}`);
            router.refresh();
          } catch (error: any) {
            toast.error(error.message);
          } finally {
            router.refresh();
          }
    }
    return (
        <div
            className={`focus:bg-neutral-100 flex flex-col items-start mb-1 text-[12px] dark:focus:bg-neutral-700 hover:cursor-pointer rounded-[5px]
                 ${!notification.isRead ? 'font-bold text-black dark:text-white' : 'text-neutral-600 dark:text-neutral-300'}`}
            onClick={() => (handleRead(notification))}
        >
            <div>{notification.text}</div>
            <div className="font-semibold text:neutral-300 dark:text-neutral-500">{format(new Date(notification.createdAt), "MMM do")}</div>
        </div>
    )
}