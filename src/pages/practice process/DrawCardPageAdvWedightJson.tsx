import React, { useState } from "react";
import uuid from "react-uuid";
const probabilities: { [key: string]: number } = {
    "3": 0.4,
    "4": 0.5,
    "5": 0.08,
    "6": 0.02
};

const cards: { [key: string]: { star: number; weight: number; image: string } } = {
    "Card 1": {
        star: 3,
        weight: 1,
        image: require("./../image/W/W-half.png")
    },
    "Card 2": {
        star: 3,
        weight: 1,
        image: require("./../image/W/W-half.png")
    },
    "Card 3": {
        star: 3,
        weight: 1,
        image: require("./../image/W/W-half.png")
    },
    "Card 4": {
        star: 4,
        weight: 1,
        image: require("./../image/W/W-half.png")
    },
    "Card 5": {
        star: 4,
        weight: 1,
        image: require("./../image/W/W-half.png")
    },
    "Card 6": {
        star: 4,
        weight: 1,
        image: require("./../image/W/W-half.png")
    },
    "Card 7": {
        star: 5,
        weight: 1,
        image: require("./../image/W/W-half.png")
    },
    "Card 8": {
        star: 5,
        weight: 1,
        image: require("./../image/W/W-half.png")
    },
    "Card 9": {
        star: 5,
        weight: 1,
        image: require("./../image/W/W-half.png")
    },
    "Card 10": {
        star: 6,
        weight: 0.8,
        image: require("./../image/W/W-half.png")
    },
    "Card 11": {
        star: 6,
        weight: 0.1,
        image: require("./../image/W/W-half.png")
    },
    "Card 12": {
        star: 6,
        weight: 0.1,
        image: require("./../image/W/W-half.png")
    }
};


export const DrawCardPageAdvWedightJson = () => {

    const [draws, setDraws] = useState<string[]>([]);

    const handleRedraw = () => {
        let newDraws: string[] = [];
        for (let i = 0; i < 10; i++) {
            newDraws.push(draw());
        }
        setDraws(newDraws);
    };

    const draw = (): any => {
        const stars = Object.keys(probabilities);
        let randomNumber = Math.random();
        let cumulativeProbability = 0;
        for (const star of stars) {
            cumulativeProbability += probabilities[star];
            if (randomNumber < cumulativeProbability) {
                const cardsWithStar = Object.keys(cards).filter(
                    card => cards[card].star === Number(star)
                );
                const totalWeight = cardsWithStar.reduce((sum, card) => {
                    sum += cards[card].weight;
                    return sum;
                }, 0);
                const target = Math.random() * totalWeight;
                let weightSum = 0;
                for (const card of cardsWithStar) {
                    weightSum += cards[card].weight;
                    if (weightSum >= target) {
                        return card;
                    }
                }
            }
        }
    };


    return (
        <>
            <div>
                <div>抽到的卡片：</div>
                {/* <div>{draws.map((star, index) => <div key={index}>{star}</div>)}</div> */}

                <div className="cardList">
                    {draws.map((star, index) => (
                        <div key={uuid()}>
                            <img src={cards[star].image} alt="123" />
                        </div>
                    ))}
                </div>
                <button onClick={handleRedraw}>開抽</button>
            </div>
        </>
    );
};
