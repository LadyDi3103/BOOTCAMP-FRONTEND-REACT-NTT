import { Product } from "./Product";

export interface ProductPagination {
    limit: number;
    products: Array<Product>;
    skip: number;
    total: number;
  }