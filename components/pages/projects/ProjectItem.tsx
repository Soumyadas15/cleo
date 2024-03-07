"use client"


import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from 'date-fns';
import { Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProjectItemProps {
    project: any;
}

export const ProjectItem = ({
    project,
}: ProjectItemProps) => {

    const router = useRouter();
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(true);
        setTimeout(() => setClicked(false), 150);
        router.push(`/main/projects/${project.id}/phases`);
    };

    return (
        // <div 
        //     onClick={handleClick}
        //     className="bg-neutral-100 dark:bg-neutral-800 border-[1px] border-black border-opacity-5 p-2 rounded-[5px] hover:opacity-80 hover:cursor-pointer pl-4 pr-4 h-[10vw] transition"
        //     style={{ transform: clicked ? 'scale(0.95)' : 'scale(1)' }}
        // >
        //     <div className="text-lg font-bold text-neutral-700 dark:text-neutral-300">
        //         {project.name}
        //     </div>
        //     <div className="text-sm opacity-50">
        //         {project.name}
        //     </div>
        //     <div className="text-sm opacity-50">
        //         {project.name}
        //     </div>
        // </div
        <div 
            onClick={handleClick}
            className="transition"
            style={{ transform: clicked ? 'scale(0.95)' : 'scale(1)' }}
        >
            <Card className="w-full rounded-[5px] transition hover:cursor-pointer bg-neutral-100 dark:bg-neutral-800 dark:border-none">
                <CardHeader  className="justify-between">
                    <div className=" flex items-start justify-between">
                        <div className="flex flex-col">
                            <CardTitle className="text-lg font-semibold">
                                {project.name}
                            </CardTitle>
                            <CardDescription className=" text-neutral-400 w-[90%]">
                                This project is created by admin, using Cleo, a customer success platform.
                            </CardDescription>
                        </div>
                        <Badge className="bg-green-300 dark:bg-green-800 hover:cursor-pointer hover:bg-green-400 dark:hover:bg-green-700 p-1 pr-3 pl-3 rounded-[5px]">
                            Ongoing
                        </Badge>
                    </div>
                </CardHeader>

                <CardFooter>
                    <div className=" w-full flex justify-between">
                        <div className="font-semibold text-[12px] flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-neutral-700 dark:bg-neutral-100" ></div>
                            {project.managerName}
                        </div>
                        <div className="font-semibold text-[12px] flex items-center gap-1">
                            <Calendar size={12}/>
                            {format(new Date(project.createdAt), 'MMMM dd, yyyy')}
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}