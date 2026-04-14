import { useEffect, useState } from "react";

export const colors = {
    red: 'bg-red-500 animate-pulse',
    yellow: 'bg-yellow-500 animate-pulse',
    green: 'bg-green-500 animate-pulse',
};

export type TrafficLightColors = keyof typeof colors;

export const useTrafficLight = () => {

    const [light, setLight] = useState<TrafficLightColors>('red');

    const [countdown, setCountdown] = useState(5);


    const onChangeCountdown = () => {

        setCountdown(prev => {

            if (prev > 1) return prev - 1;

            setLight(light => {
                if (light === 'red') return 'yellow';
                if (light === 'yellow') return 'green';
                return 'red';
            });

            return 5;
        });

    }


    useEffect(() => {

        const timer = setTimeout(onChangeCountdown, 1000);

        return () => clearTimeout(timer);

    }, [countdown]);

    const percentage = (countdown / 5) * 100;

    const greenLight = light === 'green' ? colors.green : 'bg-gray-500';

    const yellowLight = light === 'yellow' ? colors.yellow : 'bg-gray-500';

    const redLight = light === 'red' ? colors.red : 'bg-gray-500';

    return {
        countdown,

        percentage,
        greenLight,
        yellowLight,
        redLight
    }

}
