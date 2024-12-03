import { render, screen, waitFor, act } from "@testing-library/react";
import Init from "../Init";
import { useProducts } from "@/app/context/ProductContext";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "@/app/context/CartContext";
import { mockProductsInit } from "../__mocks__/mock_init";
import { AuthContext, AuthContextProps} from "@/app/context/AuthContext";

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

jest.mock("@/HOC/withAuth", () => (Component: React.FC) => (props: any) => (
  <Component {...props} />
));

const renderComponentWithAuth = (isAuthenticated: boolean) => {
  const authValue: AuthContextProps = {
    loggedUser: isAuthenticated,
    userData: isAuthenticated ? { id: 1, name: "Test User" } : null,
    loginUser: jest.fn(),
    logoutUser: jest.fn(),
    setLoggingUser: jest.fn(),
    setLoggedUser: jest.fn(),
    loggingUser: false,
  };

  return render(
    <AuthContext.Provider value={authValue}>
      <CartProvider>
        <MemoryRouter initialEntries={["/todos-los-productos"]}>
          <Routes>
            <Route path="/todos-los-productos" element={<Init />} />
          </Routes>
        </MemoryRouter>
      </CartProvider>
    </AuthContext.Provider>
  );
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

describe("Init Component with Authentication HOC", () => {
  test("Should render Init component", async () => {
    const component = renderComponentWithAuth(true);
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

    await act(async () => {
      renderComponentWithAuth(true);
    });

    await waitFor(() => {
      const loader = screen.getByText("Cargando productos...");
      expect(loader).toBeInTheDocument();
    });
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

    await act(async () => {
      renderComponentWithAuth(true);
    });

    await waitFor(() => {
      const errorMessage = screen.getByText("Hubo un problema al cargar los productos.");
      expect(errorMessage).toBeInTheDocument();
    });
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

    await act(async () => {
      renderComponentWithAuth(true);
    });

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

    await act(async () => {
      renderComponentWithAuth(true);
    });

    await waitFor(() => {
      const noProductsMessage = screen.getByText("No hay productos disponibles");
      expect(noProductsMessage).toBeInTheDocument();
    });
  });
});
