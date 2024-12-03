import { renderHook } from "@testing-library/react";
import { usePageNavigation } from "../navigationHelpers";
import { ModuleRoutes } from "@/app/routes/routes";

const navigateMock = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => navigateMock,
}));

describe.skip("navigationHelpers", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("usePageNavigation", () => {

        it("should navigate to '/' when closePage is called", () => {
            const { result } = renderHook(() => usePageNavigation());

            result.current.closePage();
            
            expect(navigateMock).toHaveBeenCalledWith("/");
            expect(navigateMock).toHaveBeenCalledTimes(1);
        });

        it("should navigate to a given path when navigateTo is called", () => {
            const { result } = renderHook(() => usePageNavigation());

            result.current.navigateTo(ModuleRoutes.Home);

            expect(navigateMock).toHaveBeenCalledWith(ModuleRoutes.Home);
            expect(navigateMock).toHaveBeenCalledTimes(1);
        });
    });


});
