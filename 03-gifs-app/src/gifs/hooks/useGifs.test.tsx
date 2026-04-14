import { describe, expect, test, vi } from "vitest";
import { useGifs } from "./useGifs";
import { renderHook } from "@testing-library/react";
import { act } from "react";
import * as gifsActions from "../actions/get-gifs-by-query.action";




describe('useGifs', () => {

    test('should return default values and methods', () => {

        const { result } = renderHook(() => useGifs());

        expect(result.current).toEqual({
            gifs: [],
            reverseTerms: [],
            handleTermClick: expect.any(Function),
            handleSearch: expect.any(Function),
        });


    });

    test('should return a list of gifs', async () => {

        const { result } = renderHook(() => useGifs());

        await act(async () => {
            await result.current.handleSearch('goku');
        });

        expect(result.current.gifs.length).toBe(10);

    });

    test('should return a list of gifs when handle term click is called', async () => {

        const { result } = renderHook(() => useGifs());

        await act(async () => {
            await result.current.handleTermClick('goku');
        });

        expect(result.current.gifs.length).toBe(10);

    });

    test('should return list from cache', async () => {

        const { result } = renderHook(() => useGifs());

        await act(async () => {
            await result.current.handleSearch('goku');
        });

        expect(result.current.gifs.length).toBe(10);

        vi.spyOn(gifsActions, 'getGifsByQuery').mockRejectedValue(new Error('Bad request'));

        await act(async () => {
            await result.current.handleSearch('goku');
        });

        expect(result.current.gifs.length).toBe(10);

    })

    test('should return no more than 5 previous terms', async () => {

        const { result } = renderHook(() => useGifs());

        vi.spyOn(gifsActions, 'getGifsByQuery').mockResolvedValue([]);

        await act(async () => {
            await result.current.handleSearch('goku1');
        });

        await act(async () => {
            await result.current.handleSearch('goku2');
        });

        await act(async () => {
            await result.current.handleSearch('goku3');
        });

        await act(async () => {
            await result.current.handleSearch('goku4');
        });

        await act(async () => {
            await result.current.handleSearch('goku5');
        });

        await act(async () => {
            await result.current.handleSearch('goku6');
        });

        await act(async () => {
            await result.current.handleSearch('goku7');
        });

        await act(async () => {
            await result.current.handleSearch('goku8');
        });

        expect(result.current.reverseTerms.length).toBe(5);
        expect(result.current.reverseTerms).toStrictEqual(['goku4', 'goku5', 'goku6', 'goku7', 'goku8']);

    });

});