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
            title="To be made later"
        />
    )
}