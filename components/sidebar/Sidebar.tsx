"use client"

import { Briefcase, Home, List, Plus, Settings, User, UserRoundPlus } from "lucide-react"
import { SidebarItem } from "./SidebarItem"
import { Button } from "../reusable/Button"
import Image from "next/image"
import useLoginModal from "@/hooks/useLoginModal"
import { usePathname } from "next/navigation"


interface SidebarProps {
    user: any;
}

export const Sidebar = ({
    user,
}: SidebarProps) => {

    const loginModal = useLoginModal();
    const pathname = usePathname();

    return (
        <div className="h-full w-full bg-white dark:bg-slate-950 transition p-5">
            <div className="h-[40%] w-full gap-12 flex flex-col">
                <div className="flex items-center gap-2">
                    <Image
                        src={'/logo.png'}
                        alt="logo"
                        height={32}
                        width={32}
                    />
                    <div className="text-sm font-bold">Cleo</div>
                </div>
                <div className="flex flex-col h-[20%] w-full">
                    <Button 
                                onClick={loginModal.onOpen}
                                label="Add project" 
                                color="bg-cyan-500" 
                                className="p-2 rounded-[5px] flex items-center text-sm text-white" 
                                icon={<Plus className="scale-[0.8]"/>}
                            />
                </div>

                <div className="flex flex-col h-[70%] w-full gap-3 -mt-8">
                    <SidebarItem 
                        label="Projects" 
                        to="main/projects"
                        icon={ <Briefcase/>}
                        highlight="text-red-600"
                        isActive = {pathname === '/projects'}
                        
                    />
                    <SidebarItem 
                        label="Managers"  
                        to="main/projects"
                        icon={ <User/>}
                        highlight="text-green-600"
                        isActive = {pathname === '/managers'}
                    />
                    <SidebarItem 
                        label="Employees"  
                        to="main/projects"
                        icon={ <UserRoundPlus/>}
                        highlight="text-green-600"
                        isActive = {pathname === '/employees'}
                    />
                    <SidebarItem 
                        label="Settings"  
                        to="main/projects"
                        icon={ <Settings/>}
                        highlight="text-green-600"
                        isActive = {pathname === '/settings'}
                    />
                </div>
                
            </div>
        </div>
    )
}