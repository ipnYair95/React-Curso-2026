import { heroApi } from "../api/heroe.api"
import type { IHeroesResponse } from "../interfaces/get-heroes.response";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getHeroesByPageAction = async (page: number, limit?: number = 6, category?: string = 'all'): Promise<IHeroesResponse> => {

    if (isNaN(page)) {
        page = 1;
    }

    if (isNaN(limit)) {
        limit = 6;
    }

    const { data } = await heroApi.get<IHeroesResponse>('/', {
        params: {
            limit,
            offset: (page - 1) * limit,
            category
        }
    })

    const heroes = data.heroes.map((hero) => ({
        ...hero,
        intelligence: hero.intelligence * 10,
        strength: hero.strength * 10,
        speed: hero.speed * 10,
        durability: hero.durability * 10,
        image: `${BASE_URL}/images/${hero.image}`
    }));

    return {
        ...data,
        heroes: heroes
    };

}