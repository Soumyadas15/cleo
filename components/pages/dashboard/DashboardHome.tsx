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
        <div className="h-full w-full  flex flex-col justify-between">
            <div className="h-[25%]  grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-2">
                <DashboardCard primaryLabel={projects.length} header='Total projects'/>
                <DashboardCard primaryLabel={auditors} header='No. of auditors'/>
                <DashboardCard primaryLabel={managers} header='No. of managers'/>
                <DashboardCard primaryLabel={clients} header='No. of clients'/>
            </div>
            <div className="h-[74%]  grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-2">
                <DashboardChart/>
                <DashboardProjects projects={projects}/>
            </div>
        </div>
    )
}