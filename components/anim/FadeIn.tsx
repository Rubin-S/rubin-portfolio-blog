"use client";

import { motion, useInView, UseInViewOptions } from "framer-motion";
import { useRef } from "react";

interface FadeInProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
    fullWidth?: boolean;
    once?: boolean;
    amount?: UseInViewOptions["amount"];
}

export default function FadeIn({
    children,
    className = "",
    delay = 0,
    duration = 0.5,
    direction = "up",
    fullWidth = false,
    once = true,
    amount = 0.3,
}: FadeInProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, amount });

    const getVariants = () => {
        const distance = 20; // Subtle movement

        const variants = {
            hidden: {
                opacity: 0,
                y: direction === "up" ? distance : direction === "down" ? -distance : 0,
                x: direction === "left" ? distance : direction === "right" ? -distance : 0,
            },
            visible: {
                opacity: 1,
                y: 0,
                x: 0,
                transition: {
                    duration,
                    delay,
                    ease: [0.25, 0.25, 0.25, 0.75], // Smooth ease
                },
            },
        };

        return variants;
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={getVariants()}
            className={`${fullWidth ? "w-full" : ""} ${className}`}
        >
            {children}
        </motion.div>
    );
}
