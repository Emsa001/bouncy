import React, { useRef, useEffect, useState, useLocalStorage } from "react";

import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import { ShinyText } from "./Shiny";
import BallField from "./BallField";
import { allBall } from "../model/useBalls";

gsap.registerPlugin(MotionPathPlugin);
export default function LandingSection() {
    const [dropped] = useLocalStorage("dropped", []);
    const [roll, setRoll] = useState(false);
    const [specialDrop, setSpecialDrop] = useState<null | { name: string; rarityType: string }>(null);

    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const unlockedRef = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
        if (titleRef.current && buttonRef.current && unlockedRef.current) {
            gsap.fromTo(
                titleRef.current,
                { y: 80, opacity: 0, scale: 0.9 },
                { y: 0, opacity: 1, scale: 1, ease: "power4.out", duration: 1.2, delay: 0.1 }
            );

            gsap.fromTo(
                buttonRef.current,
                { y: 20, opacity: 0, scale: 0.8 },
                { y: 0, opacity: 1, scale: 1, ease: "elastic.out(1, 0.6)", duration: 1, delay: 0.8 }
            );

            gsap.fromTo(
                unlockedRef.current,
                { opacity: 0, scale: 0.8, y: 20 },
                {
                    opacity: 1,
                    scale: 1.1,
                    y: 0,
                    duration: 1,
                    delay: 1.5,
                    ease: "elastic.out(1, 0.5)",
                }
            );
            gsap.to(unlockedRef.current, {
                scale: 1,
                duration: 0.5,
                delay: 2.5,
                ease: "power2.out",
            });
        }

        // Special drop event listener
        function onSpecialDrop(e: any) {
            const { name, rarityType } = e.detail || {};
            setSpecialDrop({ name, rarityType });
            // Shake effect for all
            gsap.fromTo(
                "body",
                { x: 0 },
                {
                    x: () => (Math.random() - 0.5) * 32,
                    repeat: 15,
                    yoyo: true,
                    duration: 0.04,
                    ease: "power1.inOut",
                    onComplete: () => { gsap.set("body", { x: 0 }); },
                }
            );
            setTimeout(() => setSpecialDrop(null), 2200);
        }
        window.addEventListener("special-drop", onSpecialDrop);
        return () => window.removeEventListener("special-drop", onSpecialDrop);
    }, []);

    return (
        <section className="relative w-full h-full">
            <div className="absolute top-[75%] left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-indigo-500/20 rounded-full blur-[80px]" />

            {roll && <BallField />}

            {/* Special Drop Overlay */}
            {specialDrop && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
                    <span
                        className={
                            "text-[clamp(2.5rem,7vw,7rem)] font-extrabold animate-pulse " +
                            (specialDrop.rarityType === "legendary"
                                ? "text-yellow-300 drop-shadow-[0_4px_32px_rgba(255,255,0,0.7)]"
                                : specialDrop.rarityType === "very-rare"
                                ? "text-fuchsia-300 drop-shadow-[0_4px_32px_rgba(168,85,247,0.7)]"
                                : "text-sky-300 drop-shadow-[0_4px_32px_rgba(56,189,248,0.7)]")
                        }
                        style={
                            specialDrop.rarityType === "legendary"
                                ? { textShadow: "0 0 40px #facc15, 0 0 80px #fde047, 0 0 120px #fef08a", letterSpacing: "0.1em" }
                                : specialDrop.rarityType === "very-rare"
                                ? { textShadow: "0 0 40px #a855f7, 0 0 80px #c084fc, 0 0 120px #f0abfc", letterSpacing: "0.1em" }
                                : { textShadow: "0 0 40px #38bdf8, 0 0 80px #0ea5e9, 0 0 120px #7dd3fc", letterSpacing: "0.1em" }
                        }
                    >
                        {specialDrop.rarityType === "legendary"
                            ? "LEGENDARY!"
                            : specialDrop.rarityType === "very-rare"
                            ? "VERY RARE!"
                            : "RARE!"}
                    </span>
                </div>
            )}

            {/* Content */}
            <div className="relative flex flex-col items-center justify-center h-full px-4 text-center">
                <h1
                    ref={titleRef}
                    className="opacity-0 text-[clamp(3rem,6vw,10rem)] font-extrabold select-none text-white drop-shadow-xl"
                >
                    <ShinyText
                        text="I am Bouncy"
                        gradient="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"
                    />
                </h1>

                <button
                    ref={buttonRef}
                    onClick={() => setRoll(!roll)}
                    className="opacity-0 relative z-50 mt-10 py-4 px-10 text-lg font-semibold rounded-xl shadow-xl transition-all duration-300
                        bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500
                        bg-[length:200%_200%] hover:bg-[position:100%_0%]
                        hover:scale-105 active:scale-95 text-white"
                >
                    Roll
                </button>
                <span
                    ref={unlockedRef}
                    className="mt-4 block text-sm font-medium tracking-tight text-indigo-200/80 drop-shadow-sm"
                >
                    Unlocked <span className="text-indigo-100/90">{dropped.length}</span>
                    <span className="mx-0.5 text-indigo-100/40">/</span>
                    <span className="text-indigo-100/90">{allBall.length}</span> balls
                </span>
            </div>
        </section>
    );
}
