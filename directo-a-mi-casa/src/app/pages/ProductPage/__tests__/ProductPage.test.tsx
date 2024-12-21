import { render, screen, waitFor } from "@testing-library/react";
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

jest.mock("@/HOC/withAuth", () => {
    return (Component: React.FC) => {
        return (props: React.ComponentProps<typeof Component>) => {
            const MockedComponent = Component;
            return <MockedComponent {...props} />;
        };
    };
});

describe.only("ProductPage Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("should render ProductPage component", async () => {
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

        await waitFor(() => {
            expect(screen.getByTestId("mock-category-title")).toBeInTheDocument();
            expect(screen.getByTestId("mock-call-to-action")).toBeInTheDocument();
        });
    });

    test("should render no-reviews message when no reviews are available", async () => {
        (useProducts as jest.Mock).mockReturnValue({
            state: {
                selectedProduct: mockSelectedProduct[0],
                productDetails: {
                    ...mockProductDetails[0],
                    reviews: [],
                },
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

        const noReviewsElement = screen.getByText("No hay reseñas disponibles para este producto.");
        expect(noReviewsElement).toHaveClass("no-reviews");
    });

    test("should render default values when productDetails is empty", async () => {
        (useProducts as jest.Mock).mockReturnValue({
            state: {
                selectedProduct: null,
                productDetails: {},
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

        expect(screen.getByText("Producto no encontrado")).toBeInTheDocument();
        expect(screen.getByText("Descripción no disponible")).toBeInTheDocument();
        expect(screen.getByText("Sin categoría")).toBeInTheDocument();
        expect(screen.getByAltText("Producto no encontrado")).toBeInTheDocument();

    });


})
