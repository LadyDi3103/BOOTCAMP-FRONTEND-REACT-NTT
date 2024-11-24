import { Product } from '../app/domain/Product';

export function mapProduct(data: Product): Product {
    return {
        id: data.id,
        title: data.title,
        name: data.name,
        description: data.description,
        price: data.price,
        thumbnail: data.thumbnail,
        category: data.category,
        quantity: data.quantity || 0,
    };
}