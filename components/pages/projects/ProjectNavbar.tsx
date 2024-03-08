"use client"

import { usePathname, useRouter } from "next/navigation";
import { ProjectNavbarItem } from "./ProjectNavbarItem";
import useAuditModal from "@/hooks/createModalHooks/useAuditModal";
import { Button } from "@/components/reusable/Button";
import { Plus } from "lucide-react";
import useResourceModal from "@/hooks/createModalHooks/useResourceModal";
import useFeedbackModal from "@/hooks/createModalHooks/useFeedbackModal";
import useUpdateModal from "@/hooks/createModalHooks/useUpdateModal";
import useEditUpdateModal from "@/hooks/editModalHooks/useEditUpdateModa";
import useMomModal from "@/hooks/createModalHooks/useMomModal";
import axios from "axios";
import toast from "react-hot-toast";

interface ProjectNavbarProps {
    project: any;
    user: any;
}

export const ProjectNavbar = ({
    project,
    user,
}: ProjectNavbarProps) => {

    const pathname = usePathname();
    const router = useRouter();
    
    const auditModal = useAuditModal();
    const resourceModal = useResourceModal();
    const feedbackModal = useFeedbackModal();
    const updateModal = useUpdateModal();
    const momModal = useMomModal();

    const isPhaseRoute = pathname?.startsWith(`/main/projects/${project.id}/phases`);
    const isAuditRoute = pathname?.startsWith(`/main/projects/${project.id}/audits`);
    const isResourceRoute = pathname?.startsWith(`/main/projects/${project.id}/resources`);
    const isFeedbackRoute = pathname?.startsWith(`/main/projects/${project.id}/feedbacks`);
    const isUpdateRoute = pathname?.startsWith(`/main/projects/${project.id}/updates`);
    const isMomRoute = pathname?.startsWith(`/main/projects/${project.id}/moms`);
    

    const onAddPhase = async (project: any) => {
        const data = { projectId: project.id };
        console.log(project.id);
        axios.post('/api/phases', data)
        .then((response) => {
            const phase = response.data;
            const phaseId = phase.id;
            toast.success('Phase created');
            router.push(`/main/projects/${project.id}/phases/${phaseId}`);
        }).catch((error) => {
            toast.error(error.message);
        }).finally(() => {
            router.refresh();
        });
    };

    const routes = [
        '/phases',
        '/resources',
        '/feedbacks',
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
                            isActive={pathname?.startsWith(`/main/projects/${project.id}${route}`)}
                        />
                    ))}
                </div>
                
            </div>
            {(user.role === "MANAGER" || user.role === "ADMIN") ? (
                <div>
                    {isPhaseRoute && (
                        <Button 
                            label="Add Phase" 
                            icon={<Plus className="scale-[0.8]"/>}
                            className="flex items-center text-sm p-2 mb-1 rounded-[5px] pr-3"
                            onClick={() => {onAddPhase(project)}}
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
                    {isFeedbackRoute && (
                        <Button 
                            label="Add feedback" 
                            icon={<Plus className="scale-[0.8]"/>}
                            className="flex items-center text-sm p-2 mb-1 rounded-[5px] pr-3"
                            onClick={feedbackModal.onOpen}
                        />
                    )}
                    {isUpdateRoute && (
                        <Button 
                            label="Add update" 
                            icon={<Plus className="scale-[0.8]"/>}
                            className="flex items-center text-sm p-2 mb-1 rounded-[5px] pr-3"
                            onClick={updateModal.onOpen}
                        />
                    )}
                    {isMomRoute && (
                        <Button 
                            label="Add MoM" 
                            icon={<Plus className="scale-[0.8]"/>}
                            className="flex items-center text-sm p-2 mb-1 rounded-[5px] pr-3"
                            onClick={momModal.onOpen}
                        />
                    )}
                    
                    {pathname?.endsWith('/scope') && (
                        <Button 
                            label="Add scope" 
                            icon={<Plus className="scale-[0.8]"/>}
                            className="flex items-center text-sm p-2 mb-1 rounded-[5px] pr-3"
                            onClick={auditModal.onOpen}
                        />
                    )}
                    {pathname?.endsWith('/stakeholders') && (
                        <Button 
                            label="Add stakeholder" 
                            icon={<Plus className="scale-[0.8]"/>}
                            className="flex items-center text-sm p-2 mb-1 rounded-[5px] pr-3"
                            onClick={auditModal.onOpen}
                        />
                    )}
                    {pathname?.endsWith('/escalation') && (
                        <Button 
                            label="Add matrix" 
                            icon={<Plus className="scale-[0.8]"/>}
                            className="flex items-center text-sm p-2 mb-1 rounded-[5px] pr-3"
                            onClick={auditModal.onOpen}
                        />
                    )}
                    {pathname?.endsWith('/risks') && (
                        <Button 
                            label="Add risk" 
                            icon={<Plus className="scale-[0.8]"/>}
                            className="flex items-center text-sm p-2 mb-1 rounded-[5px] pr-3"
                            onClick={auditModal.onOpen}
                        />
                    )}
                    {pathname?.endsWith('/milestones') && (
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