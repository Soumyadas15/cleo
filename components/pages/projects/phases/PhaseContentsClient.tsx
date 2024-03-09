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
import { PhaseContentsTable } from "./PhaseContentsTable";

interface PhaseContentsClientProps {
    phaseContents: any;
    user: any;
    project: any;
}

export const PhaseContentsClient = ({
    phaseContents,
    user,
    project,
}: PhaseContentsClientProps) => {

    const phaseContentModal = usePhaseContentModal();

    if (phaseContents.length === 0){
        return(
            <EmptyState 
                title="This phase is empty"
                subtitle="Add content"
                showButton = {user.role === "MANAGER"}
                buttonLabel="Add"
                onClick={phaseContentModal.onOpen}
            />
        )

    }


    return (
        <div className="w-full h-full scrollbar-hide">
            {user.role === "MANAGER" ? (
                <>
                <div className="h-full overflow-hidden overflow-y-scroll scrollbar-hide">
                    <PhaseContentsTable phaseContents={phaseContents} project={project} user={user}/>
                </div>
                </>
                ) : (
                    <div className="h-full overflow-hidden overflow-y-scroll scrollbar-hide">
                        <PhaseContentsTable phaseContents={phaseContents} project={project} user={user}/>
                    </div>
                )
            }
            
        </div>
    )
}