import { mockProducts } from "../__mocks__/mock_product";
import { filterProducts, getTopNLowestPricedProducts } from "../helpers";

describe.skip("Helper Functions", () => {
    describe("filterProducts", () => {
        it("should return all products if query is empty", () => {
            const result = filterProducts(mockProducts, "");
            expect(result).toEqual(mockProducts);
        });

        it("should return products that match the query", () => {
            const result = filterProducts(mockProducts, "mascara");
            expect(result).toEqual([
                {
                    id: 1,
                    title: "Essence Mascara Lash Princess",
                    price: 9.99,
                    thumbnail:
                        "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
                    category: "beauty",
                },
            ]);
        });

        it("should return an empty array if no products match the query", () => {
            const result = filterProducts(mockProducts, "tablet");
            expect(result).toEqual([]);
        });

        it("should be case-insensitive", () => {
            const result = filterProducts(mockProducts, "MASCARA");
            expect(result).toEqual([
                {
                    id: 1,
                    title: "Essence Mascara Lash Princess",
                    price: 9.99,
                    thumbnail:
                        "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
                    category: "beauty",
                },
            ]);
        });
    });

    describe("getTopNLowestPricedProducts", () => {
        it("should return an empty array if the products array is empty", () => {
            const result = getTopNLowestPricedProducts([], 3);
            expect(result).toEqual([]);
        });

        it("should return an empty array if n is 0", () => {
            const result = getTopNLowestPricedProducts(mockProducts, 0);
            expect(result).toEqual([]);
        });

        it("should return the top N products with the lowest prices", () => {
            const result = getTopNLowestPricedProducts(mockProducts, 3);
            expect(result).toEqual([
                {
                    id: 5,
                    title: "Red Nail Polish",
                    price: 8.99,
                    thumbnail:
                        "https://cdn.dummyjson.com/products/images/beauty/Red%20Nail%20Polish/thumbnail.png",
                    category: "beauty",
                },
                {
                    id: 1,
                    title: "Essence Mascara Lash Princess",
                    price: 9.99,
                    thumbnail:
                        "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
                    category: "beauty",
                },
                {
                    id: 4,
                    title: "Red Lipstick",
                    price: 12.99,
                    thumbnail:
                        "https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/thumbnail.png",
                    category: "beauty",
                },
            ]);
        });

        it("should return all products if n is greater than the number of products", () => {
            const result = getTopNLowestPricedProducts(mockProducts, 15);
            expect(result).toEqual(
                mockProducts.sort((a, b) => a.price - b.price).slice(0, 15)
            );
        });

        it("should not mutate the original array", () => {
            const originalProducts = [...mockProducts];
            getTopNLowestPricedProducts(mockProducts, 3);
            expect(mockProducts).toEqual(originalProducts);
        });
    });
});
