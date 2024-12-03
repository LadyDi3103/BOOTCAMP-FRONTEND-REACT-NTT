import "../Home/Home.css";
import CallToAction from "../../../shared/components/CallToAction/CallToAction";
import Carousel from "../../../components/Carousel/Carousel";
import CategoriesSection from "../../../components/CategorySection/CategoriesSection";
import CategoryItem from "../../../components/CategoryItem/CategoryItem";

const Home = () => {
    return (
        <main>

            <CallToAction />

            <Carousel />

            <CategoryItem />

            <CategoriesSection />



        </main>
    );
};

export default Home;
