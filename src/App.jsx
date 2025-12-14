import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginGroup from "./groups/login-group";
import RouteProtector from "./components/route-protector/route-protector";
import {Navigate} from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import LoginPage from "./pages/login";
import LoginOTPPage from "./pages/login-otp";
import Dashboard from "./pages/dashboard";
import GuarantiesManagement from "./pages/guaranties-management";
import Profile from "./pages/profile";
import OrdersManagementPage from "./pages/orders-management";
import CartsManagementPage from "./pages/carts-management";
import TicketsManagementPage from "./pages/tickets-management";
import ProductsManagementPage from "./pages/products-management";
import TicketDetails from "./pages/ticket-details";
import GuaranteeActivationPage from "./pages/guarantee-activation";
import GuarantiesManagementPage from "./pages/guaranties-management";
import AgentsManagementPage from "./pages/agents-management";
import DashboardGroup from "./groups/dashboard-group";
import ModifyProductPage from "./pages/modify-product";
import AddProductPage from "./pages/add-product";
import CardsManagementPage from "./pages/cards-management";
import NewCardPage from "./pages/new-card";
import ModifyCardPage from "./pages/modify-card";
import CustomersManagementPage from "./pages/customers-management";
import ModifyCustomerPage from "./pages/modify-customer";
import OrderDetailsPage from "./pages/order-details";
import ServiceCompaniesPage from "./pages/service-companies";
import NewServiceCompanyPage from "./pages/new-service-company";
import ModifyServiceCompanyPage from "./pages/modify-service-company";

const queryClient = new QueryClient();

const router = createBrowserRouter([

    {
        element: <LoginGroup />,
        children: [
            { path: "/", element: <LoginPage /> },
            { path: "/login-otp", element: <LoginOTPPage/> },
            { path: "/login", element: <LoginPage /> },
        ],
    },
    {
        element: <DashboardGroup />,
        children: [
            { path: "/dashboard", element: <RouteProtector><Dashboard /></RouteProtector>},
            { path: "/dashboard/guaranties-management", element: <RouteProtector><GuarantiesManagement /></RouteProtector>},
            { path: "/dashboard/guaranties-management/guarantee-activation", element: <RouteProtector><GuaranteeActivationPage  /></RouteProtector>},
            { path: "/dashboard/guaranties-management/guarantee-registration", element: <RouteProtector><GuarantiesManagementPage  /></RouteProtector>},
            { path: "/dashboard/agents-management", element: <RouteProtector><AgentsManagementPage /></RouteProtector>},
            { path: "/dashboard/agents-management/:agentId", element: <RouteProtector><AgentsManagementPage /></RouteProtector>},
            { path: "/dashboard/profile", element: <RouteProtector><Profile /></RouteProtector>},
            { path: "/dashboard/products-management", element: <RouteProtector><ProductsManagementPage /></RouteProtector>},
            { path: "/dashboard/products-management/:id", element: <RouteProtector><ModifyProductPage /></RouteProtector>},
            { path: "/dashboard/products-management/new-product", element: <RouteProtector><AddProductPage /></RouteProtector>},
            { path: "/dashboard/cart", element: <RouteProtector><CartsManagementPage /></RouteProtector>},
            { path: "/dashboard/orders-management", element: <RouteProtector><OrdersManagementPage /></RouteProtector>},
            { path: "/dashboard/orders-management/:orderId", element: <RouteProtector><OrderDetailsPage /></RouteProtector>},
            { path: "/dashboard/tickets-management", element: <RouteProtector><TicketsManagementPage /></RouteProtector>},
            { path: "/dashboard/tickets-management/:ticketId", element: <RouteProtector><TicketDetails /></RouteProtector>},
            { path: "/dashboard/cards-management/", element: <RouteProtector><CardsManagementPage /></RouteProtector>},
            { path: "/dashboard/cards-management/new-card", element: <RouteProtector><NewCardPage /></RouteProtector>},
            { path: "/dashboard/cards-management/:id", element: <RouteProtector><ModifyCardPage /></RouteProtector>},
            { path: "/dashboard/customers-management", element: <RouteProtector><CustomersManagementPage /></RouteProtector>},
            { path: "/dashboard/customers-management/:id", element: <RouteProtector><ModifyCustomerPage /></RouteProtector>},
            { path: "/dashboard/service-companies-management", element: <RouteProtector><ServiceCompaniesPage /></RouteProtector>},
            { path: "/dashboard/service-companies-management/new-service-company", element: <RouteProtector><NewServiceCompanyPage /></RouteProtector>},
            { path: "/dashboard/service-companies-management/:id", element: <RouteProtector><ModifyServiceCompanyPage /></RouteProtector>},

        ],
    },

    { path: "*", element: <Navigate to="/" /> },
]);

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}

export default App;
