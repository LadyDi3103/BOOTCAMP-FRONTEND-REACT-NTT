import { render, screen } from "@testing-library/react";
import Home from "../Home";

jest.mock("@/shared/components/CallToAction/CallToAction", () => () => <div data-testid="call-to-action">CallToAction</div>);
jest.mock("@/components/Carousel/Carousel", () => () => <div data-testid="carousel">Carousel</div>);
jest.mock("@/shared/components/CategorySection/CategoriesSection", () => () => <div data-testid="categories-section">CategoriesSection</div>);
jest.mock("@/shared/components/CategoryItem/CategoryList", () => () => <div data-testid="categories">CategoriesList</div>);

describe("Home Page", () => {
    test("Should render all components correctly", () => {
        render(<Home />);

        expect(screen.getByTestId("call-to-action")).toBeInTheDocument();
        expect(screen.getByTestId("carousel")).toBeInTheDocument();
        expect(screen.getByTestId("categories-section")).toBeInTheDocument();
        expect(screen.getByTestId("categories")).toBeInTheDocument();
    });

    test("Should check the content of the components", () => {
        render(<Home />);

        expect(screen.getByTestId("call-to-action")).toHaveTextContent("CallToAction");
        expect(screen.getByTestId("carousel")).toHaveTextContent("Carousel");
        expect(screen.getByTestId("categories-section")).toHaveTextContent("CategoriesSection");
        expect(screen.getByTestId("categories")).toHaveTextContent("CategoriesList");
    });

    test("Should match snapshot", () => {
        const { container } = render(<Home />);
        expect(container).toMatchSnapshot();
    });
});