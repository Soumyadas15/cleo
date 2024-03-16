"use client"

import useAuditModal from "@/hooks/createModalHooks/useAuditModal";
import EmptyState from "../../EmptyState";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/reusable/Button";
import { Plus } from "lucide-react";
import useResourceModal from "@/hooks/createModalHooks/useResourceModal";
import { RiskTable } from "./RiskTable";

interface RisksClientProps {
    risks: any;
    user: any;
    project: any;
}

export const RisksClient = ({
    risks,
    user,
    project,
}: RisksClientProps) => {

    const resourceModal = useResourceModal();

    if (risks.length === 0){
        return(
            <div className="w-full h-full">
                <EmptyState 
                    title="No risk profile yet"
                />
            </div>
            
        )

    }


    return (
        <div className="w-full h-full scrollbar-hide">
            <div className="h-full overflow-hidden overflow-y-scroll scrollbar-hide">
                <RiskTable risks={risks} project={project} user={user}/>
            </div>
        </div>
    )
}