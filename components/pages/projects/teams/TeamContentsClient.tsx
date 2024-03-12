"use client"

import useAuditModal from "@/hooks/createModalHooks/useAuditModal";
import EmptyState from "../../EmptyState";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/reusable/Button";
import { Plus } from "lucide-react";
import useResourceModal from "@/hooks/createModalHooks/useResourceModal";
import useMomModal from "@/hooks/createModalHooks/useMomModal";
import usePhaseContentModal from "@/hooks/createModalHooks/usePhaseContentModal";
import { TeamContentsTable } from "./TeamContentsTable";

interface TeamContentsClientProps {
    teamContents: any;
    user: any;
    project: any;
}

export const TeamContentsClient = ({
    teamContents,
    user,
    project,
}: TeamContentsClientProps) => {

    const phaseContentModal = usePhaseContentModal();

    if (teamContents.length === 0){
        return(
            <EmptyState 
                title="This phase is empty"
            />
        )

    }


    return (
        <div className="w-full h-full scrollbar-hide">
            {user.role === "MANAGER" ? (
                <>
                <div className="h-full overflow-hidden overflow-y-scroll scrollbar-hide">
                    <TeamContentsTable teamContents={teamContents} project={project} user={user}/>
                </div>
                </>
                ) : (
                    <div className="h-full overflow-hidden overflow-y-scroll scrollbar-hide">
                        <TeamContentsTable teamContents={teamContents} project={project} user={user}/>
                    </div>
                )
            }
            
        </div>
    )
}