"use client"

import EmptyState from "../../EmptyState";

interface EscalationClientProps {
    project: any;
}

export const EscalationClient = ({
    project,
}: EscalationClientProps) => {


    return (
        <EmptyState 
            title="Work underway"
            
        />
    )
}