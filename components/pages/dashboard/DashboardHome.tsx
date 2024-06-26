"use client"

import { Project } from "@prisma/client";
import { DashboardCard } from "./DashboardCard"
import { DashboardChart } from "./DashboardChart"
import { DashboardProjects } from "./DashboardProjects"

interface DashboardHomeProps {
    projects: Project[];
    auditors: number;
    clients: number;
    managers: number;
}
export const DashboardHome = ({
    projects,
    clients,
    managers,
    auditors
}: DashboardHomeProps) => {
    return (
        <div className="h-full w-full flex  flex-col justify-between">
            <div className="h-[25%] w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-2">
                <DashboardCard primaryLabel={projects.length} header='Total projects'/>
                <DashboardCard primaryLabel={auditors} header='No. of auditors'/>
                <DashboardCard primaryLabel={managers} header='No. of managers'/>
                <DashboardCard primaryLabel={clients} header='No. of clients'/>
            </div>
            <div className="h-[74%] w-full flex items-center justify-between">
                <div className="h-full w-[49.6%]">
                    <DashboardChart/>
                </div>
                <div className="h-full w-[49.6%]">
                    <DashboardProjects projects={projects}/>
                </div>
            </div>
        </div>
    )
}