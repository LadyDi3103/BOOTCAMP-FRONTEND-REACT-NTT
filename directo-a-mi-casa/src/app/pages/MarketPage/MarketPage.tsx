import CallToAction from "../../../shared/components/CallToAction/CallToAction";
import Carousel from "../../../components/Carousel/Carousel";
import SpecialOffers from '../../../components/SpecialOffers/SpecialOffers';
import withAuth from "@/HOC/withAuth";


const MarketPage = () => {
    return (
        <main>
            <CallToAction />
            <Carousel />
            <SpecialOffers />
        </main>
    );
};

export default withAuth(MarketPage);
