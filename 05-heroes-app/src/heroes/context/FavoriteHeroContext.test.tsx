import { fireEvent, render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, test } from "vitest"
import { FavoriteHeroContext, FavoriteHeroProvider } from "./FavoriteHeroContext"
import { use } from "react"
import type { IHero } from "../interfaces/get-heroes.response"

const mockHero = {
    id: '1',
    name: 'batman'
} as IHero

const TestComponent = () => {

    const { favoriteCount, favorites, isFavorite, toggleFavorite } = use(FavoriteHeroContext);


    return (
        <div>

            <div data-testid="favorite-count">
                {favoriteCount}
            </div>

            <div data-testid="favorite-list">
                {
                    favorites.map(favorite => (
                        <div key={favorite.id} data-testid={`favorite-${favorite.id}`}>
                            {favorite.name}
                        </div>
                    ))
                }
            </div>

            <button data-testid="toggle-favorite" onClick={() => toggleFavorite(mockHero)}>
                Toggle Favorite
            </button>

            <div data-testid="is-favorite">
                {isFavorite(mockHero).toString()}
            </div>

        </div>
    );

}

const renderContextTest = () => {

    return render(
        <FavoriteHeroProvider>
            <TestComponent />
        </FavoriteHeroProvider>
    )

}

describe("FavoriteHeroContext", () => {

    beforeEach(() => {
        localStorage.clear();
    })

    test("should initialize with default values", async () => {

        renderContextTest();

        expect(screen.getByTestId("favorite-count").textContent).toBe('0');

        const favoriteList = screen.queryByTestId("favorite-list")?.children;

        expect(favoriteList).toHaveLength(0);

    })

    test("should toggle favorite", async () => {

        renderContextTest();

        const button = screen.getByTestId("toggle-favorite");
        fireEvent.click(button);

        expect(screen.getByTestId("favorite-count").textContent).toBe('1');
        expect(screen.getByTestId("is-favorite").textContent).toBe('true');
        expect(screen.getByTestId(`favorite-${mockHero.id}`).textContent).toBe('batman');

        const localStorageFavorites = localStorage.getItem('favorites');

        expect(localStorageFavorites).toContain(mockHero.id);

    });

    test("should remove from favorites when toggle favorite", async () => {

        localStorage.setItem('favorites', JSON.stringify([mockHero]));

        renderContextTest();

        const button = screen.getByTestId("toggle-favorite");
        fireEvent.click(button);

        expect(screen.getByTestId("favorite-count").textContent).toBe('0');
        expect(screen.getByTestId("is-favorite").textContent).toBe('false');
        expect(screen.queryByTestId(`favorite-${mockHero.id}`)).toBeNull();

        const localStorageFavorites = localStorage.getItem('favorites');

        expect(localStorageFavorites).not.toContain(mockHero.id);
    });

})