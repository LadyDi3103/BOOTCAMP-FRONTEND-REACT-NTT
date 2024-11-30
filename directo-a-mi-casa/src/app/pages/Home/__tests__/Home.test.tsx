import { render, screen } from "@testing-library/react";
import Home from "../Home";

jest.mock("@/shared/components/CallToAction/CallToAction", () => () => <div data-testid="call-to-action" />);
jest.mock("@/components/Carousel/Carousel", () => () => <div data-testid="carousel" />);
jest.mock("@/components/CategorySection/CategoriesSection", () => () => <div data-testid="categories-section" />);
jest.mock("@/components/CategoryItem/CategoryItem", () => () => <div data-testid="category-item" />);
jest.mock("@/components/SpecialOffers/SpecialOffers", () => () => <div data-testid="special-offers" />);

describe("Home Page", () => {
    test("renders all components correctly", () => {

        render(<Home />);

        expect(screen.getByTestId("call-to-action")).toBeInTheDocument();
        expect(screen.getByTestId("carousel")).toBeInTheDocument();
        expect(screen.getByTestId("categories-section")).toBeInTheDocument();
        expect(screen.getByTestId("category-item")).toBeInTheDocument();
        expect(screen.getByTestId("special-offers")).toBeInTheDocument();
    });
});