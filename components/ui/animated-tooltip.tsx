"use client";

import Image from "next/image";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Member } from "@prisma/client";

interface AnimatedTooltipProps {
  items: Member[];
}

export const AnimatedTooltip = ({ items }: AnimatedTooltipProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<any>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);

  const rotate = useSpring(useMotionValue(0), springConfig);
  const translateX = useSpring(useMotionValue(0), springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const halfWidth = rect.width / 2;
    x.set(offsetX - halfWidth);
  };

  const resetTooltipPosition = () => {
    rotate.set(0);
    translateX.set(0);
  };

  return (
    <>
      {items.map((item, idx) => (
        <div
          className="-mr-4 relative group"
          key={item.name}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => {
            setHoveredIndex(null);
            resetTooltipPosition();
          }}
        >
          <AnimatePresence>
            {hoveredIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{
                  transform: `translateX(${translateX.get()}px) rotate(${rotate.get()}deg)`,
                  whiteSpace: "nowrap",
                }}
                className={`absolute -top-16 ${
                  idx === items.length - 1 ? "-left-20" : "-left-1/2"
                } translate-x-1/2 flex text-xs flex-col items-center justify-center rounded-md bg-black z-50 shadow-xl px-4 py-2`}
              >
                <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px " />
                <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px " />
                <div className="font-bold text-white relative z-30 text-base">
                  {item.name}
                </div>
                <div className="text-white text-xs">{item.role}</div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex items-center bg-white w-14 h-14 justify-center rounded-full group-hover:scale-105 group-hover:z-30">
            <Image
                onMouseMove={handleMouseMove}
                height={100}
                width={100}
                src={item.imageUrl!}
                alt={item.name!}
                className="object-cover !m-0 !p-0 object-top rounded-full h-14 w-14 group-hover:scale-105 group-hover:z-30 relative transition duration-500"
            />
          </div>
        </div>
      ))}
    </>
  );
};
