import { beforeEach, describe, expect, test } from "vitest"
import { getHeroesByPageAction } from "./get-heroes-by-page.action"
import AxiosMockAdapter from "axios-mock-adapter";
import { heroApi } from "../api/heroe.api";

const BASE_URL = import.meta.env.VITE_API_URL;

describe("getHeroesByPageAction", () => {

    const heroesApiMock = new AxiosMockAdapter(heroApi);

    beforeEach(() => {
        heroesApiMock.reset();
        heroesApiMock.resetHistory();
    })

    test("should return default heroes", async () => {

        heroesApiMock.onGet('/').reply(200, {
            total: 10,
            pages: 2,
            heroes: [
                {
                    image: '1.jpeg',
                    intelligence: 10,
                    strength: 10,
                    speed: 10,
                    durability: 10
                },
                {
                    image: '2.jpeg',
                    intelligence: 10,
                    strength: 10,
                    speed: 10,
                    durability: 10
                }
            ]
        });

        const response = await getHeroesByPageAction(1);

        expect(response).toStrictEqual({
            total: 10,
            pages: 2,
            heroes: [
                {
                    image: `${BASE_URL}/images/1.jpeg`,
                    intelligence: 100,
                    strength: 100,
                    speed: 100,
                    durability: 100
                },
                {
                    image: `${BASE_URL}/images/2.jpeg`,
                    intelligence: 100,
                    strength: 100,
                    speed: 100,
                    durability: 100
                }
            ]
        });

    })

    test("should return the correct heroes when page is not a number", async () => {

        const responseObject = {
            total: 10,
            page: 1,
            heroes: []
        }

        heroesApiMock.onGet('/').reply(200, responseObject);

        await getHeroesByPageAction('abc' as unknown as number);

        const params = heroesApiMock.history.get[0].params;

        expect(params).toEqual({ limit: 6, offset: 0, category: 'all' });

    });

    test("should call api with the correct params", async () => {

        const responseObject = {
            total: 10,
            page: 1,
            heroes: []
        }

        heroesApiMock.onGet('/').reply(200, responseObject);

        await getHeroesByPageAction(2, 10, 'heroes');

        const params = heroesApiMock.history.get[0].params;

        expect(params).toEqual({ limit: 10, offset: 10, category: 'heroes' });

    });

})