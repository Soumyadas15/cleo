"use client"

import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import { ContainerScroll } from "@/components/ui/skew-scroll";
import { Button } from "@/components/ui/button";

export const Intro = () => {
    return (
        <div className="h-auto">
            <ContainerScroll
                
                titleComponent={
                <>
                <div className="absolute pointer-events-none inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
                    <h1 className="text-4xl font-semibold text-white dark:text-white">
                    Introducing <br />
                    <span className="text-4xl md:text-[10rem] bg-clip-text text-transparent bg-gradient-to-b from-cyan-300 to-cyan-600 font-bold mt-1 leading-none">
                        Cleo
                    </span>
                    </h1>
                </>
                }
            />
            <LampContainer className="h-[20rem] flex flex-col items-center justify-between">
                <motion.h1
                    initial={{ opacity: 0.5, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                    }}
                    className="flex items-center justify-center bg-gradient-to-b from-white to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
                >
                    Manage client projects <br /> the right way
                </motion.h1>
            </LampContainer>
            <div>
                
            </div>
        </div>
        
    )
}