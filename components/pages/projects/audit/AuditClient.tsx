"use client"

import useAuditModal from "@/hooks/useAuditModal";
import EmptyState from "../../EmptyState";

interface AuditClientProps {
    project: any;
}

export const AuditClient = ({
    project,
}: AuditClientProps) => {

    const auditModal = useAuditModal();

    return (
        <EmptyState 
            title="No audits yet"
            subtitle="Start auditing project"
            showButton
            buttonLabel="Add"
            onClick={auditModal.onOpen}
        />
    )
}