import { describe, expect, test } from "vitest";
import { add, multiply, subtract } from "./math.helper";

describe('Math helper', () => {

    describe('add', () => {

        test('should add two numbers', () => {

            const result = add(1, 1);

            expect(result).toBe(2);

        })

    })

    describe('subtract', () => {

        test('should subtract two numbers', () => {

            const result = subtract(1, 1);

            expect(result).toBe(0);

        });

        test('should subtract two numbers negative', () => {

            const result = subtract(-2, -1);

            expect(result).toBe(-1);

        });


    });

    describe('multiply', () => {

        test('should multiply two numbers', () => {

            const result = multiply(1, 2);

            expect(result).toBe(2);

        });

    });

    describe('divide', () => {

        test('should divide two numbers', () => {

            const result = divide(1, 2);

            expect(result).toBe(0.5);

        });

    });


})
