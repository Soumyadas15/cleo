"use client"

import useAuditModal from "@/hooks/createModalHooks/useAuditModal";
import EmptyState from "../../EmptyState";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/reusable/Button";
import { Plus } from "lucide-react";
import { StakeholdersTable } from "./StakeholdersTable";
import useStakeholderModal from "@/hooks/createModalHooks/useStakeholderModal";
import { Project, User } from "@prisma/client";

interface StakeholdersClientProps {
    stakeholders: any;
    user: User;
    project: Project;
}

export const StakeholdersClient = ({
    stakeholders,
    user,
    project,
}: StakeholdersClientProps) => {


    const stakeholderModal = useStakeholderModal();

    if (stakeholders.length === 0){
        return(
            <EmptyState 
                title="No stakeholders yet"
                subtitle="Add a stakeholder"
                showButton = {(user.role === "MANAGER" || user.role === "ADMIN")}
                buttonLabel="Add"
                onClick={stakeholderModal.onOpen}
            />
        )

    }


    return (
        <div className="w-full h-full scrollbar-hide">
            <div className="h-full overflow-hidden overflow-y-scroll scrollbar-hide">
                <StakeholdersTable stakeholders={stakeholders} project={project} user={user}/>
            </div>
        </div>
        
    )
}