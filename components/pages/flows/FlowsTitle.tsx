"use client"

import { Project } from "@prisma/client"
import { SlashIcon } from "@radix-ui/react-icons"
 
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useRouter } from "next/navigation";
interface FlowsTitleProps {
    project: Project;
}

export const FlowsTitle = ({
    project,
}: FlowsTitleProps) => {

    const router = useRouter();
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink 
                        className="cursor-pointer"
                        onClick={() => {router.push('/main/flows')}}
                    >
                        Workflows
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                    <SlashIcon />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                    <BreadcrumbLink className="cursor-pointer">{project.name}</BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}