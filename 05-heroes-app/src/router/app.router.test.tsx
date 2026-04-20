import { describe, expect, test, vi } from "vitest"
import { appRouter } from "./app.router"
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, Outlet, RouterProvider, useParams } from "react-router";

vi.mock('@/heroes/pages/home/HomePage', () => ({
    HomePage: () => <h1 data-testid="HomePageId">HomePage</h1>
}));

vi.mock('@/heroes/pages/hero/HeroPage', () => ({
    HeroPage: () => {

        const { idSlug = '' } = useParams();

        return (
            <h1 data-testid="HeroPageId">{idSlug}</h1>
        );
    }
}));

vi.mock('@/heroes/pages/search/SearchPage', () => ({
    default: () => <h1 data-testid="SearchPageId">SearchPage</h1>
}));

vi.mock('@/heroes/layouts/HeroesLayout', () => ({
    HeroesLayout: () => <div data-testid="HeroesLayoutId"><Outlet /></div>
}));

describe("appRouter", () => {

    test("should be configure as expected", () => {

        expect(appRouter.routes).toMatchSnapshot();

    })

    test("should render home page at the root", () => {

        const router = createMemoryRouter(appRouter.routes, {
            initialEntries: ["/"]
        });

        render(
            <RouterProvider router={router} />
        )

        const homePage = screen.getByTestId("HomePageId");

        expect(homePage).toBeDefined();

    });

    test("should render hero page at /heroes/:idSlug path", () => {

        const router = createMemoryRouter(appRouter.routes, {
            initialEntries: ["/heroes/batman"]
        });

        render(
            <RouterProvider router={router} />
        )

        const heroPage = screen.queryByText("batman");

        expect(heroPage).toBeDefined();

    });

    test("should render hero page at /search path", async () => {

        const router = createMemoryRouter(appRouter.routes, {
            initialEntries: ["/search"]
        });

        render(
            <RouterProvider router={router} />
        )

        const searchPage = await screen.findByTestId("SearchPageId");

        expect(searchPage).toBeDefined();

    });

    test("should redirect to home page when not found", async () => {

        const router = createMemoryRouter(appRouter.routes, {
            initialEntries: ["/unknown"]
        });

        render(
            <RouterProvider router={router} />
        )

        const homePage = await screen.findByTestId("HomePageId");

        expect(homePage).toBeDefined();

    });

})