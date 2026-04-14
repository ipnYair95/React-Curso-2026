import { heroApi } from "../api/heroe.api";
import type { IHero } from "../interfaces/get-heroes.response";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getHeroAction = async (idSlug: string) => {

    const { data } = await heroApi.get<IHero>(`/${idSlug}`);

    return {
        ...data,
        image: `${BASE_URL}/images/${data.image}`
    }

}