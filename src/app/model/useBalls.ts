import { useEffect, useLocalStorage, useState } from "react";

export interface IBall {
    name: string;
    className: string;
    rarity: number;
    new?: boolean;
}

export const allBall: IBall[] = [
    // Original ones
    {
        name: "royal-twilight",
        className: "bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900",
        rarity: 20,
    },
    {
        name: "indigo-pulse",
        className: "bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900",
        rarity: 15,
    },
    {
        name: "pink-eclipse",
        className: "bg-gradient-to-tl from-pink-900 via-purple-900 to-indigo-900",
        rarity: 10,
    },
    {
        name: "midnight-bloom",
        className: "bg-gradient-to-b from-purple-900 via-indigo-900 to-blue-900",
        rarity: 20,
    },
    {
        name: "aurora-amethyst",
        className: "bg-gradient-to-tr from-indigo-900 via-pink-900 to-purple-900",
        rarity: 10,
    },
    {
        name: "deep-sapphire",
        className: "bg-gradient-to-l from-blue-900 via-indigo-900 to-purple-900",
        rarity: 10,
    },
    {
        name: "royal-dawn",
        className: "bg-gradient-to-t from-purple-900 via-indigo-900 to-pink-900",
        rarity: 5,
    },
    {
        name: "velvet-lagoon",
        className: "bg-gradient-to-bl from-pink-900 via-purple-900 to-blue-900",
        rarity: 5,
    },
    {
        name: "indigo-abyss",
        className: "bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900",
        rarity: 5,
    },
    {
        name: "rose-prism",
        className: "bg-gradient-to-r from-pink-900 via-indigo-900 to-purple-900",
        rarity: 5,
    },
    {
        name: "emerald-night",
        className: "bg-gradient-to-br from-emerald-600 via-indigo-900 to-purple-800",
        rarity: 1,
    },
    {
        name: "crimson-rose",
        className: "bg-gradient-to-tl from-pink-600 via-rose-900 to-indigo-900",
        rarity: 1,
    },

    // New ones — uncommon
    {
        name: "teal-storm",
        className: "bg-gradient-to-br from-teal-700 via-cyan-900 to-indigo-900",
        rarity: 8,
    },
    {
        name: "amber-blaze",
        className: "bg-gradient-to-tr from-amber-700 via-orange-900 to-red-900",
        rarity: 7,
    },
    {
        name: "verdant-depths",
        className: "bg-gradient-to-bl from-lime-700 via-green-900 to-emerald-900",
        rarity: 6,
    },
    {
        name: "skyfall",
        className: "bg-gradient-to-b from-sky-800 via-blue-900 to-indigo-950",
        rarity: 6,
    },

    // Rare
    {
        name: "rose-nebula",
        className: "bg-gradient-to-br from-rose-700 via-fuchsia-900 to-cyan-900",
        rarity: 3,
    },
    {
        name: "twilight-grove",
        className: "bg-gradient-to-l from-indigo-800 via-emerald-800 to-amber-900",
        rarity: 2,
    },
    {
        name: "ocean-ember",
        className: "bg-gradient-to-t from-sky-900 via-teal-900 to-rose-900",
        rarity: 1.5,
    },
    {
        name: "crimson-dusk",
        className: "bg-gradient-to-tr from-amber-600 via-rose-800 to-indigo-900",
        rarity: 1.2,
    },

    // Very rare
    {
        name: "emerald-mirage",
        className: "bg-gradient-to-br from-emerald-500 via-sky-800 to-fuchsia-900",
        rarity: 0.8,
    },
    {
        name: "cyan-orchid",
        className: "bg-gradient-to-l from-cyan-500 via-violet-900 to-rose-800",
        rarity: 0.5,
    },
    {
        name: "lime-eclipse",
        className: "bg-gradient-to-bl from-indigo-400 via-pink-900 to-lime-700",
        rarity: 0.3,
    },
    {
        name: "amber-tide",
        className: "bg-gradient-to-r from-amber-500 via-emerald-800 to-sky-900",
        rarity: 0.2,
    },
    {
        name: "lime-flame",
        className: "bg-gradient-to-tr from-lime-500 via-cyan-900 to-fuchsia-800",
        rarity: 0.1,
    },

    // Legendary ultra-rare
    {
        name: "emerald-rose",
        className: "bg-gradient-to-br from-pink-400 via-emerald-500 to-indigo-800",
        rarity: 0.05,
    },
    {
        name: "sunset-lagoon",
        className: "bg-gradient-to-t from-cyan-400 via-rose-500 to-amber-700",
        rarity: 0.02,
    },
    {
        name: "mystic-bloom",
        className: "bg-gradient-to-bl from-violet-300 via-emerald-400 to-pink-500",
        rarity: 0.01,
    },
];

export function getRarityType(ball: IBall): "legendary" | "very-rare" | "rare" | null {
    if (ball.rarity <= 0.05) return "legendary";
    if (ball.rarity <= 0.5) return "very-rare";
    if (ball.rarity <= 3) return "rare";
    return null;
}

export const useBalls = (totalBalls: number = 50, bound: { current: HTMLDivElement | null }) => {
    const [dropped, setDropped] = useLocalStorage<IBall[]>("dropped", []);
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
        // Lower rarity = more rare, so use rarity as weight (higher rarity = more common)
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
        const interval = setInterval(() => {
            setBalls((prev) => {
                if (prev.length >= totalBalls) {
                    clearInterval(interval);
                    return prev;
                }

                const picked = pickRandomBallWeighted();
                const isNew = !dropped.some((b: IBall) => b?.name === picked.name);
                const ballWithNew = isNew ? { ...picked, new: true } : picked;

                return [...prev, ballWithNew];
            });
        }, 200);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setDropped((oldDropped: IBall[]) => {
            const newDropped = [...oldDropped];
            for (const ball of balls) {
                if (!newDropped.some((b) => b.name === ball.name)) {
                    newDropped.push(ball);
                    // Dispatch event for rare, very-rare, legendary
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
