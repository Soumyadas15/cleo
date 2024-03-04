"use client"

import useAuditModal from "@/hooks/createModalHooks/useAuditModal";
import EmptyState from "../../EmptyState";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/reusable/Button";
import { Plus } from "lucide-react";
import { ResourceTable } from "./ResourceTable";
import useResourceModal from "@/hooks/createModalHooks/useResourceModal";

interface ResourcesClientProps {
    resources: any;
    user: any;
    project: any;
}

export const ResourcesClient = ({
    resources,
    user,
    project,
}: ResourcesClientProps) => {

    const resourceModal = useResourceModal();

    if (resources.length === 0){
        return(
            <EmptyState 
                title="No resources yet"
                subtitle="Add a resource"
                showButton = {user.role === "MANAGER"}
                buttonLabel="Create"
                onClick={resourceModal.onOpen}
            />
        )

    }


    return (
        <div className="w-full h-full scrollbar-hide">
            {user.role === "MANAGER" ? (
                <>
                <div className="h-[90%] overflow-hidden overflow-y-scroll scrollbar-hide">
                    <ResourceTable resources={resources} project={project} user={user}/>
                </div>
                </>
                ) : (
                    <div className="h-full overflow-hidden overflow-y-scroll scrollbar-hide">
                       <ResourceTable resources={resources} project={project} user={user}/>
                    </div>
                )
            }
            
        </div>
    )
}