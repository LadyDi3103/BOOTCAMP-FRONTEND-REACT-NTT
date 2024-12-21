import { ProductDetails } from "@/app/domain/ProductDetail";

export const mockProductDetails: ProductDetails[] = [
    {
        title: "Essence Mascara Lash Princess",
        description: "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects.",
        category: "beauty",
        price: 9.99,
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
        ]
    },
    {
        title: "Eyeshadow Palette with Mirror",
        description: "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for stunning looks.",
        category: "beauty",
        price: 19.99,
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
    },
];
