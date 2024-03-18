"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer } from "recharts";

interface TotalPhasesProps {
    totalPhases: number;
    data: any;
    phasesCreatedThisWeek: number;
}

export const TotalPhases = ({
    totalPhases,
    data,
    phasesCreatedThisWeek
}: TotalPhasesProps) => {
    return (
        <Card className="h-full w-full rounded-[5px] dark:bg-white/5 dark:border-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-normal">Total number of phases</CardTitle>
            </CardHeader>
            <CardContent className="h-[80%] flex flex-col justify-between">
                <div className="">
                    <div className="text-2xl font-bold">{totalPhases}</div>
                    <p className="text-xs text-muted-foreground">
                        +{phasesCreatedThisWeek} created this week
                    </p>
                </div>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={data}
                            margin={{
                                top: 5,
                                right: 10,
                                left: 10,
                                bottom: 0,
                            }}
                        >
                            <Line
                                type="monotone"
                                strokeWidth={2}
                                dataKey="revenue"
                                activeDot={{
                                    r: 6,
                                    style: { fill: "#2563EB", opacity: 0.25 },
                                }}
                                style={{
                                    stroke: "#2563EB"
                                }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
