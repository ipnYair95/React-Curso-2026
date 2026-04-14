import { describe, expect, test } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useCounter } from "./useCounter"; 

describe('useCounter.test', () => {

    test('should initialize with default value', () => {

        const { result } = renderHook(() => useCounter());

        expect(result.current.counter).toBe(5);

    });

    test('should initialize with value 20', () => {

        const { result } = renderHook(() => useCounter(20));

        expect(result.current.counter).toBe(20);

    });

    describe('handleAdd', () => {

        test('should increment counter', () => {

            const { result } = renderHook(() => useCounter());

            act(() => {
                result.current.handleAdd();
            });

            expect(result.current.counter).toBe(6);

        });
        
    });

    describe('handleSubtract', () => {

        test('should decrement counter', () => {

            const { result } = renderHook(() => useCounter());

            act(() => {
                result.current.handleSubtract();
            });

            expect(result.current.counter).toBe(4);

        })

    });

    describe('handleReset', () => {

        test('should reset counter', () => {

            const { result } = renderHook(() => useCounter());

            act(() => {
                result.current.handleAdd();
            });

            expect(result.current.counter).toBe(6);

            act(() => {
                result.current.handleReset();
            });

            expect(result.current.counter).toBe(5);

        })

    });

});