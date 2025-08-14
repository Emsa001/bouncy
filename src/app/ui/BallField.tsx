import React, { useRef } from "react";
import { BallElement } from "./BallElement";
import { useBalls } from "../model/useBalls";

export default function BallField() {
    const bound = useRef<HTMLDivElement | null>(null);

    const { maxX, maxY, balls } = useBalls(10, bound);

    return (
        <div className="w-full h-full absolute top-0 overflow-hidden" ref={bound}>
            {balls.map((ball) => {
                return <BallElement key={ball.name} bound={bound} ball={ball} maxX={maxX} maxY={maxY} />;
            })}
        </div>
    );
}
