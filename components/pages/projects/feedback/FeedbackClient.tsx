"use client"

import useAuditModal from "@/hooks/createModalHooks/useAuditModal";
import EmptyState from "../../EmptyState";
import { FeedbackTable } from "./FeedbackTable";
import useFeedbackModal from "@/hooks/createModalHooks/useFeedbackModal";

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

    const feedbackModal = useFeedbackModal();

    if (feedbacks.length === 0){
        return(
            <EmptyState 
                title="No feedbacks yet"
                subtitle="Add a feedback"
                showButton = {user.role === "MANAGER"}
                buttonLabel="Create"
                onClick={feedbackModal.onOpen}
            />
        )

    }


    return (
        <div className="w-full h-full scrollbar-hide">
            {user.role === "MANAGER" ? (
                <>
                <div className="h-[90%] overflow-hidden overflow-y-scroll scrollbar-hide">
                    <FeedbackTable feedbacks={feedbacks} project={project} user={user}/>
                </div>
                </>
                ) : (
                    <div className="h-full overflow-hidden overflow-y-scroll scrollbar-hide">
                       <FeedbackTable feedbacks={feedbacks} project={project} user={user}/>
                    </div>
                )
            }
            
        </div>
    )
}