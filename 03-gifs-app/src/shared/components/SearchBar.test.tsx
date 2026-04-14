import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { SearchBar } from "./SearchBar";

describe('SearchBar', () => {

    test('should render', () => {

        const { container } = render(
            <SearchBar onQuery={() => ({})} placeholder="Buscar" />
        );

        expect(container).toMatchSnapshot();

    });

    test('should call on query after 700ms', async () => {

        const onQuerySpy = vi.fn();

         render(
            <SearchBar onQuery={onQuerySpy} placeholder="Buscar" />
        );

        const input = screen.queryByRole('textbox');
        fireEvent.change(input!, { target: { value: 'Goku' } });

        await waitFor(() => {
            expect(onQuerySpy).toHaveBeenCalledTimes(1);
            expect(onQuerySpy).toHaveBeenCalledWith('Goku');
        });

    });

    test('should call only once with the last value', async () => {

        const onQuerySpy = vi.fn();

         render(
            <SearchBar onQuery={onQuerySpy} placeholder="Buscar" />
        );

        const input = screen.queryByRole('textbox');
        fireEvent.change(input!, { target: { value: 't' } });
        fireEvent.change(input!, { target: { value: 'te' } });
        fireEvent.change(input!, { target: { value: 'tes' } });
        fireEvent.change(input!, { target: { value: 'test' } });

        await waitFor(() => {
            expect(onQuerySpy).toHaveBeenCalledTimes(1);
            expect(onQuerySpy).toHaveBeenCalledWith('test');
        });

    });

    test('should call on query when clicked', async () => {

        const onQuerySpy = vi.fn();

         render(
            <SearchBar onQuery={onQuerySpy} placeholder="Buscar" />
        );

        const input = screen.queryByRole('textbox');
        fireEvent.change(input!, { target: { value: 'Goku' } });

        const button = screen.queryByRole('button');
        fireEvent.click(button!);

        await waitFor(() => {
            expect(onQuerySpy).toHaveBeenCalledTimes(1);
            expect(onQuerySpy).toHaveBeenCalledWith('Goku');
        });


    });

    test('should placeholder', () => {

        render(
            <SearchBar onQuery={() => ({})} placeholder="Buscar gifs" />
        );

        expect(screen.queryByPlaceholderText('Buscar gifs')).toBeTruthy();        

    });


});