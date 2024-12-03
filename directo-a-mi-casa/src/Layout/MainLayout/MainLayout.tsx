import { PropsWithChildren} from "react";
import "./MainLayout.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

interface MainLayoutI extends PropsWithChildren { }

const MainLayout: React.FC<MainLayoutI> = ({ children }) => {

    return (
        <>
            <Header />
            <div className="mainLayout__container">{children}</div>
            <Footer />
        </>
    );
};

export default MainLayout;
