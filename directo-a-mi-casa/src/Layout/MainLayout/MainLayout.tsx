import { PropsWithChildren } from "react";
import "./MainLayout.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface MainLayoutI extends PropsWithChildren { }

const MainLayout: React.FC<MainLayoutI> = ({ children }) => {

    return (
        <>
            <Header />
            <ToastContainer
                position="top-right" 
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
                draggable
                theme="colored"
            />
            <div className="mainLayout__container">{children}</div>
            <Footer />
        </>
    );
};

export default MainLayout;
