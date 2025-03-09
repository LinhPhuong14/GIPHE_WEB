"use client";
import React, { useEffect, useState, useRef, forwardRef, ReactNode } from "react";
import { motion, useScroll, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

type Direction = "top" | "middle" | "bottom";

type NavbarDockProps = {
  className?: string;
  children: ReactNode;
  iconSize?: number;
  iconMagnification?: number;
  iconDistance?: number;
  direction?: Direction;
};

type DockIconProps = {
  size?: number;
  magnification?: number;
  distance?: number;
  mouseX?: ReturnType<typeof useMotionValue>;
  className?: string;
  children: ReactNode;
};

const DEFAULT_SIZE = 30;
const DEFAULT_MAGNIFICATION = 65;
const DEFAULT_DISTANCE = 140;

const dockVariants = cva(
  "flex h-[50px] justify-center pr-8 gap-2 rounded-2xl p-2 supports-backdrop-blur:bg-white/30 supports-backdrop-blur:dark:bg-black/10 fixed left-1/2 transform -translate-x-1/2 w-max items-center justify-center border backdrop-blur-md transition-all"
);

const NavbarDock = forwardRef<HTMLDivElement, NavbarDockProps>(
  (
    {
      className,
      children,
      iconSize = DEFAULT_SIZE,
      iconMagnification = DEFAULT_MAGNIFICATION,
      iconDistance = DEFAULT_DISTANCE,
      direction = "middle",
      ...props
    },
    ref
  ) => {
    
    const mouseX = useMotionValue(Infinity);

   

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        {...props}
        className={cn(dockVariants({ className }), {
          "items-start": direction === "top",
          "items-center": direction === "middle",
          "items-end": direction === "bottom",
        })}
       
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === DockIcon) {
            return React.cloneElement(child, {
              ...child.props,
              mouseX,
              size: iconSize,
              magnification: iconMagnification,
              distance: iconDistance,
            });
          }
          return child;
        })}
      </motion.div>
    );
  }
);
NavbarDock.displayName = "NavbarDock";

const DockIcon: React.FC<DockIconProps> = ({
  size = DEFAULT_SIZE,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mouseX,
  className,
  children,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const defaultMouseX = useMotionValue(Infinity);

  const distanceCalc = useTransform(mouseX ?? defaultMouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distanceCalc, [-distance, 0, distance], [size * 2, magnification * 2, size * 2]);
  const heightTransform = useTransform(distanceCalc, [-distance, 0, distance], [size, magnification * 0.8, size]);

  const scaleWidth = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const scaleHeight = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{
        width: scaleWidth,
        height: scaleHeight,
        fontFamily: "Inkut Antiqua",
        fontWeight: "600",
        fontSize: "16px",
        whiteSpace: "nowrap",
        borderRadius: scaleHeight,
      }}
      className={cn("flex cursor-pointer items-center justify-center mx-4 hover:bg-black/5", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

DockIcon.displayName = "DockIcon";

export { NavbarDock, DockIcon, dockVariants };
