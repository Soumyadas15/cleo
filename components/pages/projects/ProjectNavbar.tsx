"use client"

import { usePathname } from "next/navigation";
import { ProjectNavbarItem } from "./ProjectNavbarItem";
import useAuditModal from "@/hooks/useAuditModal";
import { Button } from "@/components/reusable/Button";
import { Plus } from "lucide-react";
import useResourceModal from "@/hooks/useResourceModal";

interface ProjectNavbarProps {
    project: any;
    user: any;
}

export const ProjectNavbar = ({
    project,
    user
}: ProjectNavbarProps) => {

    const pathname = usePathname();
    
    const auditModal = useAuditModal();
    const resourceModal = useResourceModal();

    const isAuditRoute = pathname.startsWith(`/main/projects/${project.id}/audits`);
    const isResourceRoute = pathname.startsWith(`/main/projects/${project.id}/resources`);

    const routes = [
        '/phases',
        '/resources',
        '/feedback',
        '/updates',
        '/moms',
        '/scope',
        '/stakeholders',
        '/escalation',
        '/risks',
        '/milestones',
        '/audits'
    ];

    return (
        <div className="w-full h-[2rem] flex items-center justify-between gap-5 mt-3 ">
            <div className="w-[80%] h-full flex items-center justify-between gap-5 overflow-hidden overflow-x-scroll scrollbar-hide">
                <div className="flex items-center gap-10">
                    {routes.map((route, index) => (
                        <ProjectNavbarItem
                            key={index}
                            label={route.slice(1).charAt(0).toUpperCase() + route.slice(2)}
                            to={`/main/projects/${project.id}${route}`}
                            isActive={pathname.endsWith(route)}
                        />
                    ))}
                </div>
                
            </div>
            {user.role === "MANAGER" ? (
                <div>
                    {pathname.endsWith('/phases') && (
                        <Button 
                            label="Add Phase" 
                            icon={<Plus className="scale-[0.8]"/>}
                            className="flex items-center text-sm p-2 mb-1 rounded-[5px] pr-3"
                            onClick={auditModal.onOpen}
                        />
                    )}
                    {isResourceRoute && (
                        <Button 
                            label="Add resource" 
                            icon={<Plus className="scale-[0.8]"/>}
                            className="flex items-center text-sm p-2 mb-1 rounded-[5px] pr-3"
                            onClick={resourceModal.onOpen}
                        />
                    )}
                    {pathname.endsWith('/feedback') && (
                        <Button 
                            label="Add feedback" 
                            icon={<Plus className="scale-[0.8]"/>}
                            className="flex items-center text-sm p-2 mb-1 rounded-[5px] pr-3"
                            onClick={auditModal.onOpen}
                        />
                    )}
                    {pathname.endsWith('/updates') && (
                        <Button 
                            label="Add update" 
                            icon={<Plus className="scale-[0.8]"/>}
                            className="flex items-center text-sm p-2 mb-1 rounded-[5px] pr-3"
                            onClick={auditModal.onOpen}
                        />
                    )}
                    {pathname.endsWith('/moms') && (
                        <Button 
                            label="Add MoM" 
                            icon={<Plus className="scale-[0.8]"/>}
                            className="flex items-center text-sm p-2 mb-1 rounded-[5px] pr-3"
                            onClick={auditModal.onOpen}
                        />
                    )}
                    
                    {pathname.endsWith('/scope') && (
                        <Button 
                            label="Add scope" 
                            icon={<Plus className="scale-[0.8]"/>}
                            className="flex items-center text-sm p-2 mb-1 rounded-[5px] pr-3"
                            onClick={auditModal.onOpen}
                        />
                    )}
                    {pathname.endsWith('/stakeholders') && (
                        <Button 
                            label="Add stakeholder" 
                            icon={<Plus className="scale-[0.8]"/>}
                            className="flex items-center text-sm p-2 mb-1 rounded-[5px] pr-3"
                            onClick={auditModal.onOpen}
                        />
                    )}
                    {pathname.endsWith('/escalation') && (
                        <Button 
                            label="Add escalation matrix" 
                            icon={<Plus className="scale-[0.8]"/>}
                            className="flex items-center text-sm p-2 mb-1 rounded-[5px] pr-3"
                            onClick={auditModal.onOpen}
                        />
                    )}
                    {pathname.endsWith('/risks') && (
                        <Button 
                            label="Add risk" 
                            icon={<Plus className="scale-[0.8]"/>}
                            className="flex items-center text-sm p-2 mb-1 rounded-[5px] pr-3"
                            onClick={auditModal.onOpen}
                        />
                    )}
                    {pathname.endsWith('/milestones') && (
                        <Button 
                            label="Add milestone" 
                            icon={<Plus className="scale-[0.8]"/>}
                            className="flex items-center text-sm p-2 mb-1 rounded-[5px] pr-3"
                            onClick={auditModal.onOpen}
                        />
                    )}
                </div>
            ) : (
                <div>
                    {user.role === "AUDITOR" && isAuditRoute && (
                        <Button 
                            label="Add audit" 
                            icon={<Plus className="scale-[0.8]"/>}
                            className="flex items-center text-sm p-2 mb-1 rounded-[5px] pr-3"
                            onClick={auditModal.onOpen}
                        />
                    )}
                </div>
            )}
        </div>
    )
}