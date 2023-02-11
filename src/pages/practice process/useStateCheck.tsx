import React, { useState } from 'react';

export function UseStateCheck() {
    const [count, setCount] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClick = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            setCount(count + 10);

            let i = count;
            const intervalId = setInterval(() => {
                if (i === count + 10) {
                    clearInterval(intervalId);
                    setIsAnimating(false);
                } else {
                    console.log(i);                
                    i++;

                }
            }, 100);
        }
    };

    return (
        <div>
            <button onClick={handleClick}>Click Me</button>
        </div>
    );
}
