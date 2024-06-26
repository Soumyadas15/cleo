'use client';

import { useRouter } from "next/navigation";
import Lottie from "lottie-react";


import animationData from '@/public/animations/empty.json'
import Heading from "../reusable/Heading";
import { Button } from "../reusable/Button";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showButton?: boolean;
  buttonLabel?: string;
  fontSize?: string;
  onClick?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title,
    subtitle,
    showButton,
    buttonLabel,
    fontSize,
    onClick
}) => {
    const router = useRouter();

    return ( 
        <div 
            className="
                h-[60vh]
                flex 
                flex-col 
                gap-2 
                justify-center 
                items-center 
            "
            >
            <Lottie animationData={animationData} className="w-48"/>
            <Heading
                center
                title={title!}
                subtitle={subtitle}
                fontSize={fontSize}
            />
            <div className="">
                {showButton && (
                <Button
                    label={`${buttonLabel}`}
                    onClick={onClick}
                    className="p-3 pr-4 pl-4 mt-1 rounded-[5px] text-sm"
                />
                )}
            </div>
        </div>
    );
}
 
export default EmptyState;