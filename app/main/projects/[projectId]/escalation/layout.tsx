import getProjectById from "@/actions/getProjects/getProjectById";
import EscalationMatrixModal from "@/components/modals/createModals/EscalationMatrixModal";
import { EscalationClient } from "@/components/pages/projects/escalation/EscalationCLient";
import { initialProfile } from "@/lib/initial-profile";
import { headers } from "next/headers";

interface IParams {
  projectId?: string;
}

export default async function EscalationLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: IParams;
}>) {

  const project = await getProjectById(params);
  const user = await initialProfile();

  return (  
      <div className="h-full w-full scrollbar-hide">
          <div className="w-full h-[10%]">
            <EscalationMatrixModal project={project!} user={user}/>
            <EscalationClient project={project}/>
          </div>
          <div className="w-full h-[90%] scrollbar-hide">
            {children}
          </div>
      </div>
  );
}
