import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

function MainLayout() {
    return (
        <>
        <Navbar/>

        <main>
            <Outlet />
        </main>

        <Footer />
        </>
    );
}

export default MainLayout;