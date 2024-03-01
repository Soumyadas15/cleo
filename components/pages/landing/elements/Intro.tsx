"use client"

import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import { ContainerScroll } from "@/components/ui/skew-scroll";
import { Button } from "@/components/ui/button";

const translateStatic = {
    initial: {
        y: "110%",
        opacity: 0
    },
    enter:{
        y: 0,
        opacity: 1,
        transition: {duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.1}
    },
    exit:{
        y: "100%",
        opacity: 1,
        transition: {duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.2}
    }
}

export const Intro = () => {
    return (
        <div className="h-auto">
            <ContainerScroll
                titleComponent={
                <>
                <div className="absolute pointer-events-none inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
                    <h1 className="text-3xl font-light text-neutral-400">Introducing</h1>
                    <motion.div variants={translateStatic} initial='initial' animate='enter' exit='exit'>
                        <h1 className="text-4xl md:text-[10rem] bg-clip-text text-transparent bg-gradient-to-b from-cyan-300 to-cyan-900 font-bold mt-1 leading-none">Cleo</h1>
                    </motion.div>  
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