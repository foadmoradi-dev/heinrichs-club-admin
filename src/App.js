import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import {Routes} from "react-router";
import LoginPageLayout from "./Layouts/LoginPageLayout";
import {createTheme, ThemeProvider} from "@mui/material";
import LeftDrawer from "./Containers/LeftDrawer/LeftDrawer";
import Header from "./Containers/Header/Header";
import {lazy, useEffect, useState} from "react";
import {Navigate} from "react-router"
import Loading from "./Widgets/Loading/Loading";
import { Suspense } from "react";
import { useSelector} from "react-redux";
import useDecryption from "./Hooks/useDecryption";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";



const DashboardLayout = lazy(() => import("./Layouts/DashboardLayout")) ;
const LoginByOTPLayout = lazy(() => import("./Layouts/LoginByOTPLayout")) ;
const AddGuarantiesLayout = lazy(() => import("./Layouts/AddGuarantiesLayout")) ;
const ModifyGuarantiesLayout = lazy(() => import("./Layouts/ModifyGuarantiesLayout")) ;
const RegisterGuaranteeLayout = lazy(() => import("./Layouts/RegisterGuaranteeLayout")) ;
const ModifyAgentsLayout = lazy(() => import("./Layouts/ModifyAgentsLayout")) ;
const AddProductLayout = lazy(() => import("./Layouts/AddProductLayout")) ;
const ModifyProductLayout = lazy(() => import("./Layouts/ModifyProductLayout")) ;
const EditProductLayout = lazy(() => import("./Layouts/EditProductLayout"))
const EditAgentLayout = lazy(() => import("./Layouts/EditAgentLayout"))
const TicketsManagementLayout = lazy(() => import("./Layouts/TicketsManagementLayout"))
const TicketContentLayout = lazy(() => import("./Layouts/TicketContentLayout"))
const ModifyOrdersLayout = lazy(() => import("./Layouts/ModifyOrdersLayout"))
const OrderLayout = lazy(() => import("./Layouts/OrderLayout"))
function App() {
    const roleStore = useSelector(state => state.roleSlice.role)
    const [role, setRole] = useState()
    const {decryption} = useDecryption()
    const theme = createTheme({
        palette: {
            primary: {
                light: '#df9cee',
                main: '#8c29a8',
                dark: '#3a1b44',
                contrastText: '#fff',
            },
            secondary: {
                light: '#ff7961',
                main: '#f44336',
                dark: '#ba000d',
                contrastText: '#000',
            },
            tertiary: {
                light: '#539bb6',
                main: '#3060bb',
                dark: '#032565',
                contrastText: '#000',
            },
        },
    });
    useEffect(() => {
        if(localStorage.getItem("data") !== null){
            decryption(localStorage.getItem("data"), (data) => {
                setRole(JSON.parse(data).role)
            })
        }
    }, [])

  return (
          <BrowserRouter basename="/adminQwePe56Bsd">
              <ThemeProvider theme={theme}>
                  <div className="App">
                      <header className="App-header">
                          <LeftDrawer />
                          <Header />
                          <Suspense fallback={<Loading />}>
                              <Routes >
                                  <Route exact path={"/"} element={<LoginPageLayout />} />
                                  <Route exact path={"/dashboard"}>
                                      <Route exact index path={"/dashboard"} element={
                                          <ProtectedRoute >
                                          <DashboardLayout />
                                      </ProtectedRoute> } />
                                      <Route exact path={"/dashboard/add-guaranties"} element={
                                          <ProtectedRoute >
                                          <AddGuarantiesLayout />
                                      </ProtectedRoute>} />
                                      <Route exact path={"/dashboard/modify-guaranties"} element={
                                          <ProtectedRoute >
                                          <ModifyGuarantiesLayout/>
                                      </ProtectedRoute> } />
                                      <Route exact path={"/dashboard/register-guarantee"} element={<ProtectedRoute >
                                          <RegisterGuaranteeLayout/>
                                      </ProtectedRoute>} />
                                      <Route exact path={"/dashboard/modify-agents"} element={
                                          <ProtectedRoute >
                                              <ModifyAgentsLayout/>
                                          </ProtectedRoute>} />
                                      <Route exact path={"/dashboard/edit-agent/:id"} element={<ProtectedRoute >
                                          <EditAgentLayout />
                                      </ProtectedRoute>} />
                                      <Route exact path={"/dashboard/add-product"} element={<ProtectedRoute >
                                          <AddProductLayout/>
                                      </ProtectedRoute>} />
                                      <Route exact path={"/dashboard/modify-product"} element={<ProtectedRoute >
                                          <ModifyProductLayout/>
                                      </ProtectedRoute>} />
                                      <Route exact path={"/dashboard/edit-product/:id"} element={<ProtectedRoute >
                                          <EditProductLayout />
                                      </ProtectedRoute>} />

                                      <Route exact path={"/dashboard/tickets"} element={<ProtectedRoute >
                                          <TicketsManagementLayout />
                                      </ProtectedRoute>} />
                                      <Route exact path={"/dashboard/ticket/:id"} element={<ProtectedRoute >
                                          <TicketContentLayout />
                                      </ProtectedRoute>} />
                                      <Route exact path={"/dashboard/modify-orders"} element={
                                          <ProtectedRoute >
                                              <ModifyOrdersLayout/>
                                          </ProtectedRoute>} />
                                      <Route exact path={"/dashboard/order/:id"} element={<ProtectedRoute >
                                          <OrderLayout />
                                      </ProtectedRoute>} />
                                  </Route>
                                  <Route exact path={"/*"} element={<Navigate to={"/"} replace/>} />
                                  <Route exact path={"/otp"} element={<LoginByOTPLayout />} />
                              </Routes>
                          </Suspense>
                      </header>
                    </div>
              </ThemeProvider>
          </BrowserRouter>
  );
}

export default App;
