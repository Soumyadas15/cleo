"use client"

import useAuditModal from "@/hooks/createModalHooks/useAuditModal";
import EmptyState from "../../EmptyState";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/reusable/Button";
import { Plus } from "lucide-react";
import { SprintTable } from "./SprintTable";

interface SprintClientProps {
    sprints: any;
    user: any;
    project: any;
}

export const SprintClient = ({
    sprints,
    user,
    project,
}: SprintClientProps) => {


    const auditModal = useAuditModal();

    if (sprints.length === 0){
        return(
            <EmptyState 
                title="No sprints yet"
            />
        )
    }

    return (
        <div className="w-full h-full scrollbar-hide">
            <div className="h-full overflow-hidden overflow-y-scroll scrollbar-hide">
                <SprintTable sprints={sprints} project={project} user={user}/>
            </div>
        </div>
    )
}