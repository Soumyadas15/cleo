"use client"

import EmptyState from "../../EmptyState";

import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuGroup, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger } from "@/components/ui/dropdown";
    

import { Plus, PlusIcon } from "lucide-react";
import { PhasesList } from "./PhasesList";
import { Button } from "@/components/reusable/Button";
import usePhaseContentModal from "@/hooks/usePhaseContentModal";
import { usePathname } from "next/navigation";

interface FeedbacksClientProps {
    phases: any;
    user: any;
    project: any;
    phase?: any;
}

export const PhasesClient = ({
    phases,
    user,
    project,
    phase
}: FeedbacksClientProps) => {

    const phaseContentModal = usePhaseContentModal();
    const pathname = usePathname();

    // if (phases.length === 0){
    //     return(
    //         <EmptyState 
    //             title="No Phases yet"
    //             subtitle="Create a Phase"
    //             showButton = {user.role === "MANAGER"}
    //             buttonLabel="Create"
    //             onClick={feedbackModal.onOpen}
    //         />
    //     )

    // }

    const isPhasesHome = pathname.endsWith('/phases');


    return (
        <div className="scrollbar-hide">
            <div className="flex items-center w-full justify-between">
                <PhasesList phases={phases} project={project}/>
                {!isPhasesHome ? (
                        <Button
                            label="Add content"
                            icon={ <PlusIcon/> }
                            className="bg-red-500 pr-3 pl-3 p-2 flex items-center rounded-[5px] text-sm"
                            onClick={phaseContentModal.onOpen}
                        />
                    ) : (
                        <div></div>
                    )
                }
            </div>
            
            {/* {user.role === "MANAGER" ? (
                <>
                <div className="h-[90%] overflow-hidden overflow-y-scroll scrollbar-hide">
                    <FeedbackTable feedbacks={feedbacks} project={project} user={user}/>
                </div>
                </>
                ) : (
                    <div className="h-full overflow-hidden overflow-y-scroll scrollbar-hide">
                       <FeedbackTable feedbacks={feedbacks} project={project} user={user}/>
                    </div>
                )
            } */}
        </div>
    )
}