import { renderHook } from "@testing-library/react";
import { ModuleRoutes } from "@/app/routes/routes";
import { useProductNavigation } from "../useProductNavigation";

const navigateMock = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => navigateMock,
}));

describe("useProductNavigation", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should log an error and not navigate if productTitle is undefined or empty", () => {
        const { result } = renderHook(() => useProductNavigation());
        jest.spyOn(console, "error").mockImplementation(() => { });

        result.current.onNavigate(undefined as any);
        expect(console.error).toHaveBeenCalledWith(
            "El identificador del producto no está definido."
        );
        expect(navigateMock).not.toHaveBeenCalled();

        result.current.onNavigate("");
        expect(console.error).toHaveBeenCalledWith(
            "El identificador del producto no está definido."
        );
        expect(navigateMock).not.toHaveBeenCalled();

        (console.error as jest.Mock).mockRestore();
    });

    it("should replace spaces with dashes and navigate to the correct path", () => {
        const { result } = renderHook(() => useProductNavigation());
        const productTitle = "Test Product Title";

        result.current.onNavigate(productTitle);

        const expectedPath = `${ModuleRoutes.ProductsPage}/Test-Product-Title`;
        expect(navigateMock).toHaveBeenCalledWith(expectedPath);
    });
});
