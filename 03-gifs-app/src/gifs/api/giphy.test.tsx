import { describe, expect, test } from "vitest";
import { giphyApi } from "./giphy.api";

describe('giphy.test', () => {

    test('should configured api', () => {

        expect(giphyApi.defaults.baseURL).toBe('https://api.giphy.com/v1/gifs');
        expect(giphyApi.defaults.params).toStrictEqual({
            lang: 'es',
            api_key: import.meta.env.VITE_API_KEY,
        });

    });

});