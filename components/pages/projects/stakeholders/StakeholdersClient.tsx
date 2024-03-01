"use client"

import EmptyState from "../../EmptyState";

interface StakeholdersClientProps {
    project: any;
}

export const StakeholdersClient = ({
    project,
}: StakeholdersClientProps) => {


    return (
        <EmptyState 
            title="Work underway"
        />
    )
}