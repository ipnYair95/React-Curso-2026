import { beforeEach, describe, expect, test, vi } from "vitest";
import { getGifsByQuery } from "./get-gifs-by-query.action";
import AxiosMockAdapter from "axios-mock-adapter";
import { giphyApi } from "../api/giphy.api";
import { MOCK_GIFS } from "../../../mock/gifs.response";


describe('getGifsByQuery', () => {

    /*  test('should return a list of gifs', async () => {
 
         const gifs = await getGifsByQuery('goku');
 
         const [gif1] = gifs;
 
         expect(gifs.length).toBe(10);
 
         expect(gif1).toStrictEqual({
             id: expect.any(String),
             title: expect.any(String),
             url: expect.any(String),
             width: expect.any(Number),
             height: expect.any(Number),
         });
 
     }); */

    let mock: AxiosMockAdapter | null = null;

    beforeEach(() => {
        //mock.reset();
        mock = new AxiosMockAdapter(giphyApi);
    });    

    test('should return list of gifs', async () => {

        mock!.onGet('/search').reply(200, MOCK_GIFS);

        const gifs = await getGifsByQuery('goku');

        expect(gifs.length).toBe(10);

        gifs.forEach((gif) => {
            expect(gif).toStrictEqual({
                id: expect.any(String),
                title: expect.any(String),
                url: expect.any(String),
                width: expect.any(Number),
                height: expect.any(Number),
            });
        });

    });

    test('should return an empty list of gifs', async () => {

        mock!.restore();

        const gifs = await getGifsByQuery('');

        expect(gifs.length).toBe(0);

    });

    test('should handle error when request fails', async () => {

        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => ({}));

        mock!.onGet('/search').reply(400, {
            message: 'Bad request'
        });

        const gifs = await getGifsByQuery('goku');

        expect(gifs.length).toBe(0);
        expect(consoleSpy).toHaveBeenCalled();
        expect(consoleSpy).toHaveBeenCalledTimes(1);
        expect(consoleSpy).toHaveBeenCalledWith( expect.any(Error) );
        
    });

});
