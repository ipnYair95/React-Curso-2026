import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, test } from "vitest"
import { SearchControls } from "./SearchControls";
import { MemoryRouter } from "react-router";

if( typeof window.ResizeObserver === 'undefined'  ){

    class ResizeObserver {
        observe() { }
        unobserve() { }
        disconnect() { }
    }

    window.ResizeObserver = ResizeObserver

}

const renderSearchControls = (initialEntries: string[] = ['/']) => {


    return (
        render(
            <MemoryRouter initialEntries={initialEntries}>
                <SearchControls />
            </MemoryRouter>
        )
    );

}

describe("SearchControls", () => {

    test("should render search controls with default values", () => {

        const { container } = renderSearchControls(); 

        expect(container).toMatchSnapshot();

    })

    test("should render search controls with query params", () => {

        renderSearchControls(['/?name=batman']);

        const input = screen.getByPlaceholderText('Search heroes, villains, powers, teams...');

        expect(input.getAttribute('value')).toBe('batman');

    });

     test("should change params when input is pressed enter", () => {

        renderSearchControls(['/?name=batman']);

        const input = screen.getByPlaceholderText('Search heroes, villains, powers, teams...');

        expect(input.getAttribute('value')).toBe('batman');

        fireEvent.change(input, {
            target: {
                value: 'superman'
            }
        })

        fireEvent.keyDown(input, {
            key: 'Enter'
        })

    });

    test("should change params strength when slider changed", () => {

        renderSearchControls(['/?name=batman&active-accordion=advance-filters']);

        const slider = screen.getByRole('slider');

        expect(slider.getAttribute('aria-valuenow')).toBe('0');

        fireEvent.keyDown(slider, {
            key: 'ArrowRight'
        })

        expect(slider.getAttribute('aria-valuenow')).toBe('1');

    });

    test("should accordion be open when active-accordion query param is set", () => {

        renderSearchControls(['/?name=batman&active-accordion=advance-filters']);

        const accordion = screen.getByTestId('accordion');

        const accordionItem = accordion.querySelector('div');

        expect(accordionItem?.getAttribute('data-state')).toBe('open');

    });

     test("should accordion be open when active-accordion query param is not set", () => {

        renderSearchControls(['/?name=batman']);

        const accordion = screen.getByTestId('accordion');

        const accordionItem = accordion.querySelector('div');

        expect(accordionItem?.getAttribute('data-state')).toBe('closed');

    });

})