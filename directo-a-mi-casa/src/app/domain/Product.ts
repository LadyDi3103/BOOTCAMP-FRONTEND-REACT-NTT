export interface Product {
    id: number;
    title: string;
    name?: string;
    description: string;
    price: number;
    thumbnail: string;
    category: string;
    quantity?: number;
}

export type Products = Product[];