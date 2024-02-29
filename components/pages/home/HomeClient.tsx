"use client"

import { ModeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/reusable/Button";
import { useRouter } from "next/navigation";

interface HomeClientProps {
    user: any;
}

export const HomeClient = ({
    user,
}: HomeClientProps) => {

    const router = useRouter();

    return (
        <div className="p-5">
            Haha
        </div>
        
    )
    
}