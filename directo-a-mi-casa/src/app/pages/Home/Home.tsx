import "../Home/Home.css";
import CallToAction from "../../../components/CallToAction/CallToAction";
import Carousel from "../../../components/Carousel/Carousel";
import CategoriesSection from "../../../components/CategorySection/CategoriesSection";
import CategoryItem from "../../../components/CategoryItem/CategoryItem";
import SpecialOffers from "../../../components/SpecialOffers/SpecialOffers";

/**
 * Componente Home
 * Renderiza la página de inicio con sus secciones principales:
 * - Llamado a la acción (CallToAction)
 * - Carrusel (Carousel)
 * - Sección de categorías (CategoriesSection)
 * - Lista de ítems de categorías (CategoryItem)
 * - Ofertas especiales (SpecialOffers)
 */
const Home = () => {
    return (
        <main>
            {/* Sección de llamado a la acción */}
            <CallToAction />

            {/* Carrusel de imágenes */}
            <Carousel />

            {/* Sección de categorías */}
            <CategoriesSection />

            {/* Lista de ítems por categoría */}
            <CategoryItem />

            {/* Ofertas especiales */}
            <SpecialOffers />
        </main>
    );
};

export default Home;
