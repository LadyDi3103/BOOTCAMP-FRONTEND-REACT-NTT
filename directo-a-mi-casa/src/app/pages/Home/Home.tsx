import "../Home/Home.css";
import CallToAction from "../../../components/CallToAction/CallToAction";
import Carousel from "../../../components/Carousel";
import CategoriesSection from "../../../components/CategorySection/CategoriesSection";
import CategoryItem from "../../../components/CategoryItem/CategoryItem";
import SpecialOffers from "../../../components/SpecialOffers";


const Home = () => {
return (
            <main>
                <CallToAction />
                <Carousel />
                <CategoriesSection />
                <CategoryItem />
                <SpecialOffers />
            </main>
    );
};

export default Home;
