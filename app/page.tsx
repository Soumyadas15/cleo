

import { Sidebar } from "@/components/sidebar/Sidebar";
import { Landingpage } from "@/components/pages/landing/Landing";
import { HomeClient } from "@/components/pages/home/HomeClient";

import { getUserProfileData } from "@/lib/profile-service";
import { initialProfile } from "@/lib/initial-profile";


/**
 * Renders the home page.
 * @returns The home page.
*/

export default function Home() {

  return (
    <div>
      <Landingpage/>
    </div>
  );
}