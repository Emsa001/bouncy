import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { getRarityType } from "../model/useBalls";
import confetti from "canvas-confetti";
import { IBall } from "../model/balls";

gsap.registerPlugin(Draggable, InertiaPlugin);

interface BallElementProps {
    ball: IBall;
    bound?: { current: HTMLDivElement | null };
    maxX?: number;
    maxY?: number;
}

const minOpacity = 0.3;
const maxOpacity = 0.9;

export const BallElement = ({
    ball,
    bound,
    maxX = window.innerWidth,
    maxY = window.innerHeight,
}: BallElementProps) => {
    const ballRef = useRef<HTMLDivElement | null>(null);
    const particleIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const createParticleTrail = () => {
        if (!ballRef.current || !ball.particles) return;

        const rect = ballRef.current.getBoundingClientRect();
        const centerX = (rect.left + rect.width / 2) / window.innerWidth;
        const centerY = (rect.top + rect.height / 2) / window.innerHeight;

        confetti({
            particleCount: 3,
            spread: 40,
            startVelocity: 10,
            gravity: 0.5,
            drift: Math.random() * 2 - 1,
            origin: {
                x: centerX,
                y: centerY,
            },
            colors: ['#c084fc', '#a855f7', '#9333ea', '#7c3aed', '#6366f1', '#3b82f6'],
            zIndex: 5,
            scalar: 0.5,
            shapes: ['circle'],
            ticks: 60,
        });
    };

    const startParticleTrail = () => {
        if (!ball.particles) return;
        
        particleIntervalRef.current = setInterval(createParticleTrail, 150);
    };

    const stopParticleTrail = () => {
        if (particleIntervalRef.current) {
            clearInterval(particleIntervalRef.current);
            particleIntervalRef.current = null;
        }
    };

    const throwBall = () => {
        if (!ballRef.current) return;

        const radius = ballRef.current.offsetWidth / 2;
        const x = Math.random() * (maxX - 2 * radius) + radius;
        const y = Math.random() * (maxY - 2 * radius) + radius;

        gsap.to(ballRef.current, {
            duration: 1,
            x: x,
            y: y,
            ease: "power2.out",
            onComplete: () => {
                gsap.to(ballRef.current, {
                    duration: 1,
                    opacity: minOpacity,
                    ease: "power2.out",
                });
            },
        });
    };

    useEffect(() => {
        const ballDiv = ballRef.current;
        if (!ballDiv) return;

        ballDiv.style.opacity = `${maxOpacity}`;

        gsap.defaults({
            overwrite: "auto",
        });

        gsap.set(ballDiv, {
            xPercent: -50,
            yPercent: -50,
            x: maxX / 2,
            y: maxY / 2,
        });

        throwBall();

        // Confetti effect for new balls
        if (ball.new) {
            // Timeout to ensure DOM is painted and positioned
            setTimeout(() => {
                const rect = ballDiv.getBoundingClientRect();
                confetti({
                    particleCount: 50,
                    spread: 60,
                    startVelocity: 30,
                    origin: {
                        x: (rect.left + rect.width / 2) / window.innerWidth,
                        y: (rect.top + rect.height / 2) / window.innerHeight,
                    },
                    zIndex: 9999,
                });
            }, 150);
        }
    }, []);

    useEffect(() => {
        const ballElement = ballRef.current;
        if (!ballElement) return;

        const friction = -0.5;
        const ballProps = gsap.getProperty(ballElement);
        const radius = ballElement.offsetWidth / 2;

        const draggable = new Draggable(ballElement, {
            bounds: bound ? bound.current : window,
            onPress() {
                gsap.killTweensOf(ballElement);
                this.update();
                gsap.to(ballElement, {
                    duration: 0.1,
                    opacity: maxOpacity,
                    ease: "power2.in",
                });
                startParticleTrail();
            },
            onDrag() {
                if (ball.particles) {
                    createParticleTrail();
                }
            },
            onDragEnd: animateBounce,
            onDragEndParams: [],
        });

        function animateBounce(
            x: number | string = "+=0",
            y: number | string = "+=0",
            vx: number | string = "auto",
            vy: number | string = "auto"
        ) {
            gsap.fromTo(
                ballElement,
                { x, y },
                {
                    inertia: {
                        x: vx,
                        y: vy,
                    },
                    onUpdate: () => {
                        checkBounds();
                        if (ball.particles) {
                            // Create particles during movement
                            if (Math.random() < 0.3) { // 30% chance per frame to reduce particle density
                                createParticleTrail();
                            }
                        }
                    },
                    onComplete: () => {
                        gsap.to(ballElement, {
                            duration: 0.5,
                            opacity: minOpacity,
                            ease: "power2.in",
                        });
                        stopParticleTrail();
                    },
                }
            );
        }

        function checkBounds() {
            let r = radius;
            let x = ballProps("x") as number;
            let y = ballProps("y") as number;
            let vx = InertiaPlugin.getVelocity(ballElement!, "x");
            let vy = InertiaPlugin.getVelocity(ballElement!, "y");

            let xPos = x;
            let yPos = y;

            let hitting = false;

            if (x + r > maxX) {
                xPos = maxX - r;
                vx *= friction;
                hitting = true;
            } else if (x - r < 0) {
                xPos = r;
                vx *= friction;
                hitting = true;
            }

            if (y + r > maxY) {
                yPos = maxY - r;
                vy *= friction;
                hitting = true;
            } else if (y - r < 0) {
                yPos = r;
                vy *= friction;
                hitting = true;
            }

            if (hitting) {
                if (ball.particles) {
                    createParticleTrail();
                }
                animateBounce(xPos, yPos, vx, vy);
            }
        }

        return () => {
            gsap.killTweensOf(ballElement);
            draggable.kill();
            stopParticleTrail();
        };
    }, [maxX, maxY, bound]);

    const showRarity = () => {
        if (!ballRef.current) return;
        ballRef.current.classList.remove("text-transparent");
        ballRef.current.classList.add("text-white");

        setTimeout(() => {
            if (!ballRef.current) return;
            ballRef.current.classList.remove("text-white");
            ballRef.current.classList.add("text-transparent");
        }, 1500);
    };

    useEffect(() => {
        showRarity();
    }, []);

    return (
        <div
            ref={ballRef}
            onContextMenu={showRarity}
            className={`z-10 opacity-0 w-24 h-24 rounded-full absolute will-change-transform touch-none ${ball.className} flex items-center justify-center text-transparent`}
        >
            {getRarityType(ball) || "common"}
        </div>
    );
};
