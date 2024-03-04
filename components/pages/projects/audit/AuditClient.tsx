"use client"

import useAuditModal from "@/hooks/createModalHooks/useAuditModal";
import EmptyState from "../../EmptyState";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/reusable/Button";
import { Plus } from "lucide-react";
import { AuditTable } from "./AuditTable";

interface AuditClientProps {
    audits: any;
    user: any;
    project: any;
}

export const AuditClient = ({
    audits,
    user,
    project,
}: AuditClientProps) => {


    const auditModal = useAuditModal();

    if (audits.length === 0){
        return(
            <EmptyState 
                title="No audits yet"
                subtitle="Start auditing project"
                showButton = {user.role === "AUDITOR"}
                buttonLabel="Create"
                onClick={auditModal.onOpen}
            />
        )

    }


    return (
        <div className="w-full h-full scrollbar-hide">
            {user.role === "AUDITOR" ? (
                <>
                <div className="h-[90%] overflow-hidden overflow-y-scroll scrollbar-hide">
                    <AuditTable audits={audits} project={project} user={user}/>
                </div>
                </>
                ) : (
                    <div className="h-full overflow-hidden overflow-y-scroll scrollbar-hide">
                       <AuditTable audits={audits} project={project} user={user}/>
                    </div>
                )
            }
            
        </div>
        
    )
}