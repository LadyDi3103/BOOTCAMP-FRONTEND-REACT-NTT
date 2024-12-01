import { render, screen } from "@testing-library/react";
import { useProducts } from "@/app/context/ProductContext";
import { useCart } from "@/app/context/CartContext";
import { MemoryRouter } from "react-router-dom";
import ProductPage from "../ProductsPage";
import { mockSelectedProduct } from "../__mocks__/mock__selectedProduct";
import { mockProductDetails } from "../__mocks__/mock__productDetails";

jest.mock("@/app/context/ProductContext", () => ({
    useProducts: jest.fn(),
}));

jest.mock("@/app/context/CartContext", () => ({
    useCart: jest.fn(),
}));

jest.mock("@/shared/components/CategoryTitleBar/CategoryTitleBar", () => () => {
    return <div data-testid="mock-category-title">Mocked CategoryTitleBar</div>;
});

jest.mock("@/shared/components/CallToAction/CallToAction", () => () => {
    return <div data-testid="mock-call-to-action">Mocked CallToAction</div>;
});

describe("ProductPage Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("should render ProductPage component", () => {
        (useProducts as jest.Mock).mockReturnValue({
            state: {
                selectedProduct: mockSelectedProduct[0],
                productDetails: mockProductDetails[0],
            },
        });

        (useCart as jest.Mock).mockReturnValue({
            addProduct: jest.fn(),
        });

        render(
            <MemoryRouter>
                <ProductPage />
            </MemoryRouter>
        );

        expect(screen.getByTestId("mock-category-title")).toBeInTheDocument();
        expect(screen.getByTestId("mock-call-to-action")).toBeInTheDocument();
    });
})
