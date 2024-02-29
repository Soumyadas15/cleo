"use client"

import useSuccessModal from "@/hooks/useSuccessModal";
import Heading from "@/components/reusable/Heading";
import Lottie from "lottie-react";
import Modal from "@/components/modals/Modal";

import animationData from '@/public/animations/success.json'

const SuccessModal = () => {
    const successModal = useSuccessModal();

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title='Successfully created Project!'
                // subtitle= 'You have successfully signed up'
                center
            />
            <div className="flex items-center justify-center">
                <Lottie animationData={animationData}/>
            </div>
        </div>
    )

    return ( 
        <div>
            <Modal
                isOpen = {successModal.isOpen}
                title= "Hurray!"
                actionLabel='Finish'
                onClose={successModal.onClose}
                onSubmit={successModal.onClose}
                body={bodyContent}
            />
        </div>
     );
}
 
export default SuccessModal;