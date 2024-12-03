import { render, screen } from "@testing-library/react";
import Home from "../Home";

jest.mock("@/shared/components/CallToAction/CallToAction", () => () => <div data-testid="call-to-action" />);
jest.mock("@/components/Carousel/Carousel", () => () => <div data-testid="carousel" />);
jest.mock("@/shared/components/CategorySection/CategoriesSection", () => () => <div data-testid="categories-section" />);
jest.mock("@/shared/components/CategoryItem/CategoryList", () => () => <div data-testid="categories" />);

describe.skip("Home Page", () => {
    test("renders all components correctly", () => {

        render(<Home />);

        expect(screen.getByTestId("call-to-action")).toBeInTheDocument();
        expect(screen.getByTestId("carousel")).toBeInTheDocument();
        expect(screen.getByTestId("categories-section")).toBeInTheDocument();
        expect(screen.getByTestId("categories")).toBeInTheDocument();

    });
});