/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState, type PropsWithChildren } from "react"
import type { IHero } from "../interfaces/get-heroes.response";

interface FavoriteHeroContext {

    favorites: IHero[];
    favoriteCount: number;

    toggleFavorite: (hero: IHero) => void;
    isFavorite: (hero: IHero) => boolean;

}


export const FavoriteHeroContext = createContext({} as FavoriteHeroContext);

const getFavoritesFromLocalStorage = () => {

    const favorites = localStorage.getItem('favorites');

    return favorites ? JSON.parse(favorites) : [];

}

export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {

    const [favorites, setFavorites] = useState<IHero[]>(getFavoritesFromLocalStorage());

    const toggleFavorite = (hero: IHero) => {

        const heroExist = favorites.find((h: IHero) => h.id === hero.id);

        if (heroExist) {
            const newFavorites = favorites.filter((h: IHero) => h.id !== hero.id);
            setFavorites(newFavorites);
            return;
        }

        setFavorites([...favorites, hero]);

    }

    const isFavorite = (hero: IHero): boolean => {
        return favorites.some((h: IHero) => h.id === hero.id);
    }

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    return (
        <FavoriteHeroContext value={{
            favorites,
            favoriteCount: favorites.length,
            isFavorite,
            toggleFavorite
        }}>
            {children}
        </FavoriteHeroContext>
    )
}