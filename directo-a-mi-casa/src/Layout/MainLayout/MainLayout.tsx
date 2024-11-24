import React, { PropsWithChildren } from "react";
import "../MainLayout/MainLayout.css";
import CallToAction from "../../components/CallToAction/CallToAction";
import Carousel from "../../components/Carousel";
import CategoriesSection from "../../components/CategorySection/CategoriesSection";
import SpecialOffers from "../../components/SpecialOffers";
import CategoryItem from "../../components/CategoryItem/CategoryItem";

const MainLayout: React.FC<PropsWithChildren> = () => {
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

export default MainLayout;
