import { render, screen } from "@testing-library/react";
import Init from "../Init";
import { useProducts } from "@/app/context/ProductContext";

jest.mock("@/app/context/ProductContext", () => ({
  useProducts: jest.fn(),
}));

describe("Init Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("debería mostrar el mensaje de carga cuando está cargando", () => {
    (useProducts as jest.Mock).mockReturnValue({
      state: {
        loading: true,
        error: null,
        products: [],
      },
    });

    render(<Init />);

    expect(screen.getByText("Cargando productos...")).toBeInTheDocument();
  });

  test("debería mostrar el mensaje de error cuando ocurre un error", () => {
    (useProducts as jest.Mock).mockReturnValue({
      state: {
        loading: false,
        error: "Error al cargar los productos",
        products: [],
      },
    });

    render(<Init />);

    expect(screen.getByText("Error al cargar los productos")).toBeInTheDocument();
  });

  test.skip("debería mostrar un mensaje de 'no hay productos' si no hay productos", () => {
    (useProducts as jest.Mock).mockReturnValue({
      state: {
        loading: false,
        error: null,
        products: [],
      },
    });

    render(<Init />);

    expect(screen.getByText("No hay productos disponibles")).toBeInTheDocument();
  });

  test("debería mostrar los productos correctamente", () => {
    (useProducts as jest.Mock).mockReturnValue({
      state: {
        loading: false,
        error: null,
        products: [
          { id: 1, name: "Producto 1", price: 100 },
          { id: 2, name: "Producto 2", price: 200 },
        ],
      },
    });

    render(<Init />);

    expect(screen.getByText(/2 Productos/i)).toBeInTheDocument();
    expect(screen.getByText(/Producto 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Producto 2/i)).toBeInTheDocument();
  });
});
