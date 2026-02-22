"use client";

import { motion, useInView, UseInViewOptions } from "framer-motion";
import { useRef } from "react";

interface StaggerContainerProps {
    children: React.ReactNode;
    className?: string;
    delayChildren?: number;
    staggerChildren?: number;
    once?: boolean;
    amount?: UseInViewOptions["amount"];
}

export default function StaggerContainer({
    children,
    className = "",
    delayChildren = 0,
    staggerChildren = 0.1,
    once = true,
    amount = 0.1,
}: StaggerContainerProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, amount });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren,
                staggerChildren,
            },
        },
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className={className}
        >
            {children}
        </motion.div>
    );
}
