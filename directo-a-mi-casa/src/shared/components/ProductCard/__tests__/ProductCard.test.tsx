import { render, act, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductCard from "../ProductCard";
import { Product } from '../../../../app/domain/Product';


// Mock the hooks used in ProductCard
jest.mock('../../hooks/useProductNavigation', () => ({
  useProductNavigation: () => ({
    onNavigate: jest.fn(),
  }),
}));

jest.mock("../../../app/context/ProductContext", () => ({
  useProducts: () => ({
    setSelectedProduct: jest.fn(),
  }),
}));

jest.mock("../../../app/context/CartContext", () => ({
  useCart: () => ({
    addProduct: jest.fn(),
  }),
}));

// Dummy product data for testing
const product: Product = {
  id: 1,
  title: "Product Test",
  thumbnail: "test-thumbnail.jpg",
  price: 99.99,
  category: "Category Test",
};

describe("ProductCard Component", () => {
  it("renders without crashing", () => {
    render(<ProductCard product={product} />);
    expect(screen.getByText("Product Test")).toBeInTheDocument();
    expect(screen.getByText("S/ 99.99")).toBeInTheDocument();
    expect(screen.getByAltText("Product Test")).toBeInTheDocument();
  });

  it("handles missing product properties", () => {
    const incompleteProduct = { ...product, title: "" };
    render(<ProductCard product={incompleteProduct} />);
    expect(console.error).toHaveBeenCalledWith(
      "Faltan propiedades en el producto:",
      expect.objectContaining({ title: "" })
    );
  });

  it("handles add to cart click", () => {
    const { addProduct } = require("../../../app/context/CartContext").useCart();
    render(<ProductCard product={product} />);
    const addToCartButton = screen.getByText("Agregar");

    fireEvent.click(addToCartButton);

    expect(addProduct).toHaveBeenCalledWith(product);
  });

  it("handles navigation to product details", () => {
    const { setSelectedProduct } = require("../../../app/context/ProductContext").useProducts();
    const { onNavigate } = require("../../hooks/useProductNavigation").useProductNavigation();

    render(<ProductCard product={product} />);
    const cardElement = screen.getByRole("img", { name: /Product Test/i }).closest("div");

    if (cardElement) {
      fireEvent.click(cardElement);
    }

    expect(setSelectedProduct).toHaveBeenCalledWith(product);
    expect(onNavigate).toHaveBeenCalledWith(product.title);
  });

  it("handles image error", () => {
    render(<ProductCard product={product} />);
    const imageElement = screen.getByAltText("Product Test");
    fireEvent.error(imageElement);
    expect(console.error).toHaveBeenCalledWith(
      "Error al cargar la imagen del producto:",
      expect.any(Object)
    );
  });
});
