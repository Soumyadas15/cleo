"use client"

import useAuditModal from "@/hooks/useAuditModal";
import EmptyState from "../../EmptyState";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/reusable/Button";
import { Plus } from "lucide-react";
import { FeedbackTable } from "./FeedbackTable";

interface FeedbacksClientProps {
    feedbacks: any;
    user: any;
    project: any;
}

export const FeedbacksClient = ({
    feedbacks,
    user,
    project,
}: FeedbacksClientProps) => {

    const auditModal = useAuditModal();

    if (feedbacks.length === 0){
        return(
            <EmptyState 
                title="No resources yet"
                subtitle="Add a resource"
                showButton = {user.role === "MANAGER"}
                buttonLabel="Create"
                onClick={auditModal.onOpen}
            />
        )

    }


    return (
        <div className="w-full h-full scrollbar-hide">
            Hehe
            {/* {user.role === "MANAGER" ? (
                <>
                <div className="h-[90%] overflow-hidden overflow-y-scroll scrollbar-hide">
                    <FeedbackTable feedbacks={resources} project={project} user={user}/>
                </div>
                </>
                ) : (
                    <div className="h-full overflow-hidden overflow-y-scroll scrollbar-hide">
                       <FeedbackTable feedbacks={resources} project={project} user={user}/>
                    </div>
                )
            } */}
            
        </div>
    )
}