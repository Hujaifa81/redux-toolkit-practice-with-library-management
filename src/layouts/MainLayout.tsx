import Footer from "@/shared/Footer";
import Nav from "@/shared/Nav";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div>
            <Nav></Nav>
            <div className="min-h-[50vh]">
                <Outlet></Outlet>
            </div>

            <Footer></Footer>

        </div>
    );
};

export default MainLayout;