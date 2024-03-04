'use client';

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { Avatar } from "./Avatar";
import MenuItem from "./MenuItem";
import { Button } from "../reusable/Button";
import useCreateModal from "@/hooks/useLoginModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown"
import { LogOut, User } from "lucide-react";
import useProfileModal from "@/hooks/useProfileModal";


interface UserMenuProps {
  user?: any;
}

const UserMenu: React.FC<UserMenuProps> = ({
  user
}) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [clicked, setClicked] = useState(false);

  const createModal = useCreateModal();
  const profileModal = useProfileModal();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
    setClicked(true);
    setTimeout(() => setClicked(false), 150);
  }, []);


  return ( 
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div 
              className="hidden md:block hover:cursor-pointer"
              style={{ transform: clicked ? 'scale(0.9)' : 'scale(1)' }}
            >
              <Avatar user={user} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40 mr-6 bg-white rounded-[5px]">

            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            
            <DropdownMenuSeparator/>

            <DropdownMenuGroup>
              <DropdownMenuItem 
                className="rounded-[5px] focus:bg-neutral-200 hover:cursor-pointer"
                onClick={profileModal.onOpen}
              >
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="border-neutral-300 hover:cursor-pointer"/>

              <DropdownMenuItem 
                  className="rounded-[5px] focus:bg-neutral-200 hover:cursor-pointer"
                  onClick={() => {router.push('/api/auth/logout')}}
              >
                <LogOut className="mr-2 h-4 w-4 text-red-600" />
                <span className="text-red-600">Logout</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>


          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
   );
}
 
export default UserMenu;