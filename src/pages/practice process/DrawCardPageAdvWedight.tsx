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

// 卡片名字 -> 卡片概率
const cardsByName: { [name: string]: number } = {
    "Card 1": 1,
    "Card 2": 1,
    "Card 3": 1,
    "Card 4": 1,
    "Card 5": 1,
    "Card 6": 1,
    "Card 7": 1,
    "Card 8": 1,
    "Card 9": 1,
    "Card 10": 0.8,
    "Card 11": 0.1,
    "Card 12": 0.1
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
    // 0 恭喜你抽到了 3 星卡
    return 0;
};

const drawCard = (probabilities: number[]): number => {
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

export const DrawCardPageAdvWedight = () => {
    const [draws, setDraws] = useState<string[]>([]);

    const handleRedraw = () => {
        let newDraws: string[] = [];
        for (let i = 0; i < 10; i++) {
            let star = draw(probabilities) + 3;
            let cards = cardsByStar[star];
            let cardProbabilities = cards.map(name => cardsByName[name]);
            let cardIndex = drawCard(cardProbabilities);
            newDraws.push(cards[cardIndex]);
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
