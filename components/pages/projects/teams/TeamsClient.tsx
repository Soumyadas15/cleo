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
import { TeamsList } from "./TeamsList";
import { Button } from "@/components/reusable/Button";
import usePhaseContentModal from "@/hooks/createModalHooks/usePhaseContentModal";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

interface TeamsClientProps {
    teams: any;
    user: any;
    project: any;
    team?: any;
}

export const TeamsClient = ({
    teams,
    user,
    project,
    team
}: TeamsClientProps) => {

    const phaseContentModal = usePhaseContentModal();
    const pathname = usePathname();
    const isTeamsHome = pathname?.endsWith('/teams');
    const router = useRouter();

    const onAdd = async (project: any) => {
        const data = { projectId: project.id };
        console.log(project.id);
        axios.post('/api/teams', data)
        .then((response) => {
            const phase = response.data;
            const phaseId = phase.id;
            toast.success('Team phase created');
            router.push(`/main/projects/${project.id}/teams/${phaseId}`);
        }).catch((error) => {
            toast.error(error.message);
        }).finally(() => {
            router.refresh();
        });
    };


    if (teams.length === 0){
        return(
            <EmptyState 
                title="No teams yet"
                subtitle="Add a Team"
                showButton = {user.role === "MANAGER"}
                buttonLabel="Add"
                onClick={() => {onAdd(project)}}
            />
        )
    }

    return (
        <div className="scrollbar-hide">
            <div className="flex items-center w-full gap-2">
                <TeamsList teams={teams} project={project} user={user}/>
                
                {(!isTeamsHome && (user.role === "ADMIN" || user.role === "MANAGER"))? (
                        <Button
                            label="Add team"
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