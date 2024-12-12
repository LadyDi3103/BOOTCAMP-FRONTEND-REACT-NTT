// falta test
import { Product } from "@/app/domain/Product";
import { fetchPaginatedProducts } from "@/app/services/products/fetchProducts";
import { useEffect, useState } from "react";

export const usePagination = (pageCount: number) => {
  const [items, setItems] = useState<Array<Product>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const requestPage = async (requestedPage: number, count: number) => {
    setLoading(true);
    const results = await fetchPaginatedProducts(
      count,
      (requestedPage - 1) * count
    );
    setLoading(false);
    setItems(results.products);
    setCurrentPage(requestedPage);
    setTotalPages(Math.ceil(results.total / count));
  };

  useEffect(() => {
    requestPage(1, pageCount);
  }, []);

  return { requestPage, items, currentPage, totalPages, loading };
};
