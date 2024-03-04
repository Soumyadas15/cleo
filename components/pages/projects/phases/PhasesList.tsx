"use client"

import { Button } from "@/components/ui/button";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuGroup, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuRadioGroup, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger } from "@/components/ui/dropdown";
import usePhaseContentModal from "@/hooks/createModalHooks/usePhaseContentModal";
import axios from "axios";
import { Plus } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface PhasesListProps {
    phases: any[];
    project: any;
}

export const PhasesList = ({
    phases,
    project
}: PhasesListProps) => {

    const router = useRouter();
    const { phaseId } = useParams();
    const pathname = usePathname();

    const [currentPhaseText, setCurrentPhaseText] = useState('No Phases');
    const [clicked, setClicked] = useState(false);
    const [position, setPosition] = useState("bottom")



    useEffect(() => {
        if (pathname.endsWith('/phases') && phases.length > 0){
            setCurrentPhaseText('Select phase')
        }
        else if (phases.length > 0 && phaseId) {
            const currentPhaseIndex = phases.findIndex(phase => phase.id === phaseId);
            if (currentPhaseIndex !== -1) {
                setCurrentPhaseText(`Phase ${phases.length - currentPhaseIndex}`);
            } else {
                setCurrentPhaseText(`Phase ${phases.length}`);
            }
        } else if (phases.length > 0) {
            setCurrentPhaseText(`Phase ${phases.length}`);
        }
    }, [phases, phaseId]);

    const onAdd = async (project: any) => {
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


    const handleClick = () => {
        setClicked(true);
        setTimeout(() => setClicked(false), 150);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                
                    <Button 
                        onClick={handleClick}
                        variant="outline" 
                        className={`w-[8rem] transition`}
                    >
                        {currentPhaseText}
                    </Button>
                
                
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-42 bg-white rounded-[5px]">

                <DropdownMenuLabel>
                    Phases
                </DropdownMenuLabel>
                
                <DropdownMenuSeparator />

                <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                    {phases.map((phase, index) => (
                        <DropdownMenuItem  
                            key={phase.id}
                            className="rounded-[5px] hover:cursor-pointer focus:bg-neutral-200"
                            onClick={() => {
                                router.push(`/main/projects/${project.id}/phases/${phase.id}`)
                            }}
                        >
                            <span>{`Phase ${phases.length - index}`}</span>
                        </DropdownMenuItem>
                    ))}
                    <DropdownMenuItem 
                        className="rounded-[5px] hover:cursor-pointer focus:bg-neutral-200"
                        onClick={() => onAdd(project)}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        <span>Add phase</span>
                    </DropdownMenuItem>
                </DropdownMenuRadioGroup>

            </DropdownMenuContent>
        </DropdownMenu>
    );
};
