"use client"

import useAuditModal from "@/hooks/createModalHooks/useAuditModal";
import EmptyState from "../../EmptyState";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/reusable/Button";
import { Plus } from "lucide-react";
import { UpdateTable } from "./UpdatesTable";
import useUpdateModal from "@/hooks/createModalHooks/useUpdateModal";

interface UpdatesClienttProps {
    updates: any;
    user: any;
    project: any;
}

export const UpdatesClient = ({
    updates,
    user,
    project,
}: UpdatesClienttProps) => {


    const updateModal = useUpdateModal();

    if (updates.length === 0){
        return(
            <EmptyState 
                title="No updates yet"
                subtitle="Start adding updates"
                showButton = {user.role === "AUDITOR"}
                buttonLabel="Create"
                onClick={updateModal.onOpen}
            />
        )

    }


    return (
        <div className="w-full h-full scrollbar-hide">
            {user.role === "MANAGER" ? (
                <>
                <div className="h-[90%] overflow-hidden overflow-y-scroll scrollbar-hide">
                    <UpdateTable updates={updates} project={project} user={user}/>
                </div>
                </>
                ) : (
                    <div className="h-full overflow-hidden overflow-y-scroll scrollbar-hide">
                       <UpdateTable updates={updates} project={project} user={user}/>
                    </div>
                )
            }
            
        </div>
        
    )
}