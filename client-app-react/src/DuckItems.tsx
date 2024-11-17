import { useState } from 'react';
import { IDuck } from './demo.tsx';

interface PropsItem {
    duck: IDuck;
}

function DuckItems({ duck }: PropsItem) {
    const [sound, setSound] = useState<string | null>(null);
    let [counter, setCounter] = useState<number | 0>(0);

    const handleMakeSound = () => {
        const duckSound = duck.makeSound('quack');
        setSound(duckSound);
        setCounter(++counter);
    };

    return (
        <div>
            {duck.name} makes a sound like{' '}
            <button onClick={handleMakeSound}>Make sound</button>
            {sound && <span>{sound} {counter} times</span>}
        </div>
    );
}

export default DuckItems;
