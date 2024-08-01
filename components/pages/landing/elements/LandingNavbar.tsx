"use client"

import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const LandingNavbar: React.FC = () => {
    const scrollPosition = useScrollPosition();
    const router = useRouter();
    
    const [bgColor, setBgColor] = useState<string>('bg-[#1f1f1f]');
    const [bgOpacity, setBgOpacity] = useState<string>('bg-opacity-0');
    const [logoColor, setLogoColor] = useState<string>('text-cyan-500');
    const [textColor, setTextColor] = useState<string>('text-neutral-500');
    const [buttonBg, setButtonBg] = useState<string>('bg-cyan-500');
    const [buttonText, setButtonText] = useState<string>('text-white');

    useEffect(() => {
        if (scrollPosition >= 1) {
            setBgColor("bg-neutral-800");
            setBgOpacity("bg-opacity-0");
            setLogoColor("text-white");
            setTextColor("text-neutral-500");
            setButtonBg('bg-white');
            setButtonText('text-black');
        } else {
            setBgColor("bg-[#1f1f1f]");
            setLogoColor("text-cyan-500");
            setTextColor("text-neutral-500");
            setBgOpacity("bg-opacity-0");
            setButtonBg('bg-cyan-500');
            setButtonText('text-white');
        }
    }, [scrollPosition]);

    return ( 
        <div className="flex justify-center items-center fixed top-5 w-full z-[9999]">
            <div className={`w-[70vw] ${bgColor} ${bgOpacity} backdrop-filter backdrop-blur-lg p-3 rounded-full z-[9999] transition`}>
                <div className="flex justify-between items-center">
                    <div className={`ml-5 font-bold ${logoColor} flex items-center gap-2`}>
                        <img src={'/logo.png'} height={24} width={24} alt="logo"/>
                        Cleo
                    </div>
                    <div className={`flex gap-6 items-center ${textColor}`}>
                        
                        <div className="hover:opacity-80 cursor-pointer">
                            <div 
                                onClick={() => {router.push('/api/auth/login')}}
                                className={`${buttonBg} ${buttonText} p-1.5 rounded-full pl-5 pr-5 text-sm transition-colors`}>
                                Get started
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
