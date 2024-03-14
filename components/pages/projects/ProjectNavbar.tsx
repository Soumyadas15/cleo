"use client"

import { usePathname, useRouter } from "next/navigation";
import { ProjectNavbarItem } from "./ProjectNavbarItem";
import useAuditModal from "@/hooks/createModalHooks/useAuditModal";
import { ArrowRightIcon, DownloadIcon, Plus } from "lucide-react";
import useResourceModal from "@/hooks/createModalHooks/useResourceModal";
import useFeedbackModal from "@/hooks/createModalHooks/useFeedbackModal";
import useUpdateModal from "@/hooks/createModalHooks/useUpdateModal";
import useEditUpdateModal from "@/hooks/editModalHooks/useEditUpdateModa";
import useMomModal from "@/hooks/createModalHooks/useMomModal";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import useStakeholderModal from "@/hooks/createModalHooks/useStakeholderModal";
import useRiskModal from "@/hooks/createModalHooks/useRiskModal";
import { ClientDownloadButton } from "./ClientDownloadButton";
import { Button } from "@/components/ui/button";

interface ProjectNavbarProps {
    project: any;
    user: any;
}

export const ProjectNavbar = ({
    project,
    user,
}: ProjectNavbarProps) => {

    const [navbarPosition, setNavbarPosition] = useState('justify-start');

    const toggleNavbar = () => {
        setNavbarPosition(navbarPosition === 'justify-start' ? 'justify-end' : 'justify-start');
    }

    const pathname = usePathname();
    const router = useRouter();
    
    
    const auditModal = useAuditModal();
    const resourceModal = useResourceModal();
    const feedbackModal = useFeedbackModal();
    const updateModal = useUpdateModal();
    const momModal = useMomModal();
    const stakeholderModal = useStakeholderModal();
    const riskModal = useRiskModal();

    const isTeamRoute = pathname?.startsWith(`/main/projects/${project.id}/teams`);
    const isAuditRoute = pathname?.startsWith(`/main/projects/${project.id}/audits`);
    const isResourceRoute = pathname?.startsWith(`/main/projects/${project.id}/resources`);
    const isFeedbackRoute = pathname?.startsWith(`/main/projects/${project.id}/feedbacks`);
    const isUpdateRoute = pathname?.startsWith(`/main/projects/${project.id}/updates`);
    const isMomRoute = pathname?.startsWith(`/main/projects/${project.id}/moms`);
    const isRiskRoute = pathname?.startsWith(`/main/projects/${project.id}/risks`);
    

    const onAddPhase = async (project: any) => {
        const data = { projectId: project.id };
        console.log(project.id);
        axios.post('/api/teams', data)
        .then((response) => {
            const phase = response.data;
            const phaseId = phase.id;
            toast.success('New team phase created');
            router.push(`/main/projects/${project.id}/teams/${phaseId}`);
        }).catch((error) => {
            toast.error(error.response.data);
        }).finally(() => {
            router.refresh();
        });
    };

    const routes = [
        '/teams',
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
        <div className="w-full h-[2rem] flex  items-center justify-between gap-5  mt-3 ">
            <div className="w-[80%] h-full  flex items-center justify-between">
                <div className={`w-[95%] h-full  flex items-center ${navbarPosition} transition  gap-5 overflow-hidden overflow-x-scroll scrollbar-hide`}>
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
                <div>
                    <ArrowRightIcon size={20} className="font-bold hover:cursor-pointer hover:opacity-75" onClick={toggleNavbar}/>
                </div>
            </div>
            {(user.role === "MANAGER" || user.role === "ADMIN") ? (
                <div>
                   
                    {isResourceRoute && (
                        <Button onClick={resourceModal.onOpen}>
                            <div className="flex items-center gap-2">
                                <Plus/>
                                <p>Add resource</p>
                            </div>
                        </Button>
                    )}
                    {isFeedbackRoute && (
                        <Button onClick={feedbackModal.onOpen}>
                            <div className="flex items-center gap-2">
                                <Plus/>
                                <p>Add feedback</p>
                            </div>
                        </Button>
                    )}
                    {isUpdateRoute && (
                        <Button onClick={updateModal.onOpen}>
                            <div className="flex items-center gap-2">
                                <Plus/>
                                <p>Add update</p>
                            </div>
                        </Button>
                    )}
                    {isMomRoute && (
                        <Button onClick={momModal.onOpen}>
                            <div className="flex items-center gap-2">
                                <Plus/>
                                <p>Add MoM</p>
                            </div>
                        </Button>
                    )}
                    
                    {pathname?.endsWith('/scope') && (
                        <Button onClick={resourceModal.onOpen}>
                            <div className="flex items-center gap-2">
                                <Plus/>
                                <p>Add scope</p>
                            </div>
                        </Button>
                    )}
                    {pathname?.endsWith('/stakeholders') && (
                        <Button onClick={stakeholderModal.onOpen}>
                            <div className="flex items-center">
                                <Plus/>
                                <p>Add stakeholder</p>
                            </div>
                        </Button>
                    )}
                   
                    {isRiskRoute && (
                        <Button onClick={riskModal.onOpen}>
                            <div className="flex items-center gap-2">
                                <Plus/>
                                <p>Add risk</p>
                            </div>
                        </Button>
                    )}
                    {pathname?.endsWith('/milestones') && (
                        <Button onClick={resourceModal.onOpen}>
                            <div className="flex items-center gap-2">
                                <Plus/>
                                <p>Add milestones</p>
                            </div>
                        </Button>
                    )}
                </div>
            ) : (
                <div>
                    {user.role === "AUDITOR" && isAuditRoute && (
                        <Button onClick={auditModal.onOpen}>
                            <div className="flex items-center gap-2">
                                <Plus/>
                                <p>Add audit</p>
                            </div>
                        </Button>
                    )}
                    {user.role === "CLIENT" && (
                        <ClientDownloadButton project={project} user={user}/>
                    )}
                </div>
            )}
        </div>
    )
}