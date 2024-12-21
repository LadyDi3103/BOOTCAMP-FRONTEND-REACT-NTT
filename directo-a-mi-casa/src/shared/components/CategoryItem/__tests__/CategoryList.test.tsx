import { render, screen } from "@testing-library/react";
import CategoriesList, { categories } from "../CategoryList";

describe("CategoriesList Component", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("should render 'No hay categorias disponibles' when no categories exist", () => {
    categories.length = 0;

    render(<CategoriesList />);
    const noCategoriesMessage = screen.getByText("No hay categorias disponibles");
    expect(noCategoriesMessage).toBeInTheDocument();
  });

  test("should render all categories correctly", () => {
    categories.splice(0, categories.length, 
      { icon: "/fruta.svg", alt: "Frutas", name: "Frutas" },
      { icon: "/vegetales.svg", alt: "Vegetales", name: "Vegetales" },
      { icon: "/compras.svg", alt: "Conservas", name: "Conservas" },
      { icon: "/detergente.svg", alt: "Detergentes", name: "Detergentes" }
    );

    render(<CategoriesList />);
    const categoryItems = screen.getAllByRole("img");
    expect(categoryItems).toHaveLength(4);
  });
});
