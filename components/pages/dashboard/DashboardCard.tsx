"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase } from "lucide-react";

interface DashboardCardsProps {
    header: string;
    primaryLabel: string | number;
    secondaryLabel?: string;
}
export const DashboardCard = ({
    header,
    primaryLabel,
    secondaryLabel,
}: DashboardCardsProps) => {
    return (
        <div>
            <Card className="w-full h-full rounded-[5px] dark:border-neutral-700 dark:bg-neutral-900 dark:border-none">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        {header}
                    </CardTitle>
                    <Briefcase size={20}/>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{primaryLabel}</div>
                    <p className="text-xs text-muted-foreground">
                        {secondaryLabel}
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}