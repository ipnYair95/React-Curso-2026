import { describe, expect, test, vi } from "vitest"
import { renderHook, waitFor } from '@testing-library/react'
import { useHeroSummary } from "./useHeroSummary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { getSummaryAction } from "../actions/get-summary.action";
import type { ISummaryInformationResponse } from "../interfaces/summary-information.response";


vi.mock("../actions/get-summary.action", () => ({
    getSummaryAction: vi.fn()
}))

const mockGetSummaryAction = vi.mocked(getSummaryAction);

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

describe("useHeroSummary", () => {

    test("should return the initial state (isLoading) ", () => {

        const { result } = renderHook(() => useHeroSummary(), {
            wrapper: tanStackCustomProvider()
        });

        expect(result.current.isLoading).toBe(true);
        expect(result.current.data).toBeUndefined();
        expect(result.current.error).toBeNull();
        expect(result.current.isError).toBe(false);

    })

    test("should return success state when data is fetched", async () => {

        const mockSummarydata = {
            totalHeroes: 10,
            strongestHero: {
                id: '1',
                name: 'Superman',
            },
            smartestHero: {
                id: '2',
                name: 'Batman',
            },
            heroCount: 5,
            villainCount: 5
        } as ISummaryInformationResponse;

        mockGetSummaryAction.mockResolvedValue(mockSummarydata);

        const { result } = renderHook(() => useHeroSummary(), {
            wrapper: tanStackCustomProvider()
        });

        expect(result.current.isError).toBe(false);
        expect(mockGetSummaryAction).toHaveBeenCalled();

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
            expect(result.current.data).toStrictEqual(mockSummarydata);
        })

    });

    test("should return error state when data is not fetched", async () => {

        const mockError = new Error('Error fetching data');

        mockGetSummaryAction.mockRejectedValue(mockError);

        const { result } = renderHook(() => useHeroSummary(), {
            wrapper: tanStackCustomProvider()
        });

        await waitFor(() => {
            expect(result.current.isError).toBe(true);
            expect(result.current.error).toBe(mockError);
            expect(mockGetSummaryAction).toHaveBeenCalled();
        })

    });

})