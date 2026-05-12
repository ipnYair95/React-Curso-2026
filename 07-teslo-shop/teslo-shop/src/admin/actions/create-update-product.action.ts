/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Product } from "@/interfaces/product.interface";
import { tesloApi } from "@/api/teslo-api";
import { sleep } from "@/lib/sleep";

export const createUpdateProductAction = async (productLike: Partial<Product> & { files?: File[] }): Promise<Product> => {

    await sleep(2);

    const { id, user, category, images = [], files = [], ...rest } = productLike;

    const isCreating = id === 'new';

    rest.stock = Number(rest.stock || 0);
    rest.price = Number(rest.price || 0);

    // Prepara las imagenes

    if (files.length > 0) {

        const newImagesNames = await uploadFiles(files);

        images.push(...newImagesNames);

    }

    const imagesToSave = images.map(img=> {

        if(img.includes('http')){
            return img.split('/').pop() || '';
        }

        return img;
    });

    const { data } = await tesloApi<Product>({
        url: isCreating ? '/products' : `/products/${id}`,
        method: isCreating ? 'POST' : 'PATCH',
        data: {
            ...rest,
            images: imagesToSave
        }
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

interface FileUploadResponse {
    secureURl: string;
    fileName: string;
}

const uploadFiles = async (files: File[]) => {

    const uploadPromises = files.map(async (file) => {

        const formData = new FormData();

        formData.append('file', file);

        const { data } = await tesloApi<FileUploadResponse>({
            url: '/files/product',
            method: 'POST',
            data: formData
        });

        return data.fileName;

    });

    const fileNames = await Promise.all(uploadPromises);

    return fileNames;

}