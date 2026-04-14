import { useCounter } from '@/hooks/useCounter'
import { useMemo, useState } from 'react';

const heavyStuff = (iterationNumber: number) => {

    console.time('Heavy_stuff');

    for (let i = 0; i < iterationNumber; i++) {
        console.log('Ahí vamos...');
    }

    console.timeEnd('Heavy_stuff');

    return `${iterationNumber} iteraciones realizadas`;

}

export const MemoCounter = () => {

    const { counter, increment } = useCounter(40_000);
    const { counter: counter2, increment: increment2 } = useCounter(40_000);

    const myHeavyValue = useMemo(() => {

        return heavyStuff(counter);

    }, [counter]);

    return (
        <div className='bg-gradient flex flex-col gap-4'>

            <h1 className='text-2xl font-thin text-white'>
                Use Memo - {myHeavyValue}
            </h1>

            <hr />

            <h4>
                Counter: {counter}
            </h4>

            <h4>
                Counter: {counter2}
            </h4>

            <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer" onClick={increment} >
                +1
            </button>

            <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer" onClick={increment2} >
                +1
            </button>

        </div>
    )
}
