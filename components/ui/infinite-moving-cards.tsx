"use client";

import { cn } from "@/utils/cn";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  skills = [],
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  skills?: string[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (skills.length > 0) {
      addAnimation();
    }
    return () => {
      // Cleanup duplicates when component unmounts
      if (scrollerRef.current) {
        const duplicates = scrollerRef.current.querySelectorAll('[data-duplicate="true"]');
        duplicates.forEach(dup => dup.remove());
      }
    };
  }, [skills]);

  function addAnimation() {
    if (!containerRef.current || !scrollerRef.current) return;
    
    const scrollerContent = Array.from(scrollerRef.current.children);
    if (scrollerContent.length === 0) return;
    
    // Remove any existing duplicates first
    const existingDuplicates = scrollerRef.current.querySelectorAll('[data-duplicate="true"]');
    existingDuplicates.forEach(dup => dup.remove());
    
    // Create new duplicates
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true) as HTMLElement;
      duplicatedItem.setAttribute('data-duplicate', 'true');
      scrollerRef.current?.appendChild(duplicatedItem);
    });

    getDirection();
    getSpeed();
    setStart(true);
  }

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
    }
  };

  const getSpeed = () => {
    if (!containerRef.current) return;
    
    const durationMap = {
      fast: "20s",
      normal: "40s",
      slow: "80s"
    };
    containerRef.current.style.setProperty("--animation-duration", durationMap[speed]);
  };

  if (skills.length === 0) {
    return null; // or return a loading state/message if preferred
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-3xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-8 shrink-0 gap-4 py-4 max-w-fit flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {skills.map((skill, idx) => (
          <li 
            key={idx} 
            className="z-20 flex flex-row items-center justify-center"
          >
            <span className="text-sm leading-[1.6] text-gray-400 font-medium border border-gray-300 bg-slate-800 rounded-lg py-2 px-4">
              {skill}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};