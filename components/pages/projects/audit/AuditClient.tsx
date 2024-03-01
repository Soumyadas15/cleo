"use client"

import useAuditModal from "@/hooks/useAuditModal";
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

    // useEffect(() => {
    //     async function fetchAudits() {
    //     try {
    //         const response = await axios.get(`http://localhost:3000/api/audits?projectId=${project.id}`);
    //         setAudits(response.data);
    //     } catch (error) {
    //         console.error('Error fetching audits:', error);
    //     }
    //     }

    //     fetchAudits();
    // }, [project.id]);

    if (audits.length === 0){
        <EmptyState 
            title="No audits yet"
            subtitle="Start auditing project"
            showButton
            buttonLabel="Add"
            onClick={auditModal.onOpen}
        />
    }


    return (
        <div className="w-full h-full scrollbar-hide">
            {user.role === "AUDITOR" ? (
                <>
                <div className="w-full h-[10%] pr-5 flex items-center justify-end">
                        <Button 
                            label="New" 
                            icon={ <Plus className="scale-[0.8]"/> }
                            className="flex items-center text-sm p-2 mb-1 rounded-[5px] pr-3"
                            onClick={auditModal.onOpen}
                        />
                </div> 
                <div className="h-[90%] overflow-hidden overflow-y-scroll scrollbar-hide">
                    <AuditTable audits={audits} project={project}/>
                </div>
                </>
                ) : (
                    <div className="h-full overflow-hidden overflow-y-scroll scrollbar-hide">
                       <AuditTable audits={audits} project={project}/>
                    </div>
                )
            }
            
        </div>
        
    )
}