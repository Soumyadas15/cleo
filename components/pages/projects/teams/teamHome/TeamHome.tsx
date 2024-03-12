"use client"

import { TotalPhases } from "./TotalPhases"
import { TotalResources } from "./TotalResources"

interface TeamHomeProps {
    totalPhases: number;
    totalResources: number;
    phasesCreatedThisWeek: number;
    resourcesCreatedThisWeek: number;
}

const data = [
    {
      revenue: 10400,
      subscription: 240,
    },
    {
      revenue: 14405,
      subscription: 300,
    },
    {
      revenue: 9400,
      subscription: 200,
    },
    {
      revenue: 8200,
      subscription: 278,
    },
    {
      revenue: 7000,
      subscription: 189,
    },
    {
      revenue: 9600,
      subscription: 239,
    },
    {
      revenue: 11244,
      subscription: 278,
    },
    {
      revenue: 26475,
      subscription: 189,
    },
  ]


export const TeamHome = ({
    totalPhases,
    totalResources,
    phasesCreatedThisWeek,
    resourcesCreatedThisWeek,
}: TeamHomeProps) => {
    return (
        <div className="w-full h-full">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2 h-full">
                <TotalPhases 
                    totalPhases={totalPhases} 
                    data={data} 
                    phasesCreatedThisWeek={phasesCreatedThisWeek}
                />
                <TotalResources 
                    totalResources={totalResources} 
                    data={data} 
                    resourcesCreatedThisWeek={resourcesCreatedThisWeek}
                />
            </div>
            
        </div>
        
    )
}