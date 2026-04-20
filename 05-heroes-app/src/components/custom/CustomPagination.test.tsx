import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, test, vi } from "vitest"
import { CustomPagination } from "./CustomPagination";
import { MemoryRouter } from "react-router";
import type { PropsWithChildren } from "react";

vi.mock('../ui/button.tsx', () => ({
    Button: ({ children, ...props }: PropsWithChildren) => (
        <button {...props}>
            {children}
        </button>
    )
}))

const renderWithRouter = (component: React.ReactElement, initialEntries = ['/']) => {

    return render(
        <MemoryRouter initialEntries={initialEntries}>
            {component}
        </MemoryRouter>
    );

}

describe("CustomPagination", () => {

    test("should render component with default values", () => {

        renderWithRouter(
            <CustomPagination totalPages={5} />
        );

        expect(screen.getByText("Anteriores")).toBeDefined();
        expect(screen.getByText("Siguientes")).toBeDefined();

        expect(screen.getByText("1")).toBeDefined();
        expect(screen.getByText("2")).toBeDefined();
        expect(screen.getByText("3")).toBeDefined();
        expect(screen.getByText("4")).toBeDefined();
        expect(screen.getByText("5")).toBeDefined();

    })

    test("should disable previous button when page is 1", () => {

        renderWithRouter(
            <CustomPagination totalPages={5} />
        );

        const previousBtn = screen.getByText("Anteriores");

        expect(previousBtn.getAttributeNames()).toContain("disabled");

    });

    test("should disabled next button when page is last", () => {

        renderWithRouter(
            <CustomPagination totalPages={5} />,
            ['/?page=5']
        );

        const previousBtn = screen.getByText("Siguientes");

        expect(previousBtn.getAttributeNames()).toContain("disabled");

    });

    test("should active button 3 when page is 3", () => {

        renderWithRouter(
            <CustomPagination totalPages={5} />,
            ['/?page=3']
        );

        const twoBtn = screen.getByText("2");
        const threeBtn = screen.getByText("3");

        expect(twoBtn.getAttribute('variant')).toBe('outline');
        expect(threeBtn.getAttribute('variant')).toBe('default');

    });

    test("should change page when click on button", () => {

        renderWithRouter(
            <CustomPagination totalPages={10} />,
            ['/?page=3']
        );

        const twoBtn = screen.getByText("2");
        const threeBtn = screen.getByText("3");

        expect(twoBtn.getAttribute('variant')).toBe('outline');
        expect(threeBtn.getAttribute('variant')).toBe('default');

        fireEvent.click(twoBtn);

        expect(twoBtn.getAttribute('variant')).toBe('default');
        expect(threeBtn.getAttribute('variant')).toBe('outline');

    });

})