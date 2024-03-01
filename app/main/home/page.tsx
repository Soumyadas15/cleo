

import { Sidebar } from "@/components/sidebar/Sidebar";
import { Landingpage } from "@/components/pages/landing/Landing";
import { HomeClient } from "@/components/pages/home/HomeClient";

import { getUserProfileData } from "@/lib/profile-service";
import { initialProfile } from "@/lib/initial-profile";
import useCreateModal from "@/hooks/useLoginModal";


/**
 * Renders the home page.
 * @returns The home page.
*/

export default async function HomePage() {

  const user = await initialProfile();

  return (
    <HomeClient user={user}/>
  );
}
