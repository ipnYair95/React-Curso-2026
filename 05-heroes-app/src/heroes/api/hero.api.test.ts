import { describe, expect, test } from "vitest"
import { heroApi } from "./heroe.api"

const BASE_URL = import.meta.env.VITE_API_URL;

describe("Main", () => {

    test("should be configre poiting to the testing server", () => {

        expect(heroApi).toBeDefined();
        expect(heroApi.defaults.baseURL).toBe(`${BASE_URL}/api/heroes`);
        expect(BASE_URL).toContain("3001");

    })

})