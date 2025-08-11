import React, { useRef } from "react";
import { Ball } from "./Ball";
import { useBalls } from "../model/useBalls";

const gradients = [
    { className: "bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900", rarity: 20 },
    { className: "bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900", rarity: 15 },
    { className: "bg-gradient-to-tl from-pink-900 via-purple-900 to-indigo-900", rarity: 10 },
    { className: "bg-gradient-to-b from-purple-900 via-indigo-900 to-blue-900", rarity: 20 },
    { className: "bg-gradient-to-tr from-indigo-900 via-pink-900 to-purple-900", rarity: 10 },
    { className: "bg-gradient-to-l from-blue-900 via-indigo-900 to-purple-900", rarity: 10 },
    { className: "bg-gradient-to-t from-purple-900 via-indigo-900 to-pink-900", rarity: 5 },
    { className: "bg-gradient-to-bl from-pink-900 via-purple-900 to-blue-900", rarity: 5 },
    { className: "bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900", rarity: 5 },
    { className: "bg-gradient-to-r from-pink-900 via-indigo-900 to-purple-900", rarity: 5 },
    { className: "bg-gradient-to-br from-emerald-600 via-indigo-900 to-purple-800", rarity: 1 },
    { className: "bg-gradient-to-tl from-pink-600 via-rose-900 to-indigo-900", rarity: 1 },


];

export default function BallField() {
    const bound = useRef<HTMLDivElement | null>(null);

    const { maxX, maxY, balls } = useBalls(20, bound);

    function pickGradient() {
        const total = gradients.reduce((sum, g) => sum + g.rarity, 0);
        let rand = Math.random() * total;
        for (const g of gradients) {
            if (rand < g.rarity) return g.className;
            rand -= g.rarity;
        }
        return gradients[0].className;
    }

    return (
        <div className="w-full h-full absolute top-0 overflow-hidden" ref={bound}>
            {balls.map((id) => {
                const gradient = pickGradient();
                return <Ball key={id} bound={bound} className={gradient} maxX={maxX} maxY={maxY} />;
            })}
        </div>
    );
}
