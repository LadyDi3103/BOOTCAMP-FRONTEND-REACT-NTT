import "../Home/Home.css";
import Carousel from "../../../components/Carousel/Carousel";
import CategoriesSection from "../../../shared/components/CategorySection/CategoriesSection";
import CategoriesList from "../../../shared/components/CategoryItem/CategoryList";
import CallToAction from "@/shared/components/CallToAction/CallToAction";


const Home = () => {
    return (
        <main>
            <CallToAction />
            <Carousel />
            <CategoriesList />
            <CategoriesSection />
        </main>
    );
};

export default Home;
