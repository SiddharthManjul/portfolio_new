"use client";

import { cn } from "@/utils/cn";
import React, { useEffect, useState } from "react";
import { GlareCard } from "./glare-card";
import TailwindCard from "./TailwindCard";

export const InfiniteMovingCards = ({
  items = [],
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items?: {
    id: number;
    quote: string;
    img: string;
    title: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (items.length > 0) {
      addAnimation();
    }
    return () => {
      // Cleanup duplicates when component unmounts
      if (scrollerRef.current) {
        const duplicates = scrollerRef.current.querySelectorAll('[data-duplicate="true"]');
        duplicates.forEach(dup => dup.remove());
      }
    };
  }, [items]);

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

  if (items.length === 0) {
    return null; // or return a loading state/message if preferred
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-12 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item) => (
          <li key={item.id} className="flex-shrink-0 w-[350px]">
            <GlareCard>
              <TailwindCard 
                img={item.img}  
                title={item.title} 
                quote={item.quote}
              />
            </GlareCard>
          </li>
        ))}
      </ul>
    </div>
  );
};