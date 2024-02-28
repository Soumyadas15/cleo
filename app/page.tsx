

import { Sidebar } from "@/components/sidebar/Sidebar";
import { Landingpage } from "@/components/pages/landing/Landing";
import { HomeClient } from "@/components/pages/home/HomeClient";

import { getUserProfileData } from "@/lib/profile-service";
import { initialProfile } from "@/lib/initial-profile";


/**
 * Renders the home page.
 * @returns The home page.
*/

export default async function Home() {

  const user = await initialProfile();


  return (
    <>
      {user ? (
          <div>
            <div className="h-screen">
              
              <div className=" w-full h-full flex items-center justify-between">
                <div className="bg-neutral-200 dark:bg-black w-[14rem] h-full flex items-center justify-center pr-1">
                  <div className="h-full w-full">
                    <Sidebar/>
                  </div>
                </div>
                <div className="bg-neutral-200 dark:bg-slate-950 w-[85%] h-full flex items-center justify-center pl-1">
                  <div className="bg-white dark:bg-slate-950 h-full w-full p-5">
                    <HomeClient user={user}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        ) : (
          <Landingpage/>
          
        )
      }
    </>
    
    
  );
}
