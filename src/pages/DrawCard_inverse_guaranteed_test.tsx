import React, { useState } from "react";
import uuid from "react-uuid";
import classnames from 'classnames';

import "./css/DrawCard.css"

import rarity_1 from "../json/rarity_1.json";
import rarity_2 from "../json/rarity_2.json";
import rarity_3 from "../json/rarity_3.json";
import rarity_4 from "../json/rarity_4.json";
import rarity_5 from "../json/rarity_5.json";
import rarity_6 from "../json/rarity_6.json";

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

const sortedProbabilities = Object.entries(probabilities).sort(
    ([star1, prob1], [star2, prob2]) => Number(star2) - Number(star1)
);


interface CardData {
    "card name": string;
    "card rarity": string;
    "card image_path": string;
}

export const DrawCardInverseGuaranteedTest = () => {

    const [draws, setDraws] = useState<CardData[]>([]);

    const [count3, setCount3] = useState(0);
    const [count4, setCount4] = useState(0);
    const [count5, setCount5] = useState(0);
    const [count6, setCount6] = useState(0);
    const [totalDraws, setTotalDraws] = useState(0);

    // 設定保底目前的次數
    const [guaranteedCount, setGuaranteedCount] = useState(0);

    const handleDrawTen = async () => {
        let cards = [];
        let newRarity3Count = count3;
        let newRarity4Count = count4;
        let newRarity5Count = count5;
        let newRarity6Count = count6;
        let nowGuaranteedCount = guaranteedCount;
        for (let i = 0; i < 10; i++) {
            const newCard = draw(nowGuaranteedCount);
            cards.push(newCard);
            if (newCard["card rarity"] === "3") {
                newRarity3Count++;
                nowGuaranteedCount++;
            } else if (newCard["card rarity"] === "4") {
                newRarity4Count++;
                nowGuaranteedCount++;
            } else if (newCard["card rarity"] === "5") {
                newRarity5Count++;
                nowGuaranteedCount++;
            } else if (newCard["card rarity"] === "6") {
                newRarity6Count++;
                nowGuaranteedCount = 0;
                sortedProbabilities[0][1] = 0.02;
            }

            // console.log(nowGuaranteedCount)

        }

        setCount3(newRarity3Count);
        setCount4(newRarity4Count);
        setCount5(newRarity5Count);
        setCount6(newRarity6Count);
        setTotalDraws((totalDraws) => (totalDraws + 10));
        setDraws(cards);
        setGuaranteedCount(() => (nowGuaranteedCount));
    }

    const handleRedraw = () => {
        let newDraws: Array<CardData> = [];
        let newRarity3Count = count3;
        let newRarity4Count = count4;
        let newRarity5Count = count5;
        let newRarity6Count = count6;
        let nowGuaranteedCount = guaranteedCount;
        const newCard = draw(nowGuaranteedCount);
        newDraws.push(newCard);

        if (newCard["card rarity"] === "3") {
            newRarity3Count++;
            nowGuaranteedCount++;
        } else if (newCard["card rarity"] === "4") {
            newRarity4Count++;
            nowGuaranteedCount++;
        } else if (newCard["card rarity"] === "5") {
            newRarity5Count++;
            nowGuaranteedCount++;
        } else if (newCard["card rarity"] === "6") {
            newRarity6Count++;
            nowGuaranteedCount = 0;
            sortedProbabilities[0][1] = 0.02;
        }

        console.log(nowGuaranteedCount)

        setCount3(newRarity3Count);
        setCount4(newRarity4Count);
        setCount5(newRarity5Count);
        setCount6(newRarity6Count);
        setTotalDraws((totalDraws) => (totalDraws + 1));
        // console.log("count3 ", count3, "count4 ", count4, "count5 ", count5, "count6 ", count6)
        // console.log(totalDraws)
        setDraws(() => [...newDraws]);
        setGuaranteedCount(() => (nowGuaranteedCount));
    };
    // 抽卡 先決定抽到的星數 再決定抽到的卡片(根據卡片的權重)
    const draw: (nowGuaranteedCount: number) => CardData = (nowGuaranteedCount) => {
        let randomNumber = Math.random();
        let cumulativeProbability = 0;

        // 如果超過50次 沒抽到6星，就開始增加機率
        if (nowGuaranteedCount > 50) {
            sortedProbabilities[0][1] += 0.02;
            console.log("機率增加", sortedProbabilities[0][1])
        }

        console.log("六星卡機率", sortedProbabilities[0][1], "五星卡機率", sortedProbabilities[1][1], "四星卡機率", sortedProbabilities[2][1], "三星卡機率", sortedProbabilities[3][1], "")

        for (const [star, probability] of sortedProbabilities) {
            cumulativeProbability += probability;

            // 如果抽到的數字小於累積機率，就抽到該星數的卡片
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
            <h1>有保底的版本</h1>
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
                        <li>你已經連續：{guaranteedCount}抽沒有抽到6星啦~</li>
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
                <button onClick={handleRedraw} className="btn_draw">單抽</button>
                <button onClick={handleDrawTen} className="btn_drawten">10連抽</button>
                <button onClick={() => { setDraws([]); setCount3(0); setCount4(0); setCount5(0); setCount6(0); setTotalDraws(0); setGuaranteedCount(0) }} className="btn_reset">重置</button>
            </div>
        </div>
    );
};




