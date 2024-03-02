"use client";
import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const ContainerScroll = ({
  titleComponent,
}: {
  titleComponent: string | React.ReactNode;
}) => {
  const containerRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
        setTimeout( () => {
            setIsLoading(true);
            console.log(isLoading);
          }, 850)
    }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="h-[60rem] md:h-[80rem] bg-black flex items-center justify-center relative p-2 md:p-20"
      ref={containerRef}
    >
      <div
        className="py-10 md:py-40 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <motion.div  
          style={{
            rotateX: rotate,
            scale,
          }}
          className={cn(
            "absolute top-[32%] left-0 w-[100%] h-[55%] bg-hero-glow blur-3xl -z-[99] opacity-0",
            isLoading && 'animate-image-glow'
        )} />
        <Card
          rotate={rotate}
          translate={translate}
          scale={scale}
        />
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  translate,
}: {
  rotate: any;
  scale: any;
  translate: any;
}) => {
  return (
      <motion.div
        style={{
          rotateX: rotate,
          scale,
          boxShadow:
            "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
        }}
        className="max-w-5xl -mt-16 mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-[#333333] p-6 bg-[#0f0f0f] rounded-[30px] shadow-2xl"
      >
        <div className="relative">
          
          <img
              src={'/screen.png'}
              alt="screen"
              className="object-cover h-full w-full rounded-2xl"
              
          />
        </div>
       
      </motion.div>
    
  );
};
