import React, { useState } from "react";

// 星星概率
const star3 = 0.4;
const star4 = 0.5;
const star5 = 0.08;
const star6 = 0.02;

const probabilities = [star3, star4, star5, star6];

// 星星数 -> 卡片名字
const cardsByStar: { [key: number]: string[] } = {
    3: ["Card 1", "Card 2", "Card 3"],
    4: ["Card 4", "Card 5", "Card 6"],
    5: ["Card 7", "Card 8", "Card 9"],
    6: ["Card 10", "Card 11", "Card 12"]
};

const draw = (probabilities: number[]): number => {
    let randomNumber = Math.random();
    let cumulativeProbability = 0;
    for (let i = 0; i < probabilities.length; i++) {
        cumulativeProbability += probabilities[i];
        if (randomNumber < cumulativeProbability) {
            return i;
        }
    }
    return probabilities.length - 1;
};

const drawCard = (star: number) => {
    let cards = cardsByStar[star];
    let randomIndex = Math.floor(Math.random() * cards.length);
    return cards[randomIndex];
};


export const DrawCardPageAdv = () => {
    const [draws, setDraws] = useState<string[]>([]);

    const handleRedraw = () => {
        let newDraws: string[] = [];
        for (let i = 0; i < 10; i++) {
            let star = draw(probabilities) + 3;
            let card = drawCard(star);
            newDraws.push(card);
        }
        setDraws(newDraws);
    };


    return (
        <>
            <div>
                <div>抽到的卡片：</div>
                <div>{draws.map((star, index) => <div key={index}>{star}</div>)}</div>
                <button className="redraw" onClick={handleRedraw}>10連抽</button>
            </div>
        </>
    );
};
