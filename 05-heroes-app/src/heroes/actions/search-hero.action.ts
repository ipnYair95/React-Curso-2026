import { heroApi } from "../api/heroe.api";
import type { IHero } from "../interfaces/get-heroes.response";

const BASE_URL = import.meta.env.VITE_API_URL;

export interface Options {
    name?: string;
    team?: string;
    category?: string;
    universe?: string;
    status?: string;
    strength?: string;
}

export const searchHeroAction = async (options: Options): Promise<IHero[]> => {

    const allOptionsValues = Object.values(options);

    if (allOptionsValues.every(value => !value)) {
        return [];
    }

    const { data } = await heroApi.get<IHero[]>('/search', {
        params: {
            ...options
        }
    })

    return data.map((hero) => ({
        ...hero,
        image: `${BASE_URL}/images/${hero.image}`
    }));

}