import React, { useState } from "react";
import uuid from "react-uuid";
import classnames from 'classnames';

import "./css/DrawCard.css"

import rarity_1 from "./../json/rarity_1.json";
import rarity_2 from "./../json/rarity_2.json";
import rarity_3 from "./../json/rarity_3.json";
import rarity_4 from "./../json/rarity_4.json";
import rarity_5 from "./../json/rarity_5.json";
import rarity_6 from "./../json/rarity_6.json";

let combineData = [...rarity_1, ...rarity_2, ...rarity_3, ...rarity_4, ...rarity_5, ...rarity_6]

const cards = combineData.filter(item => {
    return item.approach.includes("公開招募");
});

const probabilities: { [key: string]: number } = {
    "3": 0.4,
    "4": 0.5,
    "5": 0.08,
    "6": 0.02
};

interface CardData {
    "card name": string;
    "card rarity": string;
    "card image_path": string;
}

export const DrawCard = () => {

    const [draws, setDraws] = useState<CardData[]>([]);

    const handleRedraw = () => {
        let newDraws: Array<CardData> = [];
        for (let i = 0; i < 10; i++) {
            newDraws.push(draw());
        }
        console.log(newDraws)
        setDraws(newDraws);
    };

    const draw: () => CardData = () => {
        let randomNumber = Math.random();
        let cumulativeProbability = 0;
        for (const [star, probability] of Object.entries(probabilities)) {
            cumulativeProbability += probability;
            if (randomNumber < cumulativeProbability) {
                const cardsWithStar = cards.filter(
                    card => card.rarity === star
                );
                const totalWeight = cardsWithStar.reduce((sum, card) => {
                    sum += card.weight;
                    return sum;
                }, 0);
                const target = Math.random() * totalWeight;
                let weightSum = 0;
                for (const card of cardsWithStar) {
                    weightSum += card.weight;
                    if (weightSum >= target) {
                        return {
                            "card name": card["cn"],
                            "card rarity": card["rarity"],
                            "card image_path": card["image_path"],
                        };
                    }
                }
            }
        }
        return {
            "card name": "error",
            "card rarity": "error",
            "card image_path": "error",
        }
    };


    return (
        <div className="drawCard">
            <h2>抽到的卡片：</h2>
            <div className="cardList">
                {draws.map((star, index) => (
                    <div key={uuid()}>
                        <img className={classnames('cardImg', { 'rarity-6': star["card rarity"] === '6' }, { 'rarity-5': star["card rarity"] === '5' }, { 'rarity-4': star["card rarity"] === '4' })}
                            src={
                                (() => {
                                    try {
                                        return require(`./../image/${star["card name"]}/${star["card name"]}-half.png`);
                                    } catch (error) {
                                        console.error(error);
                                        return require('./../image/麥哲倫/麥哲倫-half.png');
                                    }
                                })()
                            }
                            alt="error"
                        ></img>
                        <div>{star["card name"]}</div>
                    </div>
                ))}
            </div>
            <div className="btn_container">
                <button onClick={handleRedraw} className="btn_draw">開抽</button>
            </div>
        </div>
    );
};

