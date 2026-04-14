import type { IGiphyResponse } from "../interfaces/giphy.response";
import type { INormalizedGif } from "../interfaces/normalized-gif.interface";
import { giphyApi } from "../api/giphy.api";

export const getGifsByQuery = async (query: string) : Promise<INormalizedGif[]> => {

    if (!query.trim()) {
        return [];
    }

    try {
        
        const response = await giphyApi.get<IGiphyResponse>('/search', {
            params: {
                q: query,
                limit: 10
            }
        });
        
        return response.data.data.map((gif) => ({
            id: gif.id,
            title: gif.title,
            url: gif.images.downsized_medium.url,
            width: +gif.images.downsized_medium.width,
            height: +gif.images.downsized_medium.height,
        }));

    } catch (error) {        

        console.error(error)
        return [];

    }

}