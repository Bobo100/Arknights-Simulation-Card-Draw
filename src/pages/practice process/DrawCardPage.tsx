import React, { useState } from "react";

const star3 = 0.4;
const star4 = 0.5;
const star5 = 0.08;
const star6 = 0.02;

const probabilities = [star3, star4, star5, star6];

const draw = (probabilities: number[]): number => {
    let randomNum = Math.random();
    let sum = 0;
    for (let i = 0; i < probabilities.length; i++) {
        sum += probabilities[i];
        if (randomNum <= sum) {
            return i;
        }
    }
    return probabilities.length - 1;
};

export const DrawCardPage = () => {

    const [star, setStar] = useState(0);

    const handleClick = () => {
        setStar(draw(probabilities));
    };

    const [draws, setDraws] = useState<number[]>([]);


    const handleRedraw = () => {
        // let newDraws: number[] = [...draws];
        let newDraws: number[] = [];
        for (let i = 0; i < 10; i++) {
            newDraws.push(draw(probabilities) + 3);
        }
        setDraws(newDraws);
    };

    return (
        <>
            <div>
                <div>
                    抽到的卡片星数是:{star + 3}星
                </div>
                <button className="redraw" onClick={handleClick}>
                    重抽
                </button>
            </div>

            <div>
                <div>抽到的卡片星数：</div>
                <div>{draws.map((star, index) => <div key={index}>{star}星</div>)}</div>
                <button className="redraw" onClick={handleRedraw}>10連抽</button>
            </div>
        </>
    );
};
