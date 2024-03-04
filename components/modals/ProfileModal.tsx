"use client"


import useProfileModal from "@/hooks/useProfileModal";
import Modal from "./Modal";
import Image from "next/image";

interface ProfileModalProps {
    user: any;
}

export const ProfileModal = ({
    user,
}: ProfileModalProps) => {

    const profileModal = useProfileModal()

    const bodyContent = (
        <div className="w-full h-[10rem] flex flex-col items-center justify-between">
            <div>
                <Image
                  src={'/avatar.png'}
                  alt="user"
                  height={100}
                  width={100}
                  className="rounded-full" 
                />
            </div>
            <div className="w-full h-[25%] flex items-center flex-col">
                <h1 className="text-md font-semibold">{user.name}</h1>
                <h1 className="text-sm font-normal">{user.role}</h1>
            </div>
        </div>
    )

    return (
        <Modal
            isOpen={profileModal.isOpen}
            title="Your profile"
            actionLabel="Close"
            onClose={profileModal.onClose}
            body={bodyContent}
            onSubmit={profileModal.onClose}
        />
    )
}