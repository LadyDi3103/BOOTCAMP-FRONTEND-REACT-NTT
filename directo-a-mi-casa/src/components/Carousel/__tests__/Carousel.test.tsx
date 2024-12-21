import { render, screen } from "@testing-library/react";
import Carousel from "../Carousel";

describe("Carousel Component", () => {
    test("should render the mobile image correctly", () => {
        render(<Carousel />);

        const mobileImage = screen.getByAltText("Imagen para dispositivos móviles");
        expect(mobileImage).toBeInTheDocument();
        expect(mobileImage).toHaveAttribute("src", "/src/assets/images/carousel/HP-BANNER-PRINCIPAL-mobile.svg");
    });

    test("should render the desktop image correctly", () => {
        render(<Carousel />);

        const desktopImage = screen.getByAltText("Imagen para dispositivos de escritorio");
        expect(desktopImage).toBeInTheDocument();
        expect(desktopImage).toHaveAttribute("src", "/src/assets/images/carousel/baner_desktop.webp");
    });

    test("should show broken image or missing alt attribute", () => {
        render(
            <section className="carousel">
                <img
                    src="/src/assets/images/carousel/non-existent-image.svg"
                    alt=""
                    className="carousel-img carousel-mobile"
                />
            </section>
        );

        const brokenImage = screen.getByAltText("");
        expect(brokenImage).toHaveAttribute("src", "/src/assets/images/carousel/non-existent-image.svg");
    });

    test("Should match snapshot", () => {
        const { container } = render(<Carousel />);
        expect(container).toMatchSnapshot();
    });
});


