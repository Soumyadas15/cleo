"use client"

import { Button } from "@/components/ui/button";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuRadioGroup, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger } from "@/components/ui/dropdown";
import axios from "axios";
import { Plus } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface TeamsListProps {
    teams: any[];
    project: any;
    user:any;
}

export const TeamsList = ({
    teams,
    project,
    user
}: TeamsListProps) => {

    const router = useRouter();
    //@ts-ignore
    const { phaseId } = useParams();
    const pathname = usePathname();

    const [currentPhaseText, setCurrentPhaseText] = useState('No teams');
    const [clicked, setClicked] = useState(false);
    const [position, setPosition] = useState("bottom")



    useEffect(() => {
        //@ts-ignore
        if (pathname?.endsWith('/teams') && teams.length > 0){
            setCurrentPhaseText('Select phase')
        }
        else if (teams.length > 0 && phaseId) {
            const currentPhaseIndex = teams.findIndex(phase => phase.id === phaseId);
            if (currentPhaseIndex !== -1) {
                setCurrentPhaseText(`Phase ${teams.length - currentPhaseIndex}`);
            } else {
                setCurrentPhaseText(`Phase ${teams.length}`);
            }
        } else if (teams.length > 0) {
            setCurrentPhaseText(`Phase ${teams.length}`);
        }
    }, [teams, phaseId]);

    const onAdd = async (project: any) => {
        const data = { projectId: project.id };
        console.log(project.id);
        axios.post('/api/teams', data)
        .then((response) => {
            const phase = response.data;
            const phaseId = phase.id;
            toast.success('team phase created');
            router.push(`/main/projects/${project.id}/teams/${phaseId}`);
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
            <DropdownMenuContent className="w-42 bg-white dark:bg-neutral-800 dark:border-none rounded-[5px]">

                <DropdownMenuLabel>
                    teams
                </DropdownMenuLabel>
                
                <DropdownMenuSeparator />

                <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                    {teams.map((phase, index) => (
                        <DropdownMenuItem  
                            key={phase.id}
                            className="rounded-[5px] hover:cursor-pointer focus:bg-neutral-200 dark:focus:bg-neutral-700"
                            onClick={() => {
                                router.push(`/main/projects/${project.id}/teams/${phase.id}`)
                            }}
                        >
                            <span>{`Phase ${teams.length - index}`}</span>
                        </DropdownMenuItem>
                    ))}
                    {(user.role === "ADMIN" || user.role === "MANAGER") ? (
                        <DropdownMenuItem 
                        className="rounded-[5px] hover:cursor-pointer focus:bg-neutral-200"
                        onClick={() => onAdd(project)}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            <span>Add phase</span>
                        </DropdownMenuItem>
                    ) : (
                        <></>
                    )}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
