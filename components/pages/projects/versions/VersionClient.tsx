"use client"

import useAuditModal from "@/hooks/createModalHooks/useAuditModal";
import EmptyState from "../../EmptyState";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/reusable/Button";
import { Plus } from "lucide-react";
import { VersionTable } from "./VersionTable";

interface VersionClientProps {
    versions: any;
    user: any;
    project: any;
}

export const VersionClient = ({
    versions,
    user,
    project,
}: VersionClientProps) => {


    const auditModal = useAuditModal();

    if (versions.length === 0){
        return(
            <EmptyState 
                title="No versions yet"
            />
        )

    }


    return (
        <div className="w-full h-full scrollbar-hide">
            <div className="h-full overflow-hidden overflow-y-scroll scrollbar-hide">
                <VersionTable versions={versions} project={project} user={user}/>
            </div>
        </div>
        
    )
}