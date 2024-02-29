"use client"

import Image from "next/image";

interface AvatarProps {
    user: any;
}

export const Avatar = ({
    user,
}: AvatarProps) => {
    return (
        <div className="flex items-center p-2 gap-2">
            <Image 
                src={user?.imageUrl}
                alt="user"
                height={32}
                width={32}
                className="rounded-full"
            />
            <div>
                <div className="text-sm font-bold">
                    {user?.name}
                </div>
                <div className="text-xs text-gray-500">
                    Role
                </div>
            </div>
        </div>
    )
}