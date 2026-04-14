import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { MyCounterApp } from "./MyCounterApp";

const handleAddMock = vi.fn();
const handleSubtractMock = vi.fn();
const handleResetMock = vi.fn();

vi.mock('../hooks/useCounter', () => ({
    useCounter: () => ({
        counter: 20,
        handleAdd: handleAddMock,
        handleSubtract: handleSubtractMock,
        handleReset: handleResetMock
    })
}))

describe('MyCounterApp.test', () => {

    test('should render', () => {

        render(
            <MyCounterApp />
        );

        expect(screen.getByRole('heading', { level: 1 }).innerHTML).toContain('Counter: 20');

    });

    test('should call handleAdd', () => {

        render(
            <MyCounterApp />
        );

        const buttonAdd = screen.getByRole('button', { name: '+1' });

        fireEvent.click(buttonAdd);

        expect(handleAddMock).toHaveBeenCalledTimes(1);
        expect(handleResetMock).toHaveBeenCalledTimes(0);
        expect(handleSubtractMock).toHaveBeenCalledTimes(0);

    });


});