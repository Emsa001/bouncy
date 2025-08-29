import { useEffect, useLocalStorage, useState } from "react";
import { allBall, IBall } from "./balls";

export function getRarityType(ball: IBall): "legendary" | "very-rare" | "rare" | null {
    if (ball.rarity <= 0.05) return "legendary";
    if (ball.rarity <= 0.5) return "very-rare";
    if (ball.rarity <= 3) return "rare";
    return null;
}

export const useBalls = (
    totalBalls: number = 50,
    bound: { current: HTMLDivElement | null },
    unlocked: boolean
) => {
    const [dropped, setDropped] = useLocalStorage<string[]>("dropped", []);
    const [balls, setBalls] = useState<IBall[]>([]);

    const [maxX, setMaxX] = useState(window.innerWidth);
    const [maxY, setMaxY] = useState(window.innerHeight);

    useEffect(() => {
        const resizeHandler = () => {
            if (!bound?.current) return;
            setMaxX(window.innerWidth);
            setMaxY(window.innerHeight);
        };

        window.addEventListener("resize", resizeHandler);
        return () => window.removeEventListener("resize", resizeHandler);
    }, []);

    function pickRandomBallWeighted() {
        const weights = allBall.map((ball) => ball.rarity);
        const totalWeight = weights.reduce((a, b) => a + b, 0);
        let r = Math.random() * totalWeight;
        for (let i = 0; i < allBall.length; i++) {
            r -= weights[i];
            if (r <= 0) return allBall[i];
        }
        return allBall[allBall.length - 1];
    }

    useEffect(() => {
        if (unlocked) {
            setBalls(dropped.map((name: string) => allBall.find((b) => b.name === name)).filter(Boolean) as IBall[]);
            return;
        }

        const interval = setInterval(() => {
            setBalls((prev) => {
                if (prev.length >= totalBalls) {
                    clearInterval(interval);
                    return prev;
                }

                const picked = pickRandomBallWeighted();
                const isNew = !dropped.some((b: string) => b === picked.name);
                const ballWithNew = isNew ? { ...picked, new: true } : picked;

                return [...prev, ballWithNew];
            });
        }, 10);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (unlocked) return;

        setDropped((oldDropped: string[]) => {
            const newDropped = [...oldDropped];
            for (const ball of balls) {
                if (!newDropped.some((b) => b === ball.name)) {
                    newDropped.push(ball.name);
                    const rarityType = getRarityType(ball);
                    if (rarityType) {
                        window.dispatchEvent(
                            new CustomEvent("special-drop", { detail: { ...ball, rarityType } })
                        );
                    }
                }
            }
            return newDropped;
        });
    }, [balls]);

    return {
        maxX,
        maxY,
        balls,
        dropped,
    };
};
