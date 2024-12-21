import { render, screen, waitFor } from '@testing-library/react';
import { usePagination } from '../usePagination';
import { fetchPaginatedProducts } from '@/app/services/products/fetchProducts';
import { paginatedProductsResponseMock } from '@/app/services/products/__mocks__/mock__paginatedProductsResponseMock';

jest.mock('@/app/services/products/fetchProducts', () => ({
  fetchPaginatedProducts: jest.fn(),
}));

const TestComponent = () => {
  const { items, loading, currentPage, totalPages } = usePagination(5);

  return (
    <div>
      <div data-testid="items">{JSON.stringify(items)}</div>
      <div data-testid="loading">{loading.toString()}</div>
      <div data-testid="currentPage">{currentPage}</div>
      <div data-testid="totalPages">{totalPages}</div>
    </div>
  );
};

describe('usePagination Hook', () => {
  const mockFetchPaginatedProducts = fetchPaginatedProducts as jest.MockedFunction<typeof fetchPaginatedProducts>;

  beforeEach(() => {
    mockFetchPaginatedProducts.mockReset();
  });

  test('should initialize with default values', async () => {
    mockFetchPaginatedProducts.mockResolvedValueOnce({
      products: [],
      total: 50,
      skip: 0,
      limit: 5,
    });

    render(<TestComponent />);

    expect(screen.getByTestId('items').textContent).toBe('[]');
    expect(screen.getByTestId('loading').textContent).toBe('true');
    expect(screen.getByTestId('currentPage').textContent).toBe('1');
    expect(screen.getByTestId('totalPages').textContent).toBe('1');

    await waitFor(() => {
      expect(screen.getByTestId('loading').textContent).toBe('false');
    });
  });

  test('should fetch and display paginated products', async () => {
    mockFetchPaginatedProducts.mockResolvedValueOnce(paginatedProductsResponseMock);

    render(<TestComponent />);

    await waitFor(() => {
      expect(screen.getByTestId('items').textContent).toBe(JSON.stringify(paginatedProductsResponseMock.products));
      expect(screen.getByTestId('loading').textContent).toBe('false');
      expect(screen.getByTestId('currentPage').textContent).toBe('1');
      expect(screen.getByTestId('totalPages').textContent).toBe(
        Math.ceil(paginatedProductsResponseMock.total / 5).toString()
      );
    });
  });
});
