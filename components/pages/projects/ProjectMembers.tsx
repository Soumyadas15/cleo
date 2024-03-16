"use client"

import { AnimatedTooltip } from "@/components/ui/animated-tooltip"
import { Member } from "@prisma/client"

interface ProjectMembersProps {
    members: Member[];
}

export const ProjectMembers = ({
    members,
} : ProjectMembersProps) => {

    return (
        <div className="flex pl-6 -mr-10 w-[13rem] items-end justify-centern scale-[0.7]">
            <AnimatedTooltip items={members} />
        </div>
    )
}