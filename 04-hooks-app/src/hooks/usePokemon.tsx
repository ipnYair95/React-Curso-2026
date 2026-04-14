import { useEffect, useEffectEvent, useState } from "react";

interface IPokemon {

    id: number;
    name: string;
    imageUrl: string;

}

interface IProps {
    id: number;
}

export const usePokemon = ({ id }: IProps) => {

    const [pokemon, setPokemon] = useState<IPokemon | null>(null);

    const [isLoading, setIsLoading] = useState(true);
    const getPokemonById = async (id: number) => {

        setIsLoading(true);

        const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

        const data = await result.json();

        setPokemon({
            id: data.id,
            name: data.name,
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`
        });

        setIsLoading(false);

    }

    const formattedId = id.toString().padStart(3, '0');

    useEffect(() => {
        getPokemonById(id);
    }, [id]);

    return {
        isLoading,
        pokemon,
        formattedId
    }

}
