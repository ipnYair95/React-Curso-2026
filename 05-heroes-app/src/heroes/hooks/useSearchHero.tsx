import { useQuery } from "@tanstack/react-query"
import { searchHeroAction, type Options } from "../actions/search-hero.action";


export const useSearchHero = (options: Options) => {


    return useQuery({
        queryKey: ['search-hero', { ...options }],
        queryFn: () => searchHeroAction(options),
        staleTime: 1000 * 60 * 5,
        retry: false
    });

}
