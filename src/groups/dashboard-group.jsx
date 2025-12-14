import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/sidebar";
import Header from "../components/dashboard/header";


const DashboardGroup = () => {
    return (
        <>
            <Header />
            <Sidebar />
            <main  className={'lg:ml-64 mt-20'}>
                <Outlet />
            </main>
        </>

    );
};

export default DashboardGroup;
