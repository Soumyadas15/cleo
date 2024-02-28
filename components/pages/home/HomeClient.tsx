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
        <div className="h-[3rem] w-full flex items-center justify-between">
            <h1 className="font-bold text-2xl">
                {user.name}
            </h1>
            <input
                placeholder="search"
                className="w-[30rem] p-2 rounded-[5px] !outline-none pl-3 bg-neutral-200 dark:bg-white/5"
            />
            <div className="flex items-center gap-2">
                <ModeToggle/>
                <Button 
                    label="Logout" 
                    onClick={() => {router.push('/api/auth/logout')}}
                    color="bg-cyan-500" 
                    className="p-2 rounded-[5px] flex items-center text-sm text-white" 
                    
                />
            </div>
            
        </div>
        
    )
    
}