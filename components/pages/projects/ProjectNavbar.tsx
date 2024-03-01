"use client"

import { usePathname } from "next/navigation";
import { ProjectNavbarItem } from "./ProjectNavbarItem";
import useAuditModal from "@/hooks/useAuditModal";
import { Button } from "@/components/reusable/Button";
import { Plus } from "lucide-react";

interface ProjectNavbarProps {
    project: any;
}

export const ProjectNavbar = ({
    project,
}: ProjectNavbarProps) => {

    const pathname = usePathname();
    const auditModal = useAuditModal();

    return (
        <div className="w-full h-[2rem] flex items-center justify-between gap-5 mt-3">
            <div className="w-[70%] h-full flex items-center justify-between gap-5">
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
            <Button 
                label="New audit" 
                icon={ <Plus className="scale-[0.8]"/> }
                className="flex items-center text-sm p-2 mb-1 rounded-[5px] pr-3"
                onClick={auditModal.onOpen}
            />
        </div>
    )
}