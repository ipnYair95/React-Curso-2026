import { tesloApi } from "@/api/teslo-api"
import type { IProductsResponse } from "@/interfaces/products.response";

interface Options {
    limit?: number | string;
    offset?: number | string;
    gender?: string;
    sizes?: string;
    minPrice?: number | string;
    maxPrice?: number | string;
    query?: string;
}

export const getProductsAction = async (options: Options): Promise<IProductsResponse> => {

    const { limit = 10, offset = 0, gender = '', sizes = '', minPrice, maxPrice, query } = options;

    const { data } = await tesloApi.get<IProductsResponse>('/products', {
        params: {
            limit,
            offset,
            gender,
            sizes,
            minPrice,
            maxPrice,
            q: query
        }
    });

    const productsWithImageUrl = data.products.map(product => ({
        ...product,
        images: product.images.map(image => `${import.meta.env.VITE_API_URL}/files/product/${image}`)
    }));

    return {
        ...data,
        products: productsWithImageUrl,
    };

}