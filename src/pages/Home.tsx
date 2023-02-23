import react from 'react';
import { JsonDeleteKey } from './component/JsonDeleteKey';
import { DrawCard } from './DrawCard';
import { DrawCardInverse } from './DrawCard_inverse';
import { DrawCardInverseGuaranteed } from './DrawCard_inverse_guaranteed';
import { DrawCardInverseGuaranteedTest } from './DrawCard_inverse_guaranteed_test';

export const Home = () => {
    return (
        <div>
            {/* <JsonDeleteKey></JsonDeleteKey> */}

            {/* <h1>首頁</h1>
            <DrawCard />

            <h1>Inverse</h1>
            <DrawCardInverse /> */}

            {/* <h1>有保底的版本</h1> */}
            <DrawCardInverseGuaranteed />

            {/* <h1>有保底的版本-測試中</h1> */}
            <DrawCardInverseGuaranteedTest />

        </div>

    );
};
