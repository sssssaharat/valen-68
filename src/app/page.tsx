"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "../components/Card";
export default function Home() {
    const [step, setStep] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [index, setIndex] = useState(0);

    // รูปภาพที่ใช้ในแต่ละ Card
    const images = [
        "/images/image1.jpg",
        "/images/image2.jpg",
        "/images/image3.jpg",
        "/images/image4.jpg",
    ];

    function handleNext() {
        setStep((prev) => prev + 1); // ไปหน้าถัดไป
    }

    // function handleBack() {
    //     setStep((prev) => prev - 1); // ย้อนกลับ
    //     if (step === 2) setIndex(0); // รีเซ็ต index ถ้าย้อนกลับจากหน้า Card
    // }

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#CC001E]">
            <AnimatePresence mode="wait">
                {step === 0 && (
                    <motion.div
                        key="welcome"
                        className="flex flex-col items-center justify-center text-center w-full h-screen bg-[#8B0000] p-10"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                    >
                        <h1 className="text-7xl font-bold text-white handwriting">
                            I dare you to invest in yourself.
                        </h1>

                        <p className="text-6xl text-white romantic">
                            Because you&apos;re <span className="font-bold">worth</span> the investment.
                        </p>

                        <button
                            className="heart-button"
                            onClick={handleNext}
                        >

                        </button>

                    </motion.div>

                )}

                {step === 1 && (
                  
                    <motion.div
                        key="envelope"
                        className="flex flex-col items-center justify-center text-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                    >
                        {/* 📬 ซองจดหมายใหญ่ขึ้น */}
                        <div className="relative w-96 h-72 flex justify-center">
                            {/* 🔼 ฝาปิดซองใหญ่ขึ้น */}
                            <motion.div
                                className="absolute top-0 w-full h-36 bg-red-600 rounded-t-lg shadow-lg"
                                initial={{ rotateX: 0 }}
                                animate={isOpen ? { rotateX: -180, y: -10 } : {}}
                                transition={{ duration: 0.8 }}
                            />

                            {/* 📩 จดหมายใหญ่ขึ้น */}
                            <motion.div
                                className="absolute w-80 h-56 bg-white rounded-md shadow-md p-8 z-10"
                                initial={{ y: 20, opacity: 0 }}
                                animate={isOpen ? { y: -60, opacity: 1 } : {}}
                                transition={{ delay: 0.6, duration: 0.5 }}
                            >
                                <p className="text-gray-700 font-bold text-2xl">💌 ถึง p&apos;ying,</p>
                                <p className="text-gray-600 mt-3 text-xl">&quot;ไม่ต้องแบกทุกอย่างไว้คนเดียวหรอกนะ ผมอาจจะช่วยอะไรไม่ได้มาก แต่พร้อมฟังเสมอ🥹&quot;</p>
                            </motion.div>

                            {/* 🏦 ตัวซองใหญ่ขึ้น */}
                            <div className="absolute bottom-0 w-full h-48 bg-red-500 rounded-b-lg shadow-lg" />
                        </div>

                        {/* ❤️ ปุ่มเปิดซองหัวใจใหญ่ขึ้น */}
                        {!isOpen ? (
                            <button
                                className="heart-button mt-8 w-32 h-32 text-2xl"
                                onClick={() => setIsOpen(true)}
                            >
                                เปิด 💌
                            </button>
                        ) : (
                            <button
                                className="heart-button mt-8 w-32 h-32 text-2xl"
                                onClick={handleNext} 
                            >
                                
                            </button>
                        )}
                    </motion.div>

                )}

                {step === 2 && (
                    // ✅ หน้าแสดง Card
                    <motion.div
                        key={`cards-${index}`}
                        className="flex flex-col items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div key={`card-container-${index}`} style={{ width: 300, height: 400, position: "relative" }}>
                            <Card key={`back-${index}`}index={index}
                                setIndex={setIndex}
                                drag="x" frontCard={false} imageSrc={images[(index + 1) % images.length]} />
                            <Card
                                key={`front-${index}`}
                                frontCard={true}
                                index={index}
                                setIndex={setIndex}
                                drag="x"
                                imageSrc={images[index % images.length]}
                            />
                        </motion.div>
                        {/* ปุ่มย้อนกลับ */}
                        {/* <button
                            className="mt-12 px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
                            onClick={handleBack}
                        >
                            
                        </button> */}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}