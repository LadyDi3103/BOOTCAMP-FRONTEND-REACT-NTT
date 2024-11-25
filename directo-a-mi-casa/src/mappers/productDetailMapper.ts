import { ProductDetails } from '../app/domain/ProductDetail';


export function mapProductDetail(data: ProductDetails): ProductDetails {
    return {
        id: data.id,
        title: data.title,
        description: data.description,
        category: data.category,
        price: data.price,
        discountPercentage: data.discountPercentage,
        rating: data.rating,
        stock: data.stock,
        tags: data.tags || [],
        brand: data.brand,
        sku: data.sku,
        weight: data.weight,
        reviews: data.reviews,
        warrantyInformation: data.warrantyInformation,
        shippingInformation: data.shippingInformation,
        availabilityStatus: data.availabilityStatus,
        returnPolicy: data.returnPolicy,
        minimumOrderQuantity: data.minimumOrderQuantity,
        images: data.images,
        thumbnail: data.thumbnail,
    };
}