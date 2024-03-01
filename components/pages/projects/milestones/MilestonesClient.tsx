"use client"

import EmptyState from "../../EmptyState";

interface MilestonesClientProps {
    project: any;
}

export const MilestonesClient = ({
    project,
}: MilestonesClientProps) => {


    return (
        <EmptyState 
            title="Work underway"
            subtitle="Come back after a while"
        />
    )
}