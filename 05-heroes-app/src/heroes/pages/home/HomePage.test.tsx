import { fireEvent, render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, test, vi } from "vitest"
import { HomePage } from "./HomePage"
import { MemoryRouter } from "react-router";
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FavoriteHeroProvider } from "@/heroes/context/FavoriteHeroContext";

vi.mock('@/heroes/hooks/usePaginatedHero', () => ({
    usePaginatedHero: vi.fn()
}))

const mockUsePaginatedHero = vi.mocked(usePaginatedHero);

mockUsePaginatedHero.mockReturnValue({
    data: [],
    isLoading: false,
    isError: false,
    isSuccess: false
} as unknown as ReturnType<typeof usePaginatedHero>)

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false
        }
    }
});



const renderHomePage = (initialEntries: string[] = ['/']) => {

    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <FavoriteHeroProvider>
                <QueryClientProvider client={queryClient}>
                    <HomePage />
                </QueryClientProvider>
            </FavoriteHeroProvider>
        </MemoryRouter>
    );

}

describe("HomePage", () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("should render HomePage with default values", () => {

        const { container } = renderHomePage();

        expect(container).toMatchSnapshot();

    })

    test("should call usePaginatedHero with default values", () => {

        renderHomePage();

        expect(mockUsePaginatedHero).toHaveBeenCalledWith(1, 6, 'all');

    });

    test('should call usePaginatedHero with query params', () => {

        renderHomePage(['/?page=2&limit=10&category=heroes']);

        expect(mockUsePaginatedHero).toHaveBeenCalledWith(2, 10, 'heroes');

    });

    test('should called usePaginatedHero and smae limit on favorite tab', () => {

        renderHomePage(['/?tab=favorites&page=2&limit=10']);

        const [, , , villainsTab] = screen.getAllByRole('tab');
        fireEvent.click(villainsTab);

        expect(mockUsePaginatedHero).toHaveBeenCalledWith(1, 10, 'villain');

    });

})