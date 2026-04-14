import { useMemo, useRef, useState } from 'react'
import type { INormalizedGif } from '../interfaces/normalized-gif.interface';
import { getGifsByQuery } from '../actions/get-gifs-by-query.action';

//const gifsCache: Record<string, INormalizedGif[]> = {}; 

export const useGifs = () => {

    const [previousTerms, setPreviousTerms] = useState<string[]>([]);

    const [gifs, setGifs] = useState<INormalizedGif[]>([]);

    const gifsCacheRef = useRef<Record<string, INormalizedGif[]>>({});

    const handleTermClick = async (term: string) => {

        const isPresentInCache = gifsCacheRef.current[term];

        if (isPresentInCache) {
            setGifs(isPresentInCache);
            return;
        }

        const gifs = await getGifsByQuery(term);

        setGifs(gifs);

        gifsCacheRef.current[term] = gifs;

    }

    const handleSearch = async (query: string = '') => {

        const normalizedQuery = query.toLowerCase().trim();

        if (normalizedQuery.length === 0) {
            return;
        }

        const hasTerm = previousTerms.includes(normalizedQuery);

        if (hasTerm) {
            return;
        }

        const mergeTerms = [query, ...previousTerms].slice(0, 5);

        setPreviousTerms(mergeTerms);

        const gifs = await getGifsByQuery(query);

        setGifs(gifs);

        gifsCacheRef.current[normalizedQuery] = gifs;

    }

    const reverseTerms = useMemo(() => [...previousTerms].reverse(), [previousTerms]);

    return {
        gifs,
        reverseTerms,
        handleTermClick,
        handleSearch
    }

}
