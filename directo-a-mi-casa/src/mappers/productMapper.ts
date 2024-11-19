import { Product } from '../types/Product';

export function mapProduct(data: any): Product {
    return {
        id: data.id,
        title: data.title,
        description: data.description,
        price: data.price,
        thumbnail: data.thumbnail,
        category: data.category,
    };
}