/* eslint-disable @typescript-eslint/no-explicit-any */
import { afterEach, describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { FirstStepsApp } from "./FirstStepsApp";

const mockItemCounter = vi.fn( (props: any) => {

    return <div data-testid="itemCounterId" />

});

vi.mock('./shooping-cart/ItemCounter', () => ({
    ItemCounter: (props: any) => mockItemCounter(props)
}));

describe('FirstStepsApp', () => {

    afterEach(() => {
        vi.clearAllMocks();
    })

    test('should render firstName and lastName', () => {

        const { container } = render(<FirstStepsApp />);

        const h1 = container.querySelector('h1');
        const h3 = container.querySelector('h3');

        expect(h1?.innerHTML).toContain('Yair');
        expect(h3?.innerHTML).toContain('Marin');

    });

    test('should render firstName and lastName', () => {

        render(<FirstStepsApp />);

        const h1 = screen.getByTestId('firstNameId');

        expect(h1.innerHTML).toContain('Yair');      

    });

    test('should match snapshot', () => {

        const { container } = render(<FirstStepsApp />);

        expect(container).toMatchSnapshot();

    })

    test('should match snapshot', () => {

        render(<FirstStepsApp />);

        const snapshot = screen.getByTestId('firstStepsApp');

        expect(snapshot).toMatchSnapshot();

    });

    test('should render the correct number of item counter components', () => {

        render(<FirstStepsApp />);

        const itemCounter = screen.getAllByTestId('itemCounterId');

        expect(itemCounter.length).toBe(3);

    });

    test('should render item counter with correct props', () => {

        render(<FirstStepsApp />);

        expect(mockItemCounter).toHaveBeenCalledTimes(3);
        expect(mockItemCounter).toHaveBeenCalledWith({ name: 'Nintendo Switch 2', quantity: 1 });
        expect(mockItemCounter).toHaveBeenCalledWith({ name: 'Console', quantity: 2 });
        expect(mockItemCounter).toHaveBeenCalledWith({ name: 'Super Smash Bros', quantity: 3 });

    });


});