"use client"

import { Milestone, Project, User } from "@prisma/client";
import EmptyState from "../../EmptyState";
import { MilestoneTable } from "./MilestonesTable";

interface MilestonesClientProps {
    milestones: Milestone[];
    user: User;
    project: Project;
}

export const MilestonesClient = ({
    project,
    user,
    milestones
}: MilestonesClientProps) => {

    if (milestones.length === 0) {
        return (
            <EmptyState
                title="No milestones yet"
            />
        )
    }

    return (
        <div className="w-full h-full scrollbar-hide">
            <div className="h-full overflow-hidden overflow-y-scroll scrollbar-hide">
                <MilestoneTable milestones={milestones} project={project} user={user}/>
            </div>
        </div>
    )
}