"use client"

import useAuditModal from "@/hooks/createModalHooks/useAuditModal";
import EmptyState from "../../EmptyState";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/reusable/Button";
import { Plus } from "lucide-react";
import { MomTable } from "./MomTable";
import useResourceModal from "@/hooks/createModalHooks/useResourceModal";
import useMomModal from "@/hooks/createModalHooks/useMomModal";

interface MomsClientProps {
    moms: any;
    user: any;
    project: any;
}

export const MomsClient = ({
    moms,
    user,
    project,
}: MomsClientProps) => {

    const momClient = useMomModal();

    if (moms.length === 0){
        return(
            <EmptyState 
                title="No MoMs yet"
                subtitle="Add MoM"
                showButton = {user.role === "MANAGER"}
                buttonLabel="Add"
                onClick={momClient.onOpen}
            />
        )

    }


    return (
        <div className="w-full h-full scrollbar-hide">
            {user.role === "MANAGER" ? (
                <>
                <div className="h-[90%] overflow-hidden overflow-y-scroll scrollbar-hide">
                    <MomTable moms={moms} project={project} user={user}/>
                </div>
                </>
                ) : (
                    <div className="h-full overflow-hidden overflow-y-scroll scrollbar-hide">
                       <MomTable moms={moms} project={project} user={user}/>
                    </div>
                )
            }
            
        </div>
    )
}