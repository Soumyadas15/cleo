import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Toaster } from "react-hot-toast";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { ThemeProvider } from "@/providers/ThemeProvider";
import LoginModal from "@/components/modals/createModals/CreateModal";
import CreateModal from "@/components/modals/createModals/CreateModal";
import { Navbar } from "@/components/navbar/Navbar";
import { initialProfile } from "@/lib/initial-profile";
import getUserByEmail from "@/actions/getUsers/getUserByEmail";
import { Landingpage } from "@/components/pages/landing/Landing";
import { Claims } from "@auth0/nextjs-auth0";

const font = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cleo",
  description: "Generated by create next app",
};


/**
 * Renders the application layout with the given children.
 * @param children - the application content to render
 */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en"  suppressHydrationWarning>
      <UserProvider>
        <body className={`${font.className} bg-black overflow-x-hidden scrollbar-hide`}>
            {children}
        </body>
      </UserProvider>
    </html>
  );
}
