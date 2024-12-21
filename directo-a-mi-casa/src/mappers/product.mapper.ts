import { Product } from '../app/domain/Product';

export const mapProduct = (data: Product): Product => ({
        id: data.id,
        title: data.title,
        // name: data.name,
        // description: data.description,
        price: data.price,
        thumbnail: data.thumbnail,
        category: data.category,
        discountPercentage: data.discountPercentage,
        // quantity: data.quantity || 0,
});