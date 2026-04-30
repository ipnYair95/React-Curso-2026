import { useQuery } from "@tanstack/react-query"
import { getProductsAction } from "../actions/get-products.action"
import { useParams, useSearchParams } from "react-router"

export const useProducts = () => {

    const [searchParams] = useSearchParams();
    const { gender } = useParams();

    const limit = searchParams.get('limit') || '10';
    const page = searchParams.get('page') || '1';
    const sizes = searchParams.get('sizes') || undefined;
    const query = searchParams.get('query') || undefined;

    const offset = (+page - 1) * +limit;

    const rangePrice = searchParams.get('price') || 'any';

    const parsePriceRange = (): { minPrice?: number, maxPrice?: number } => {

        if (rangePrice === 'any') return { minPrice: undefined, maxPrice: undefined };

        if (rangePrice === '200+') {
            return { minPrice: 200, maxPrice: undefined };
        }

        const [min, max] = rangePrice.split('-').map(Number);

        if (isNaN(min) || isNaN(max)) {
            return { minPrice: undefined, maxPrice: undefined };
        }

        return {
            minPrice: min,
            maxPrice: max
        }

    }

    const { minPrice, maxPrice } = parsePriceRange()

    return useQuery({
        queryKey: ['products', {
            limit,
            page,
            sizes,
            gender,
            minPrice,
            maxPrice,
            query
        }],
        queryFn: () => getProductsAction({
            limit: isNaN(+limit) ? 10 : limit,
            offset: isNaN(offset) ? 0 : offset,
            gender,
            sizes,
            minPrice: isNaN(+minPrice!) ? undefined : minPrice,
            maxPrice: isNaN(+maxPrice!) ? undefined : maxPrice,
            query
        }),
        staleTime: 1000 * 60 * 5,
    })

}
