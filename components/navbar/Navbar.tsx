"use client"

import Image from "next/image";
import { Avatar } from "./Avatar";
import { ModeToggle } from "../ThemeToggle";
import { SearchBar } from "../SearchBar";
import { Button } from "@/components/reusable/Button";
import { useRouter } from "next/navigation";

interface NavbarProps {
    user: any;
}

export const Navbar = ({
    user,
}: NavbarProps) => {

    const router = useRouter();

    return (
        <div className="h-full w-full flex items-center justify-between">
            <h1 className="font-bold text-2xl">
                {user?.name}
            </h1>
            <input
                placeholder="search"
                className="w-[30rem] p-2 rounded-[5px] !outline-none pl-3 bg-neutral-200 dark:bg-white/5"
            />
            <div className="flex items-center gap-2">
                <ModeToggle/>
                <Avatar user={user}/>
            </div>
            
        </div>
    )
}