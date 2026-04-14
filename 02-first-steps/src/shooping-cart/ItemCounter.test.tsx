import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { ItemCounter } from "./ItemCounter";

describe('Name of the group', () => {

    test('render with default props', () => {

        const name = 'test item';

        render(<ItemCounter name='test item' />);

        expect(screen.getByText(name)).toBeTruthy();

    });

    test('render custom quantity', () => {

        const name = 'test item';
        const quantity = 5;

        render(<ItemCounter name={name} quantity={quantity} />);

        expect(screen.getByText(name)).toBeTruthy();
        expect(screen.getByText(quantity)).toBeTruthy();

    });

    test('should increase count then +1 button is clicked', () => {

        render(<ItemCounter name='test item' />);

        const [addBtn] = screen.getAllByRole('button');

        fireEvent.click(addBtn);

        expect(screen.getByText('2')).toBeTruthy();

    });

    test('should decrease count then -1 button is clicked', () => {

        render(<ItemCounter name='test item' quantity={2} />);

        const [, subtractBtn] = screen.getAllByRole('button');

        fireEvent.click(subtractBtn);

        expect(screen.getByText('1')).toBeTruthy();

    });

    test('should not decrease count below 1', () => {

        render(<ItemCounter name='test item' quantity={1} />);

        const [, subtractBtn] = screen.getAllByRole('button');

        fireEvent.click(subtractBtn);

        expect(screen.getByText('1')).toBeTruthy();

    });

    test('should change to red when count is 1', () => {

        const quantity = 1;
        const name = 'test item';

        render(<ItemCounter name={name} quantity={quantity} />);

        const itemText = screen.getByText(name);

        expect(itemText.style.color).toBe('red');

    });

    test('should change to blue when count is greater than 1', () => {

        const quantity = 2;
        const name = 'test item';

        render(<ItemCounter name={name} quantity={quantity} />);

        const itemText = screen.getByText(name);

        expect(itemText.style.color).toBe('blue');

    });


});