import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, test, vi } from "vitest"
import SearchPage from "./SearchPage";
import { searchHeroAction } from "@/heroes/actions/search-hero.action"; 
import type { IHero } from "@/heroes/interfaces/get-heroes.response";

vi.mock('./ui/SearchControls', () => ({
    SearchControls: () => <div data-testid="SearchControls">SearchControls</div>
}))

vi.mock('@/heroes/components/HeroGrid', () => ({
    HeroGrid: ({heroes}: IHero[]) => (
        <div data-testid="HeroGrid">
            {
                heroes.map((hero: IHero) => (
                    <div key={hero.id}>{hero.name}</div>
                ))
            }
        </div>
    )
}))

vi.mock('@/heroes/actions/search-hero.action', () => ({
    searchHeroAction: vi.fn()
}))

const mockSearchHeroAction = vi.mocked(searchHeroAction);

vi.mock('@/components/custom/CustomJumbotron', () => ({
    CustomJumbotron: () => <div data-testid="CustomJumbotron">CustomJumbotron</div>
}))


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false
        }
    }
})

const renderHomePage = (initialEntries: string[] = ['/']) => {

    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <QueryClientProvider client={queryClient}>
                <SearchPage />
            </QueryClientProvider>
        </MemoryRouter>
    );

}

describe("SearchPage", () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test(" should render SearchPage ", () => {

        renderHomePage();

        expect(mockSearchHeroAction).toHaveBeenCalledWith({
            name: '',
            strength: ''
        });

    })

    test('should call search action with name parameter', () => {

        renderHomePage(['/search?name=superman']);

        expect(mockSearchHeroAction).toHaveBeenCalledWith({
            name: 'superman',
            strength: ''
        }); 

    })

    test('should render HeroGrid with search results', async () => {

        const mockHeroes = [
            {
                id: '1',
                name: 'superman'
            },
            {
                id: '2',
                name: 'batman'
            }
        ] as IHero[]

        mockSearchHeroAction.mockResolvedValue(mockHeroes);

        renderHomePage(['/search?name=superman']);

        await waitFor(() => {

            expect(screen.getByText('superman')).toBeDefined();
            expect(screen.getByText('batman')).toBeDefined(); 
            
        });
 


    });

})