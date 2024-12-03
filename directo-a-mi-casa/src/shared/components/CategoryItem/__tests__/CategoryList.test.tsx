import { render, screen } from "@testing-library/react";
import CategoriesList from "../CategoryList";


jest.mock('../CategoryList', () => ({
  ...jest.requireActual('../CategoryList'),
  categories: [], 
}));

describe.skip("CategoriesList Component", () => {
  test("should render 'No categories available' when no categories exist", () => {
    render(<CategoriesList />);

    const noCategoriesMessage = screen.queryByText("no categories available");
    expect(noCategoriesMessage).toBeInTheDocument();
  });

  test("should render all categories correctly (happy path)", () => {
    render(<CategoriesList />);

    const categories = [
      { alt: "Frutas", name: "Frutas" },
      { alt: "Vegetales", name: "Vegetales" },
      { alt: "Conservas", name: "Conservas" },
      { alt: "Detergentes", name: "Detergentes" },
    ];

    categories.forEach((category) => {

      const categoryImage = screen.getByAltText(category.alt);
      expect(categoryImage).toBeInTheDocument();


      const categoryName = screen.getByText(category.name);
      expect(categoryName).toBeInTheDocument();
    });
  });
});
