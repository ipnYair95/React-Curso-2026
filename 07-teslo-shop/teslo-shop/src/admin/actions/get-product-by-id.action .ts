import { tesloApi } from "@/api/teslo-api";
import type { Product } from "@/interfaces/product.interface";

export const getProductByIdAction = async (productId: string): Promise<Product | null> => {

    if (!productId) {
        throw new Error("El ID del producto es requerido");
    }

    if (productId === 'new') {
        return {
            id: 'new',
            title: '',
            price: 0,
            description: '',
            slug: '',
            stock: 0,
            gender: 'men',
            images: [],
            sizes: [],
            category: '',
            tags: []
        } as Product;
    }

    const { data } = await tesloApi.get<Product>(`/products/${productId}`);

    const images = data.images.map(image => {

        if (image.includes('http')) {
            return image;
        }

        return `${import.meta.env.VITE_API_URL}/files/product/${image}`;

    })

    return {
        ...data,
        images
    }


}