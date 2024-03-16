"use client"

import { Project } from "@prisma/client";
import EmptyState from "../../EmptyState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import useEditScopeModal from "@/hooks/editModalHooks/useEditScopeModal";
import EditScopeModal from "@/components/modals/editModals/EditScopeModal";

interface ScopeClientProps {
    project: Project;
}

export const ScopeClient = ({
    project,
}: ScopeClientProps) => {

    const editScopeModal =useEditScopeModal();
    return (
        <>
            <EditScopeModal project={project} />
            <Card className="w-full h-full dark:border-none dark:bg-neutral-900">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <CardTitle>Project scope</CardTitle>
                        <Pencil onClick={editScopeModal.onOpen} className="hover:cursor-pointer hover:opacity-75 transition"/>
                    </div>

                </CardHeader>
                <CardContent className="dark:text-neutral-300 leading-7">
                    {project.scope}
                </CardContent>
            </Card>
        </>
    )
}