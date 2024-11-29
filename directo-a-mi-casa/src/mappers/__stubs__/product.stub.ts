import { mapProduct } from "../product.mapper";
import { productMapperMock } from "../__mocks__/mock_product.mapper";


export const productStub = mapProduct(productMapperMock);