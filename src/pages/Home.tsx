import react from 'react';
import { JsonDeleteKey } from './component/JsonDeleteKey';
import { DrawCard } from './DrawCard';

export const Home = () => {
    return (
        <div>
            <h1>首頁</h1>
            {/* <JsonDeleteKey></JsonDeleteKey> */}
            <DrawCard />
        </div>

    );
};
