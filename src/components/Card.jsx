"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function Card({ index, setIndex, frontCard, drag, imageSrc }) {
    const [exitX, setExitX] = useState(0);

    const x = useMotionValue(0);
    const scale = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);
    const rotate = useTransform(x, [-200, 0, 200], [-30, 0, 30], {
        clamp: false
    });

    const variantsFrontCard = {
        animate: { scale: 1, y: 0, opacity: 1 },
        exit: (custom) => ({
            x: custom,
            opacity: 0,
            scale: 0.5,
            transition: { duration: 0.2 }
        })
    };
    const variantsBackCard = {
        initial: { scale: 0, y: 120, opacity: 0 },
        animate: { scale: 0.85, y: 50, opacity: 0.5 }
    };

    function handleDragEnd(_, info) {
        if (info.offset.x < -150) {
            setExitX(-300);
            setIndex((prev) => prev + 1);
        }
        if (info.offset.x > 150) {
            setExitX(300);
            setIndex((prev) => prev + 1);
        }
    }

    return (
        <motion.div
            style={{
                width: 300,
                height: 400,
                position: "absolute",
                top: 0,
                x,
                rotate,
                cursor: "grab",
                borderRadius: 20,
                overflow: "hidden",
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
            }}
            whileTap={{ cursor: "grabbing" }}
            drag={drag}
            dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
            onDragEnd={handleDragEnd}
            variants={frontCard ? variantsFrontCard : variantsBackCard}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={exitX}
            transition={
                frontCard
                    ? { type: "spring", stiffness: 300, damping: 20 }
                    : { scale: { duration: 0.2 }, opacity: { duration: 0.4 } }
            }
        >
            {/* ✅ ปิดการลากรูปภาพ ด้วย pointerEvents: "none" */}
            <Image
                src={imageSrc}
                alt="Card Image"
                layout="fill"
                objectFit="cover"
                style={{ pointerEvents: "none" }} // 🔥 ป้องกันการลากรูป
            />
        </motion.div>
    );
}
