import { Project, User, Workflow } from "@prisma/client"
import { FlowItem } from "./FlowItem";
import EmptyState from "../EmptyState";

interface FlowsClientProps {
    flows: Workflow[];
    user: User;
    project: Project;
}

export const FlowsClient = ({
    flows,
    user,
    project
} : FlowsClientProps) => {
    return (
        <div>
            <div className="overflow-hidden overflow-y-scroll w-full h-[92%] mt-2 mb-2 scrollbar-hide">
                {flows && flows.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
                        {flows.map((flow: any, index: number) => (
                            <div key={index} className="flex flex-col mt-2">
                                <FlowItem flow={flow} user={user} project={project}/>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        <EmptyState
                            title="No flows found"
                        />
                    </div>
                )}
            </div> 
        </div>
    )
}