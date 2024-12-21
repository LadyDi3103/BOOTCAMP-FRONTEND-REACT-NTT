import { render, act, fireEvent, screen, RenderResult } from "@testing-library/react";
import ProductCard from "../ProductCard";
import { productResponseMock } from "../__mocks__/product";
import { Product } from "@/app/domain/Product";

jest.mock('@/shared/hooks/ProductNavegate/useProductNavigation', () => ({
  useProductNavigation: () => ({
    onNavigate: (productTitle: string) => {
      const formattedProductTitle = productTitle.replace(/\s+/g, '-');
      navigateMock(`/product/${formattedProductTitle}`);
    }
  }),
}));

jest.mock("@/app/context/ProductContext", () => ({
  useProducts: () => ({
    setSelectedProduct: jest.fn(),
  }),
}));

const addProductMock = jest.fn();
jest.mock("@/app/context/CartContext", () => ({
  useCart: () => ({
    addProduct: addProductMock,
  }),
}));

const navigateMock = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => navigateMock,
}));

const renderComponent = async (): Promise<RenderResult> => {
  const component = await act(async () =>
    render(<ProductCard product={productResponseMock} />)
  );

  return component;
}

const { title } = productResponseMock;

describe("ProductCard Component", () => {

  it("should render ProductCard component", async () => {
    await renderComponent();

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText("S/ 9.99")).toBeInTheDocument();
    expect(screen.getByAltText(title)).toBeInTheDocument();
    expect(screen.getByText("Agregar")).toBeInTheDocument();
  });

  it("should navigate to Product page when user clicks card", async () => {
    await renderComponent();

    const cardContainer = screen.getByText(title);
    fireEvent.click(cardContainer);

    const expectedRoute = `/product/${title.replace(/\s+/g, '-')}`;
    expect(navigateMock).toHaveBeenCalledWith(expectedRoute);
    expect(navigateMock).toHaveBeenCalledTimes(1);
  });

  it("should call addProduct when 'Agregar' button is clicked", async () => {
    await renderComponent();

    const addButton = screen.getByText("Agregar");
    fireEvent.click(addButton);

    expect(addProductMock).toHaveBeenCalledWith(productResponseMock);
    expect(addProductMock).toHaveBeenCalledTimes(1);
  });

  it("should log error if product properties are missing", async () => {
    const incompleteProduct = { title: "Producto incompleto" };

    jest.spyOn(console, "error").mockImplementation(() => { });

    const { container } = render(<ProductCard product={incompleteProduct as Product} />);

    expect(console.error).toHaveBeenCalledWith(
      "Faltan propiedades esenciales en el producto:",
      incompleteProduct
    );

    expect(container.querySelector(".product-name")?.textContent).toBe("Producto incompleto");
    expect(container.querySelector(".product-price")?.textContent).toBe("S/ 0.00");

    (console.error as jest.Mock).mockRestore();
  });

  it("should log an error when image fails to load", async () => {
    jest.spyOn(console, "error").mockImplementation(() => { });

    await renderComponent();

    const productImage = screen.getByAltText(title);
    fireEvent.error(productImage);

    expect(console.error).toHaveBeenCalledWith(
      "Error al cargar la imagen del producto:", expect.any(Object)
    );

    (console.error as jest.Mock).mockRestore();
  });


});
