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
            
            <input
                placeholder="search"
                className="w-[30rem] p-2 rounded-[5px] !outline-none pl-3 bg-neutral-100 dark:bg-white/5"
            />
            <div className="flex items-center gap-2">
                <ModeToggle/>
                <Button
                    label="Logout"
                    onClick={() => {router.push('/api/auth/logout')}}
                    className="p-2"
                />
            </div>
            
        </div>
    )
}