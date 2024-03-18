"uswe client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer } from "recharts";

interface TotalResourcesProps {
    totalResources: number;
    data: any;
    resourcesCreatedThisWeek: number;
}

export const TotalResources = ({
    totalResources,
    data,
    resourcesCreatedThisWeek
}: TotalResourcesProps) => {
    return (
        <Card className="h-full w-full rounded-[5px] dark:bg-white/5 dark:border-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-normal">Total number of resources</CardTitle>
            </CardHeader>
            <CardContent className="h-[80%] flex flex-col justify-between">
                <div>
                    <div className="text-2xl font-bold">
                        {totalResources > 0 ? (
                            <div>{totalResources}</div>
                        ) : (
                            <div>0</div>
                        )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {resourcesCreatedThisWeek > 0 ? (
                            <div>+{resourcesCreatedThisWeek} resources added this week</div>
                        ) : (
                            <div>+0 resources added this week</div>
                        )}
                    </p>
                </div>
                <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <Bar
                                dataKey="subscription"
                                style={{
                                    fill: "#2563EB",
                                }}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
