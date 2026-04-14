import { useState } from "react";

export const useCounter = (initialValue = 5) => {

    const [counter, setCounter] = useState(initialValue);

    const handleAdd = () => {
        setCounter(counter + 1);
    };

    const handleSubtract = () => {
        setCounter(counter - 1);
    };

    const handleReset = () => {
        setCounter(initialValue);
    };

    return {
        counter,
        handleAdd,
        handleSubtract,
        handleReset
    }
}
