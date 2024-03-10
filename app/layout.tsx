import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { getLocalData } from "@/lib/localData";

const font = Montserrat({ subsets: ["latin"] });

import data from "@/json/avatarConfig.json";
import { AvatarStateProvider } from "./context/avatarState";
import { ProfileModal } from "@/components/modals/ProfileModal";
import { initialProfile } from "@/lib/initial-profile";

export type JSONData = typeof data;

export const metadata: Metadata = {
  title: "Cleo",
  description: "Generated by create next app",
};


/**
 * Renders the application layout with the given children.
 * @param children - the application content to render
 */

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const localData: JSONData = await getLocalData();
  const user = await initialProfile();

  return (
    <html lang="en"  suppressHydrationWarning>
      <UserProvider>
        <AvatarStateProvider>
          <ProfileModal localData={localData} user={user}/>
          <body className={`${font.className} bg-black overflow-x-hidden scrollbar-hide`}>
            {children}
          </body>
        </AvatarStateProvider>
        
      </UserProvider>
    </html>
  );
}
