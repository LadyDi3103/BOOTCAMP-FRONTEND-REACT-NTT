import { ProductDetails } from "@/app/domain/ProductDetail";

export const mockEmptyProductDetail: ProductDetails = {
    id: 0,
    title: "Producto no encontrado",
    description: "",
    category: "",
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    tags: [],
    brand: "",
    sku: "",
    weight: 0,
    warrantyInformation: "",
    shippingInformation: "",
    availabilityStatus: "Unavailable",
    returnPolicy: "",
    minimumOrderQuantity: 0,
    reviews: [],
    images: [],
    thumbnail: "",
};
