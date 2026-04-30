import type { Product } from "./product.interface";

export interface IProductsResponse {
    count: number;
    pages: number;
    products: Product[];
}