import { mapProduct } from "@/mappers/productMapper";
import { Product } from "@/app/domain/Product";
import { allProductsResponseMock } from "../__mocks__/mock__AllProductsResponse";
import { ListCategoriesResponseMock } from "../__mocks__/mock__ListCategoriesResponse";
import { fetchAllCategories, fetchAllProducts, fetchFilteredProducts, fetchPaginatedProducts, fetchProductsByCategory, fetchSingleProduct, fetchSortedProducts } from "../fetchProducts";
import { categoryProductsResponseMock } from "../__mocks__/mock__CategoryProductsResponse";
import environment from "@/environments/environment";
import { mapProductDetail } from "@/mappers/productDetailMapper";
import { singleProductResponseMock } from "../__mocks__/mock__singleProductResponse";
import { paginatedProductsResponseMock } from "../__mocks__/mock__paginatedProductsResponseMock";
import { filteredProductsResponseMock } from "../__mocks__/mock__filteredProductsResponse";
import { sortedProductsAscResponseMock, sortedProductsDescResponseMock } from "../__mocks__/mock__sortedProductsResponse";


const mockFetch = (data: unknown, status = 200, ok = true): jest.Mock => {
  const fn = jest.fn().mockImplementationOnce(() => {
    const response = {
      ok,
      status,
      json: () => Promise.resolve(data),
      blob: () => Promise.resolve(data),
      clone: () => ({ ...response }),
      text: () => Promise.resolve(data),
    };
    return Promise.resolve(response);
  });

  global.fetch = fn;
  return fn;
};

jest.mock("../../../mappers/productDetailMapper", () => ({
  mapProductDetail: jest.fn(),
}));

jest.mock("../../../mappers/productMapper", () => ({
  mapProduct: jest.fn(),
}));

const originalConsoleError = console.error;

beforeEach(() => {
  global.fetch = jest.fn();
  console.error = jest.fn(); //silenciar console.error
});

afterEach(() => {
  jest.resetModules();
  global.fetch = fetch;
  console.error = originalConsoleError; //Restaurar console.error
})

describe("fetchProducts", () => {

  it("should return a JSON of products", async () => {
    (mapProduct as jest.Mock).mockImplementation((product: Product) => product)

    mockFetch({ products: allProductsResponseMock })

    const response = await fetchAllProducts();
    expect.assertions(4)
    expect(response).toBeDefined();
    expect(response.length).toBe(2);
    expect(response[0].title).toBe("Essence Mascara Lash Princess");
    expect(response[1].title).toBe("Eyeshadow Palette with Mirror");
  });

  it("should return a list of products by category", async () => {
    mockFetch(ListCategoriesResponseMock)
    const response = await fetchAllCategories();

    expect.assertions(3)
    expect(response).toBeDefined();
    expect(response).toEqual(ListCategoriesResponseMock);
    expect(response[1]).toBe("fragrances");
  });

  it("should return a JSON with products by category", async () => {
    (mapProduct as jest.Mock).mockImplementation((product: Product) => product);

    mockFetch(categoryProductsResponseMock[0])

    const response = await fetchProductsByCategory("smartphones");

    expect.assertions(4)
    expect(response).toBeDefined();
    expect(response.length).toBe(categoryProductsResponseMock[0].products.length);
    expect(response[0].title).toBe("iPhone 5s");
    const expectedURL = `${environment.API_BASE_URL}${environment.SINGLE_CATEGORY_ENDPOINT}smartphones`;
    expect(fetch).toHaveBeenCalledWith(expectedURL);
  });

  it("should return a single product", async () => {
    (mapProductDetail as jest.Mock).mockImplementation((product: Product) => product);
    mockFetch(singleProductResponseMock[0])

    expect.assertions(5);
    const response = await fetchSingleProduct(1);

    expect(response).toBeDefined();
    expect(response).toEqual(singleProductResponseMock[0]);
    expect(response.title).toEqual("Essence Mascara Lash Princess");
    expect(fetch).toHaveBeenCalledWith(
      `${environment.API_BASE_URL}${environment.SINGLE_PRODUCT_ENDPOINT}/1`
    );
    expect(mapProductDetail).toHaveBeenCalledWith(singleProductResponseMock[0]);
  })

  it("should return paginated products when called with limit and skip", async () => {
    mockFetch(paginatedProductsResponseMock);

    const response = await fetchPaginatedProducts(2, 10);

    expect.assertions(4);
    expect(response).toBeDefined();
    expect(response.length).toBe(2);
    expect(response).toEqual(paginatedProductsResponseMock.products);
    expect(fetch).toHaveBeenCalledWith(
      `${environment.API_BASE_URL}${environment.PRODUCTS_ENDPOINT}?limit=2&skip=10`
    );
  });

  it("should return filtered products when searching for 'calvin klein CK One'", async () => {
    mockFetch(filteredProductsResponseMock);

    const response = await fetchFilteredProducts(1, 0, "calvin klein CK One");

    expect.assertions(3);
    expect(response).toBeDefined();
    expect(response).toEqual(filteredProductsResponseMock.products);
    expect(fetch).toHaveBeenCalledWith(
      `${environment.API_BASE_URL}${environment.PRODUCTS_ENDPOINT}?limit=1&skip=0&select=calvin klein CK One`
    );
  });

  it("should return sorted products in ascending order", async () => {
    mockFetch(sortedProductsAscResponseMock);

    const response = await fetchSortedProducts("title", "asc");

    expect.assertions(4);
    expect(response).toBeDefined();
    expect(response.length).toBe(1);
    expect(response[0].title).toBe("300 Touring");
    expect(fetch).toHaveBeenCalledWith(
      `${environment.API_BASE_URL}${environment.PRODUCTS_ENDPOINT}?sortBy=title&order=asc`
    );
  });

  it("should return sorted products in descending order", async () => {
    mockFetch(sortedProductsDescResponseMock);

    const response = await fetchSortedProducts("title", "desc");

    expect.assertions(4);
    expect(response).toBeDefined();
    expect(response.length).toBe(1);
    expect(response[0].title).toBe("Calvin Klein CK One");
    expect(fetch).toHaveBeenCalledWith(
      `${environment.API_BASE_URL}${environment.PRODUCTS_ENDPOINT}?sortBy=title&order=desc`
    );
  });


  it.each([
    () => fetchAllProducts(), 
    () => fetchAllCategories(), 
    () => fetchProductsByCategory("smartphones"),
    () => fetchSingleProduct(1),
    () => fetchPaginatedProducts(2, 10),
    () => fetchFilteredProducts(1, 0, "calvin klein CK One"),
    () => fetchSortedProducts("title", "asc"),
  ])(
    "should get services with error",
    async (request) => {
      global.fetch = jest.fn().mockRejectedValueOnce(new Error());
      mockFetch({}, 404, false);

      try {
        await request();
      } catch (error) {
        expect(error).toBeDefined();
        expect(error).toBeInstanceOf(Error);
      }
    }
  );

});
