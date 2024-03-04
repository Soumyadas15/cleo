"use client"

import Lottie from "lottie-react"
import animationData from '@/public/animations/phase.json'
import Heading from "@/components/reusable/Heading"

export const PhasesHome = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <Lottie animationData={animationData} className="w-48"/>
            <Heading
                title="Phase means progress"
            />
        </div>
    )
}