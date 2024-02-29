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
            overflow-hidden 
            right-0 
            top-12 
          "
        >
          <div className="flex flex-col cursor-pointer items-center">
            {user ? (
              <>
              <div className=" w-full h-[6rem] flex flex-col items-center justify-between">
                <div className="flex items-center flex-col">
                  <div className="text-black font-bold">
                    {user.name}
                  </div>
                  {user.isAdmin ? (
                    <div className="text-sm">
                      Admin
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
                
                <Button
                  label="Logout"
                  onClick={() => {router.push('/api/auth/logout')}}
                  className="p-1 pr-3 pl-3 rounded-[5px]"
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