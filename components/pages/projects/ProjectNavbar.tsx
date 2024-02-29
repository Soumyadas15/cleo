"use client"

import { usePathname } from "next/navigation";
import { ProjectNavbarItem } from "./ProjectNavbarItem";

interface ProjectNavbarProps {
    project: any;
}

export const ProjectNavbar = ({
    project,
}: ProjectNavbarProps) => {

    const pathname = usePathname();

    return (
        <div className="w-[80%] h-[2rem] flex items-center justify-between gap-5 mt-3">
            <ProjectNavbarItem
                label="Scope"
                to={`/main/projects/${project.id}/scope`}
                isActive = {pathname.endsWith(`scope`)}
            />
            <ProjectNavbarItem
                label="Stakeholders"
                to={`/main/projects/${project.id}/stakeholders`}
                isActive = {pathname.endsWith(`stakeholders`)}
            />
            <ProjectNavbarItem
                label="Escalation Matrix"
                to={`/main/projects/${project.id}/escalation`}
                isActive = {pathname.endsWith(`escalation`)}
            />
            <ProjectNavbarItem
                label="Risks"
                to={`/main/projects/${project.id}/risks`}
                isActive = {pathname.endsWith(`risks`)}
            />
            <ProjectNavbarItem
                label="Milestones"
                to={`/main/projects/${project.id}/milestones`}
                isActive = {pathname.endsWith(`milestones`)}
            />
            <ProjectNavbarItem
                label="Audits"
                to={`/main/projects/${project.id}/audits`}
                isActive = {pathname.endsWith(`audits`)}
            />
        </div>
    )
}