"use client"

import EmptyState from "../../EmptyState";

interface RisksClientProps {
    project: any;
}

export const RisksClient = ({
    project,
}: RisksClientProps) => {


    return (
        <EmptyState 
            title="Work underway"
        />
    )
}