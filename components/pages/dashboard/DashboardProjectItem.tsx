import { Briefcase } from "lucide-react";
import { format } from 'date-fns';

interface DashboardProjectItemProps {
    title: string;
    date: Date;
}

export const DashboardProjectItem = ({
    title,
    date
}: DashboardProjectItemProps) => {
    return (
        <div className="flex items-center gap-2">
            <div className="bg-blue-500/20 p-3 text-blue-500 rounded-full">
                <Briefcase/>
            </div>
            <div className="flex flex-col items-start">
                <p className="font-semibold ">{title}</p>
                <p className="text-neutral-400">{format(new Date(date), "MMM do")}</p>
            </div>
            
        </div>
    )
}