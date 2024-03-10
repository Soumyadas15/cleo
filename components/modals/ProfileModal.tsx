"use client"

import React, { useState } from 'react'; // Import React and useState
import useProfileModal from "@/hooks/useProfileModal";
import Modal from "./Modal";
import Image from "next/image";
import { MainComponent } from '../avatarCreator/MainComponent';

interface ProfileModalProps {
    user: any;
    localData: any;
}

export const ProfileModal = ({
    user,
    localData // Corrected typo here
}: ProfileModalProps) => {

    const profileModal = useProfileModal();
    const [isMainComponentOpen, setIsMainComponentOpen] = useState(false); // State to control the visibility of MainComponent

    const handleImageClick = () => {
        setIsMainComponentOpen(true); 
    };

    const bodyContent = (
        <div className="w-full h-[10rem] flex flex-col items-center justify-between">
            <MainComponent user={user} localData={localData}/>
            <div className="w-full h-[25%] flex items-center flex-col">
                <h1 className="text-md font-semibold">{user.name}</h1>
                <h1 className="text-sm font-normal">{user.role}</h1>
            </div>
        </div>
    );

    return (
        <>
            <Modal
                isOpen={profileModal.isOpen}
                title="Your profile"
                actionLabel="Close"
                onClose={profileModal.onClose}
                body={bodyContent}
                onSubmit={profileModal.onClose}
            />
        </>
    );
};
