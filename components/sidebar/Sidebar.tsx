"use client"

import { Briefcase, GitGraph, LayoutDashboardIcon, Plus, Settings, User, UserRoundPlus } from "lucide-react"
import { SidebarItem } from "./SidebarItem"
import Image from "next/image"
import { usePathname } from "next/navigation"
import useCreateModal from "@/hooks/useLoginModal"
import { Button } from "../ui/button"


interface SidebarProps {
    user: any;
}

export const Sidebar = ({
    user,
}: SidebarProps) => {

    const createModal = useCreateModal()
    const pathname = usePathname();

    return (
        <div className="h-full hidden md:block w-full bg-white dark:bg-black border-r-1 border-neutral-200 shadow-sm dark:border-neutral-700 transition p-5">
            <div className="h-[40%] w-full gap-12 flex flex-col">
                <div className="flex items-center gap-2">
                    <Image
                        src={'/logo.png'}
                        alt="logo"
                        height={36}
                        width={36}
                    />
                    <div className="text-md leading-5 font-bold">Customer <br/>success</div>
                </div>
                <div className="flex flex-col h-[20%] w-full">
                    {(user.role === "ADMIN" || user.role === "AUDITOR") ? (
                            <Button className="flex items-center" onClick={createModal.onOpen}>
                                <Plus className="scale-[0.8]"/>
                                <div>Add project</div>
                            </Button>
                        ) : (
                            <div></div>
                        )
                    }
                </div>

                <div className="flex flex-col h-[70%] w-full gap-3 -mt-8">
                    <SidebarItem 
                        label="Projects" 
                        to="main/projects"
                        icon={ <Briefcase/>}
                        highlight="text-red-600"
                        isActive = {pathname?.startsWith('/main/projects')}
                        
                    />
                    <SidebarItem 
                        label="Managers"  
                        to="main/managers"
                        icon={ <User/>}
                        highlight="text-green-600"
                        isActive = {pathname?.startsWith('/main/managers')}
                    />
                    <SidebarItem 
                        label="Dashboard"  
                        to="main/dashboard"
                        icon={ <LayoutDashboardIcon/>}
                        highlight="text-green-600"
                        isActive = {pathname?.startsWith('/main/dashboard')}
                    />
                    <SidebarItem 
                        label="Settings"  
                        to="main/settings"
                        icon={ <Settings/>}
                        highlight="text-green-600"
                        isActive = {pathname?.startsWith('/main/settings')}
                    />
                </div>
                
            </div>
        </div>
    )
}