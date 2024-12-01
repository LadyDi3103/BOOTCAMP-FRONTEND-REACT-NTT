import { render, RenderResult, screen, waitFor } from "@testing-library/react";
import Init from "../Init";
import { useProducts } from "@/app/context/ProductContext";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { act } from "react";
import { CartProvider } from "@/app/context/CartContext";
import { mockProductsInit } from "../__mocks__/mock_init";

jest.mock("@/shared/components/CategoryTitleBar/CategoryTitleBar", () => () => {
  return <div>Mocked CategoryTitleBar</div>;
});

jest.mock("@/utils/navigate/navigationHelpers", () => ({
  usePageNavigation: jest.fn(() => ({
    closePage: jest.fn(),
    goToHome: jest.fn(),
  })),
}));

jest.mock("@/app/context/ProductContext", () => ({
  useProducts: jest.fn(),
}));

const renderComponent = async (): Promise<RenderResult> => {
  const component = await act(async () =>
    render(
      <CartProvider>
        <MemoryRouter initialEntries={["/todos-los-productos"]}>
          <Routes>
            <Route path="/todos-los-productos" element={<Init />} />
          </Routes>
        </MemoryRouter>
      </CartProvider>
    )
  );
  return component;
};

beforeEach(() => {
  jest.clearAllMocks();
  (useProducts as jest.Mock).mockImplementation(() => {
    const mockState = {
      state: {
        products: [],
        allProducts: [],
        categories: [],
        specialOffers: [],
        selectedProduct: [],
        productDetails: [],
        loading: true,
        error: null,
      },
    };

    return mockState;
  });
});

describe("Init Component", () => {
  test("Should render Init component", async () => {
    const component = await renderComponent();
    expect(component).toBeDefined();
  });

  test("Should display loading message when loading is true", async () => {
    (useProducts as jest.Mock).mockImplementation(() => ({
      state: {
        products: [],
        allProducts: [],
        categories: [],
        specialOffers: [],
        selectedProduct: [],
        productDetails: [],
        loading: true,
        error: null,
      },
    }));

    await renderComponent();
    const loader = screen.getByText("Cargando productos...");
    expect(loader).toBeInTheDocument();
  });

  test("Should display error message when error exists", async () => {
    (useProducts as jest.Mock).mockImplementation(() => ({
      state: {
        products: [],
        allProducts: [],
        categories: [],
        specialOffers: [],
        selectedProduct: [],
        productDetails: [],
        loading: false,
        error: "Hubo un problema al cargar los productos.",
      },
    }));

    await renderComponent();
    const errorMessage = screen.getByText("Hubo un problema al cargar los productos.");
    expect(errorMessage).toBeInTheDocument();
  });

  test("Should render products when loading is false and there is no error", async () => {
    (useProducts as jest.Mock).mockImplementation(() => ({
      state: {
        products: mockProductsInit,
        allProducts: [],
        categories: [],
        specialOffers: [],
        selectedProduct: [],
        productDetails: [],
        loading: false,
        error: null,
      },
    }));

    await renderComponent();

    for (const product of mockProductsInit) {
      const productElement = screen.getByText(product.title);
      expect(productElement).toBeInTheDocument();
    }
  });

  test("Should display 'No hay productos disponibles' if products list is empty", async () => {
    (useProducts as jest.Mock).mockImplementation(() => ({
      state: {
        products: [],
        allProducts: [],
        categories: [],
        specialOffers: [],
        selectedProduct: [],
        productDetails: [],
        loading: false,
        error: null,
      },
    }));

    await renderComponent();
    await waitFor(() => {
      const noProductsMessage = screen.getByText("No hay productos disponibles.");
      expect(noProductsMessage).toBeInTheDocument();
    });
  });

});
