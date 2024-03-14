"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, ResponsiveContainer, XAxis } from "recharts";
import { DashboardProjectItem } from "./DashboardProjectItem";
import { Project } from "@prisma/client";

interface DashboardProjectsProps {
    projects: Project[];
}

export const DashboardProjects = ({
    projects,
}: DashboardProjectsProps) => {
    return (
        <Card className="w-full h-full rounded-[5px] dark:bg-neutral-900 dark:border-none">
            <CardHeader>
                <CardTitle>Recently Added</CardTitle>
                <CardDescription>Last 5 projects</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                {projects.slice(0, 5).map(project => (
                    <DashboardProjectItem key={project.id} title={project.name} date={project.createdAt} />
                ))}
            </CardContent>
        </Card>
    )
}