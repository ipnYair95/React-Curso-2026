import { render, screen, waitFor } from "@testing-library/react"
import { describe, expect, test, vi } from "vitest"
import { HeroStats } from "./HeroStats"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useHeroSummary } from "../hooks/useHeroSummary";
import type { ISummaryInformationResponse } from "../interfaces/summary-information.response";
import type { IHero } from "../interfaces/get-heroes.response";
import { FavoriteHeroProvider } from "../context/FavoriteHeroContext";

vi.mock('../hooks/useHeroSummary', () => ({
    useHeroSummary: vi.fn()
}));

const mockUseHeroSummary = vi.mocked(useHeroSummary);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false
        }
    }
});

const renderHeroStats = (mockData?: Partial<ISummaryInformationResponse>) => {

    mockUseHeroSummary.mockReturnValue({
        data: mockData
    } as unknown as ReturnType<typeof useHeroSummary>)


    return render(
        <QueryClientProvider client={queryClient}>
            <FavoriteHeroProvider>
                <HeroStats />
            </FavoriteHeroProvider>
        </QueryClientProvider>
    );

}

describe("HeroStats", () => {

    test("should render component with default values", () => {

        renderHeroStats();

        const loader = screen.queryByText("Loading...");

        expect(loader).toBeDefined();

    })

    test("should render component with data", () => {

        const mockData = {
            totalHeroes: 11,
            strongestHero: {} as IHero,
            smartestHero: {} as IHero,
            heroCount: 5,
            villainCount: 6
        }

        renderHeroStats(mockData);

        const totalHeroes = screen.getByText("11");

        expect(totalHeroes).toBeDefined();

    });

    test("should change the percentage when a new hero is added", () => {

        const mockData = {
            totalHeroes: 2,
            strongestHero: {} as IHero,
            smartestHero: {} as IHero,
            heroCount: 5,
            villainCount: 6
        }

        const heroe = {
            id: '1',
            name: 'batman'
        }

        localStorage.setItem('favorites', JSON.stringify([heroe]));

        renderHeroStats(mockData);

        waitFor(() => {
            expect(screen.getByTestId("favorite-count").textContent).toBe('1');
        })

        const percent = screen.getByTestId("percent-favorites");
        expect(percent.textContent).toContain('50.00%');

      


    });

})