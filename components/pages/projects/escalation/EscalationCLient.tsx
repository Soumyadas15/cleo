"use client"

import { Button } from "@/components/reusable/Button";
import EmptyState from "../../EmptyState";
import { EscalationList } from "./EscalationList";
import { Plus } from "lucide-react";
import useEscalationMatrixModal from "@/hooks/createModalHooks/useEscalationMatrixModal";
import { usePathname } from "next/navigation";

interface EscalationClientProps {
    project: any;
}

export const EscalationClient = ({
    project,
}: EscalationClientProps) => {

    const pathname = usePathname();

    const escalationMatrixModal = useEscalationMatrixModal();
    const isValidPath = pathname?.endsWith('/financial') || pathname?.endsWith('/technical') || pathname?.endsWith('/operational')

    return (
        <div className="flex items-center gap-2">
            <EscalationList project={project}/>
            {isValidPath ? (
                    <Button 
                        label="Add content" 
                        icon={<Plus className="scale-[0.8]"/>}
                        className="flex bg-blue-500 items-center text-sm p-2 rounded-[5px] pr-3"
                        onClick={escalationMatrixModal.onOpen}
                    />
                ) : (
                    <div></div>
            )}
        </div>
    )
}