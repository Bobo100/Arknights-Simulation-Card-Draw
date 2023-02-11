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

    const [count3, setCount3] = useState(0);
    const [count4, setCount4] = useState(0);
    const [count5, setCount5] = useState(0);
    const [count6, setCount6] = useState(0);
    const [totalDraws, setTotalDraws] = useState(0);

    const handleRedraw = () => {
        let newDraws: Array<CardData> = [];
        let newRarity3Count = count3;
        let newRarity4Count = count4;
        let newRarity5Count = count5;
        let newRarity6Count = count6;
        for (let i = 0; i < 10; i++) {
            const newCard = draw();
            newDraws.push(newCard);

            if (newCard["card rarity"] === "3") {
                newRarity3Count++;
            } else if (newCard["card rarity"] === "4") {
                newRarity4Count++;
            } else if (newCard["card rarity"] === "5") {
                newRarity5Count++;
            } else if (newCard["card rarity"] === "6") {
                newRarity6Count++;
            }
        }

        setCount3(newRarity3Count);
        setCount4(newRarity4Count);
        setCount5(newRarity5Count);
        setCount6(newRarity6Count);
        setTotalDraws(totalDraws + 10);
        console.log("count3 ", count3, "count4 ", count4, "count5 ", count5, "count6 ", count6)
        console.log(totalDraws)
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
            <h2>統計狀態</h2>
            <div className="drawCount">
                {totalDraws > 0 &&
                    <ul>
                        {/* 3星次數 */}
                        <li>3星：{count3}張</li>
                        {/* 4星次數 */}
                        <li>4星：{count4}張</li>
                        {/* 5星次數 */}
                        <li>5星：{count5}張</li>
                        {/* 6星次數 */}
                        <li>6星：{count6}張</li>
                        <li>總共抽了：{totalDraws}次</li>
                    </ul>
                }
            </div>
            <div className="drawProbability">
                {draws && draws.length > 0 &&
                    <ul>
                        <li>3星：{count3 / totalDraws} %</li>
                        <li>4星：{count4 / totalDraws} %</li>
                        <li>5星：{count5 / totalDraws} %</li>
                        <li>6星：{count6 / totalDraws} %</li>
                    </ul>}
            </div>
            <div className="btn_container">
                <button onClick={handleRedraw} className="btn_draw">開抽</button>
                <button onClick={() => { setDraws([]); setCount3(0); setCount4(0); setCount5(0); setCount6(0); setTotalDraws(0) }} className="btn_reset">重置</button>
            </div>
        </div>
    );
};

