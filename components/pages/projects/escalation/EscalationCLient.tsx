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
            title="N0thing to show"
            subtitle="Start by adding an escalation matrix"
        />
    )
}