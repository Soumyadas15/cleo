"use client"

import Image from "next/image";
import { Button } from "../reusable/Button";
import { useRouter } from "next/navigation";

interface AvatarProps {
    user: any;
}

export const Avatar = ({
    user,
}: AvatarProps) => {

    const router = useRouter();

    return (
        <div className="flex items-center p-2 gap-2">
            <Image 
                src={user.imageUrl}
                alt="user"
                height={42}
                width={42}
                className="rounded-full"
            />
            {/* <div>
                <div className="text-sm font-bold">
                    {user?.name}
                </div>
                <div className="text-xs text-gray-500">
                    Role
                </div>
            </div>
            <Button
                label="Logout"
                onClick={() => {router.push('/api/auth/logout')}}
                className="p-2"
            /> */}
        </div>
    )
}