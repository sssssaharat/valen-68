"use client";
import React, { useEffect } from "react";
import "./Fireworks.css";

export default function Fireworks() {
    useEffect(() => {
        const createEmoji = () => {
            const emojiContainer = document.createElement("div");
            emojiContainer.className = "emoji-container";

            // สุ่มตำแหน่งเริ่มต้น
            emojiContainer.style.left = `${Math.random() * 100}vw`;
            emojiContainer.style.top = `${Math.random() * 100}vh`;

            // รายการอิโมจิที่ใช้
            const emojis = ["😘", "🥰", "💖", "💕", "💞", "❤️", "💘", "💝", "🎉", "🌹", "💐", "🎀", "✨", "🎊", "💎"];
            emojiContainer.innerText = emojis[Math.floor(Math.random() * emojis.length)];

            document.body.appendChild(emojiContainer);

            // ทำให้อิโมจิขยับแบบสุ่ม (เคลื่อนที่ไปรอบๆ)
            const moveX = (Math.random() - 0.5) * 200; // สุ่มทิศทาง
            const moveY = (Math.random() - 0.5) * 200;
            emojiContainer.style.setProperty("--moveX", `${moveX}px`);
            emojiContainer.style.setProperty("--moveY", `${moveY}px`);

            // ลบอิโมจิหลังจาก 5 วินาที (ทำให้มีการเปลี่ยนแปลงตลอด)
            setTimeout(() => {
                emojiContainer.remove();
            }, 5000);
        };

        // สร้างอิโมจิทุก 0.2 วินาที
        const interval = setInterval(createEmoji, 200);

        return () => clearInterval(interval);
    }, []);

    return null;
}