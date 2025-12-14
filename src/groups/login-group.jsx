// layouts/AuthLayout.jsx
import { Outlet } from "react-router-dom";
import Main from "../layout/main";

const LoginLayout = () => {
    return (
        <Main>
            <Outlet />
        </Main>
    );
};

export default LoginLayout;
