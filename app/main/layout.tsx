import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import '@/app/globals.css'
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Toaster } from "react-hot-toast";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { ThemeProvider } from "@/providers/ThemeProvider";
import LoginModal from "@/components/modals/CreateModal";
import CreateModal from "@/components/modals/CreateModal";
import { Navbar } from "@/components/navbar/Navbar";
import { initialProfile } from "@/lib/initial-profile";
import getUserByEmail from "@/actions/getUsers/getUserByEmail";
import { Landingpage } from "@/components/pages/landing/Landing";
import { Claims } from "@auth0/nextjs-auth0";
import { getUserProfileData } from "@/lib/profile-service";
import SuccessModal from "@/components/modals/SuccessModal";

const font = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};


/**
 * Renders the application layout with the given children.
 * @param children - the application content to render
 */

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const user = await initialProfile();

  return (
    <html lang="en" >
      <UserProvider>
        <body className={`${font.className} bg-slate-950 overflow-x-hidden`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
          >
            <CreateModal user={user}/>
            <SuccessModal/>
            <Toaster/>
            <div>
              <div className="h-screen">
                <div className=" w-full h-full flex items-center justify-between">
                  <div className="bg-neutral-200 dark:bg-black w-[14rem] h-full flex items-center justify-center pr-1">
                    <div className="h-full w-full">
                      <Sidebar user={user}/>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-950 w-[85%] h-full flex items-center justify-center pl-1">
                    <div className=" dark:bg-slate-950 h-full w-full">
                      <div className="w-full h-[10%] p-5">
                        <Navbar user={user}/>
                      </div>
                      <div className="w-full h-[90%]">
                        {children}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ThemeProvider>
        </body>
      </UserProvider>
    </html>
  );
}
