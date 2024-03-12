import getProjectById from "@/actions/getProjects/getProjectById";
import EscalationMatrixModal from "@/components/modals/createModals/EscalationMatrixModal";
import { EscalationClient } from "@/components/pages/projects/escalation/EscalationCLient";
import { initialProfile } from "@/lib/initial-profile";
import { headers } from "next/headers";



export default async function TechnicalEscalationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (  
      <div className="h-full w-full !scrollbar-hide">
          {children}
      </div>
  );
}
