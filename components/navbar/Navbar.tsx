"use client"

import Image from "next/image";
import { Avatar } from "./Avatar";
import { ModeToggle } from "../ThemeToggle";
import { SearchBar } from "../SearchBar";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface NavbarProps {
    user: any;
}

export const Navbar = ({
    user,
}: NavbarProps) => {

    const router = useRouter();

    return (
        <div className="h-full w-full bg-white dark:bg-neutral-700 p-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
                <Image 
                    src={'/logo.png'}
                    alt="logo"
                    height={32}
                    width={32}
                />
                <div className="text-sm font-bold">Customer success</div>
            </div>
            <div>
                <SearchBar/>
            </div>
            <div className="flex items-center ">
                <ModeToggle/>
                {user? (
                        <Button 
                            variant={'outline'}
                            onClick={() => {router.push('/api/auth/logout')}}
                        > 
                            Logout 
                        </Button>
                    ) : (
                        <div></div>
                    )
                }
            </div>
        </div>
    )
}