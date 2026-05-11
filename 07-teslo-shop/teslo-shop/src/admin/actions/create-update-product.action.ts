/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Product } from "@/interfaces/product.interface";
import { tesloApi } from "@/api/teslo-api";
import { sleep } from "@/lib/sleep";

export const createUpdateProductAction = async (productLike: Partial<Product>): Promise<Product> => {

    await sleep(2);

    const { id, user, category, images = [], ...rest } = productLike;

    const isCreating = id === 'new';

    rest.stock = Number(rest.stock || 0);
    rest.price = Number(rest.price || 0);

    const { data } = await tesloApi<Product>({
        url: isCreating ? '/products' : `/products/${id}`,
        method: isCreating ? 'POST' : 'PATCH',
        data: rest
    })

    return {
        ...data,
        images: data.images.map((img: string) => {

            if (img.includes('https')) {
                return img;
            }

            return `${import.meta.env.VITE_API_URL}/files/product/${img}`;

        })
    }

}