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


function isValidUUID(uuid : string) {
    const uuidRegex = /^[a-f\d]{8}-([a-f\d]{4}-){3}[a-f\d]{12}$/i;
    return uuidRegex.test(uuid);
}

export const TeamsList = ({
    teams,
    project,
    user
}: TeamsListProps) => {

    const router = useRouter();
    //@ts-ignore
    const { teamId } = useParams();
    const pathname = usePathname();

    const [label, setLabel] = useState('No teams');
    const [clicked, setClicked] = useState(false);
    const [position, setPosition] = useState("bottom");
    const [phaseMap, setPhaseMap] = useState<{ [key: string]: string }>({});



    useEffect(() => {
        const phaseMapping: { [key: string]: string } = {};
        teams.forEach((team, index) => {
            phaseMapping[team.id] = `Phase ${teams.length - index}`;
        });
        setPhaseMap(phaseMapping);
    }, [teams]);



    useEffect(() => {
        //@ts-ignore
        if (pathname?.endsWith('/teams') && teams.length > 0){
            setLabel('Select phase')
        }
        else if (teams.length > 0 && teamId) {
            const currentPhaseIndex = teams.findIndex(phase => phase.id === teamId);
            if (currentPhaseIndex !== -1) {
                setLabel(`Phase ${teams.length - currentPhaseIndex}`);
            } else {
                setLabel(`Phase ${teams.length}`);
            }
        } else if (teams.length > 0) {
            setLabel(`Phase ${teams.length}`);
        }
    }, [teams, teamId]);

    useEffect(() => {
        if (!teamId){
            setLabel('Select Phase');
        }
        else setLabel(phaseMap[teamId])
    })



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
            toast.error(error.response.data);
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
                        {label}
                    </Button>
                
                
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-42 bg-white dark:bg-black dark:border-none rounded-[5px]">

                <DropdownMenuLabel>
                    Phases
                </DropdownMenuLabel>
                
                <DropdownMenuSeparator />

                <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                    <DropdownMenuItem
                        className="rounded-[5px] hover:cursor-pointer focus:bg-neutral-200 dark:focus:bg-neutral-800"
                        onClick={() => {
                            router.push(`/main/projects/${project.id}/teams`)
                        }}
                    >
                        Dashboard
                    </DropdownMenuItem>
                    
                    {teams.map((phase, index) => (
                        <DropdownMenuItem  
                            key={phase.id}
                            className="rounded-[5px] hover:cursor-pointer focus:bg-neutral-200 dark:focus:bg-neutral-800"
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
