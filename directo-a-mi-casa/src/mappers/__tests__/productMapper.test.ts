import { productMapperMock } from "../__mocks__/mock_product.mapper"
import { productStub } from "../__stubs__/product.stub";
import { mapProduct } from "../product.mapper"

describe("ProductMapper", () => {

    test("Should Map a Product to a MappedProduct", () => {
        const result = mapProduct(productMapperMock);
        expect(result).toEqual(productStub);
    });
});