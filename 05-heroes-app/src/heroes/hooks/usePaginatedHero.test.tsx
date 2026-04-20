import { describe, expect, test, vi } from "vitest"
import { usePaginatedHero } from "./usePaginatedHero";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { getHeroesByPageAction } from "../actions/get-heroes-by-page.action";

vi.mock('../actions/get-heroes-by-page.action', () => ({
    getHeroesByPageAction: vi.fn()
}))

const mockGetHeroesByPageAction = vi.mocked(getHeroesByPageAction);

const tanStackCustomProvider = () => {

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                refetchOnWindowFocus: false
            }
        }
    });

    return ({ children }: PropsWithChildren) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )

}

describe("usePaginationHero", () => {

    test("should return the initial state (isLoading) ", () => {

        const { result } = renderHook(() => usePaginatedHero(1, 6), {
            wrapper: tanStackCustomProvider()
        });

        expect(result.current.isLoading).toBe(true);
        expect(result.current.data).toBeUndefined();
        expect(result.current.error).toBeNull();
        expect(result.current.isError).toBe(false);

    })

    test("should return success state with data when api call success", async () => {

        const mockHeroesData = {
            total: 20,
            pages: 4,
            heroes: []
        };

        mockGetHeroesByPageAction.mockResolvedValue(mockHeroesData);

        const { result } = renderHook(() => usePaginatedHero(1, 6), {
            wrapper: tanStackCustomProvider()
        });

        await waitFor(() => {

            expect(result.current.isSuccess).toBe(true);

            expect(result.current.status).toBe("success");
            expect(result.current.data).toEqual(mockHeroesData);
            expect(result.current.error).toBeNull();
            expect(result.current.isError).toBe(false);
            expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(1, 6, 'all');

        });

    })

    test("should call with args ", async () => {

        const mockHeroesData = {
            total: 20,
            pages: 4,
            heroes: []
        };

        mockGetHeroesByPageAction.mockResolvedValue(mockHeroesData);

        const { result } = renderHook(() => usePaginatedHero(2, 10, 'batman'), {
            wrapper: tanStackCustomProvider()
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(result.current.status).toBe("success");
        expect(result.current.data).toEqual(mockHeroesData);
        expect(result.current.error).toBeNull();
        expect(result.current.isError).toBe(false);
        expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(2, 10, 'batman');

    })


})