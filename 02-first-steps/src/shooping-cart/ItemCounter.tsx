import { useState } from "react";
//import './ItemCounter.css';
import styles from './ItemCounter.module.css';

interface IProps {
    name: string;
    quantity?: number
}

export const ItemCounter = ({ name, quantity = 1 }: IProps) => {

    const [count, setCount] = useState(quantity);

    const handleAdd = () => {

        setCount(count + 1);

    }

    const handleSubtract = () => {

        if(count === 1) {
            return;
        }

        setCount(count - 1);
    }

    return (
        <section className={styles['item-row']}>
            <span className={styles['item-name']} style={{
                color: count === 1 ? 'red' : 'blue'
            }} >
                {name}
            </span>

            <button onClick={handleAdd}>+1</button>

            <span>{count}</span>

            <button onClick={handleSubtract}>-1</button>

        </section>
    )
}
