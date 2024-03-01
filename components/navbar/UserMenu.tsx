'use client';

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { Avatar } from "./Avatar";
import MenuItem from "./MenuItem";
import { Button } from "../reusable/Button";



interface UserMenuProps {
  user?: any;
}

const UserMenu: React.FC<UserMenuProps> = ({
  user
}) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);


  return ( 
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        
        <div 
        onClick={toggleOpen}
        className="s
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          transition
          "
        >
          
          <div className="hidden md:block">
            <Avatar user={user} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div 
          className="
            absolute 
            rounded-xl 
            shadow-md
            w-[15vw]
            p-4
            bg-neutral-100
            dark:bg-slate-800
            overflow-hidden 
            right-0 
            top-15 
            z-[99]
          "
        >
          <div className="flex flex-col cursor-pointer items-center">
            {user ? (
              <>
              <div className=" w-full h-[6rem] flex flex-col items-center justify-between">
                <div className="flex items-center flex-col">
                  <div className="text-black dark:text-white font-bold">
                    {user.name}
                  </div>
                  <div className="text-sm">
                    {user.role}
                  </div>
                </div>
                
                <Button
                  label="Logout"
                  onClick={() => {router.push('/api/auth/logout')}}
                  className="p-2 pr-3 pl-3 rounded-[5px] text-sm"
                />
              </div>
                
              </>
            ) : (
              <>
                
              </>
            )}
          </div>
        </div>
      )}
    </div>
   );
}
 
export default UserMenu;