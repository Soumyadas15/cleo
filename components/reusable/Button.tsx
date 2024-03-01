/**
 * Button component
 * @param label - button text
 * @param redirect - route to redirect to
 * @param disabled - whether the button is disabled or not
*/

"use client"

import { useRouter } from "next/navigation";
import React, { ReactNode, useState } from "react";

interface ButtonProps {
    label: string;
    redirect?: string;
    disabled?: boolean;
    color?: string;
    onClick?: () => void;
    className?: string;
    icon?: ReactNode;
    outline?: boolean;
}

export const Button = ({
    label,
    redirect,
    disabled,
    color,
    onClick,
    className,
    icon,
    outline
}: ButtonProps) => {
    const router = useRouter();
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(true);
        setTimeout(() => setClicked(false), 150);
    };

    return (
        <div 
            onClick={handleClick}
            className="transition"
            style={{ transform: clicked ? 'scale(0.9)' : 'scale(1)' }}
        >
            <button
                suppressHydrationWarning
                onClick={onClick}
                disabled={disabled}
                className={`
                    ${disabled ? "opacity-75 cursor-not-allowed" : "opacity-100 hover:opacity-90 hover:cursor-pointer font-semibold"}
                    ${className}
                    ${outline ? '' : 'bg-black dark:bg-white'}
                    ${outline ? 'border-black border-[2px] dark:border-white' : 'border-black dark:border-white'}
                    ${outline ? 'text-black dark:text-white' : 'text-white dark:text-black'}`}
            >
                {icon && <span className="mr-2">{icon}</span>}
                {label}
            </button>
        </div>

    );
};
