"use client"

import React, { useState } from 'react';

import RiveMainEntry from "./RiveMainEntry";
import { Button } from '../ui/button';
import Image from 'next/image';
import { User } from '@prisma/client';

interface MainComponentProps {
    localData: any;
    user: User;
}

export const MainComponent = ({
    localData,
    user
}: MainComponentProps) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const togglePopup = () => {
        setIsPopupOpen(prevState => !prevState);
    };

    const handleClose = () => {
        setIsPopupOpen(false);
    };

    return (
        <div className=''>
            <div onClick={togglePopup}>
                <Image
                    src={user.imageUrl}
                    alt="user"
                    height={100}
                    width={100}
                    className="rounded-full hover:opacity-75 transition hover:cursor-pointer"
                />
            </div>
            {isPopupOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center scrollbar-hide">
                    <div className="absolute inset-0 bg-black opacity-50 scrollbar-hide"></div>
                    <RiveMainEntry localData={localData} onClose={handleClose} />
                </div>
            )}
        </div>
    );
};
