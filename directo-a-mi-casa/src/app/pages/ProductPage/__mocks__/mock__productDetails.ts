import { ProductDetails } from "@/app/domain/ProductDetail";

export const mockProductDetails: ProductDetails[] = [
    {
        id: 1,
        title: "Essence Mascara Lash Princess",
        description: "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects.",
        category: "beauty",
        price: 9.99,
        discountPercentage: 7.17,
        rating: 4.94,
        stock: 5,
        tags: ["beauty", "mascara"],
        brand: "Essence",
        sku: "RCH45Q1A",
        weight: 2,
        warrantyInformation: "1 month warranty",
        shippingInformation: "Ships in 1 month",
        availabilityStatus: "Low Stock",
        returnPolicy: "30 days return policy",
        minimumOrderQuantity: 24,
        reviews: [
            {
                rating: 5,
                comment: "Very satisfied!",
                date: "2024-05-23T08:56:21.618Z",
                reviewerName: "Scarlett Wright",
                reviewerEmail: "scarlett.wright@x.dummyjson.com",
            },
        ],
        images: [
            "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png",
        ],
        thumbnail:
            "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
    },
    {
        id: 2,
        title: "Eyeshadow Palette with Mirror",
        description: "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for stunning looks.",
        category: "beauty",
        price: 19.99,
        discountPercentage: 5.5,
        rating: 3.28,
        stock: 44,
        tags: ["beauty", "eyeshadow"],
        brand: "Glamour Beauty",
        sku: "MVCFH27F",
        weight: 3,
        warrantyInformation: "1 year warranty",
        shippingInformation: "Ships in 2 weeks",
        availabilityStatus: "In Stock",
        returnPolicy: "30 days return policy",
        minimumOrderQuantity: 32,
        reviews: [
            {
                rating: 4,
                comment: "Highly impressed!",
                date: "2024-05-23T08:56:21.618Z",
                reviewerName: "Elena Baker",
                reviewerEmail: "elena.baker@x.dummyjson.com",
            },
        ],
        images: [
            "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/1.png",
        ],
        thumbnail:
            "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png",
    },
];
