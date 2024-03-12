"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown"
import { Project } from "@prisma/client"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface EscalationListProps {
    project: Project
}

export const EscalationList = ({
    project,
}: EscalationListProps) => {

    const router = useRouter();
    const pathname = usePathname();
    const [matrixType, setMatrixType] = useState("Matrix type");
    const paths = pathname?.split('/').filter(Boolean);
    const route = paths?.pop();
    //@ts-ignore
    let capitalRoute = route.charAt(0).toUpperCase() + route.slice(1);

    const [label, setLabel] = useState(capitalRoute);

    useEffect(() => {
        if (capitalRoute === "Escalation"){
            setLabel('Select Matrix');
        }
        else setLabel(capitalRoute)
    })
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                        onClick={() => {}}
                        variant="outline" 
                        className={`w-[8rem] transition`}
                >
                        {label}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[8rem] bg-white rounded-[5px]">
                <DropdownMenuLabel>Types</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        className="rounded-[5px] hover:cursor-pointer focus:bg-neutral-200 dark:focus:bg-neutral-700"
                        onClick={() => {
                                    router.push(`/main/projects/${project.id}/escalation/financial`)
                                    setMatrixType("Financial")
                                }}
                    >
                        Financial
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="rounded-[5px] hover:cursor-pointer focus:bg-neutral-200 dark:focus:bg-neutral-700"
                        onClick={() => {
                                    router.push(`/main/projects/${project.id}/escalation/operational`)
                                    setMatrixType("Operational")
                                }}
                    >
                        Operational
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="rounded-[5px] hover:cursor-pointer focus:bg-neutral-200 dark:focus:bg-neutral-700"
                        onClick={() => {
                                    router.push(`/main/projects/${project.id}/escalation/technical`)
                                    setMatrixType("Technical")
                                }}
                    >
                        Technical
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}