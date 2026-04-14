import { describe, expect, test } from "vitest";
import { CustomHeader } from "./CustomHeader"; 
import { render, screen } from "@testing-library/react";

describe('CustomHeader.test', () => {

    test('should render title', () => {

        render(
            <CustomHeader title="Buscador de gifs" />
        );

        expect(screen.getByText('Buscador de gifs')).toBeTruthy();

    });

    test('should render description', () => {

        render(
            <CustomHeader title="Buscador de gifs" description="Encuentra los mejores gifs" />
        );

        expect(screen.getByText('Encuentra los mejores gifs')).toBeTruthy();
        expect(screen.getByRole('paragraph')).toBeTruthy();
        expect(screen.getByRole('paragraph').innerHTML).toBe('Encuentra los mejores gifs');

    });

    test('should not render description if not provided', () => {

        render(
            <CustomHeader title="Buscador de gifs" />
        );

        const description = screen.queryByRole('paragraph');

        expect(description).toBeNull();

    });   

});