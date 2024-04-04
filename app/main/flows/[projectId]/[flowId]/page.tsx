import getProjectById from "@/actions/getProjects/getProjectById";
import { FlowsClient } from "@/components/pages/flows/FlowsClient";
import EditorCanvas from "@/components/pages/flows/editor/EditorCanvas";
import { ProjectClient } from "@/components/pages/projects/ProjectClient";
import { initialProfile } from "@/lib/initial-profile";
import { ConnectionsProvider } from "@/providers/ConnectionProvider";
import EditorProvider from "@/providers/EditorProvider";

interface IParams {
    flowId?: string;
}


const FlowPage = async ({
    params,
}: Readonly<{
    params: IParams;
  }>) => {


    return (
        <EditorProvider>
            <ConnectionsProvider>
                <div className=" w-full h-full">
                    <EditorCanvas/>
                </div>
            </ConnectionsProvider>

        </EditorProvider>

    )
}
export default FlowPage;