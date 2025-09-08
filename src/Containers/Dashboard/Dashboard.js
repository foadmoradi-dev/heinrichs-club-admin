import {Fragment} from "react";
import DashboardAdmin from "./DashboardAdmin/DashboardAdmin";
import DashboardGuaranties from "./DashboardGuaranties/DashboardGuaranties";
import DashboardAgents from "./DashboardAgents/DashboardAgents";
import {forwardRef, useContext, useEffect, useState} from "react";
import {AdminContext} from "../../Contexts/AdminContext/AdminContext";
import {AuthContext} from "../../Contexts/AuthContext/AuthContext";
import {Snackbar} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Loading from "../../Widgets/Loading/Loading";
import ConnectionError from "../../Components/ConnectionError/ConnectionError";
import DashboardProductCustomer from "./DashboardProductCustomer/DashboardProductCustomer";
import useGetByToken from "../../Hooks/useGetByToken";
import useUpdateRefreshToken from "../../Hooks/useUpdateRefreshToken";
import useDecryption from "../../Hooks/useDecryption";
const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Dashboard = () => {
    const adminContext = useContext(AdminContext)
    const authContext = useContext(AuthContext)
    const {open, loadingStatus, severity, verificationMessage, sendRequest :getData, handleSnackClose} =  useGetByToken()
    const {sendRequest: refreshToken} = useUpdateRefreshToken()
    const [level, setLevel] = useState("1")
    const {decryption}  = useDecryption()
    const fetchAll = () => {
        let id = ""
        decryption(localStorage.getItem("data"), (data) => {
            id = JSON.parse(data).role_id
        })
        const applyData = (data) => {
            if(data.status){
                adminContext.dispatch({type:"save", payload:{
                        admin:data.result
                    }})
                setLevel(data.result.level)
            }else if(data.result === "Refresh-Token"){
                const applyRefresh = (data) => {
                    if(data.status){
                        authContext.dispatch({
                            type: "update", payload: {
                                data:{
                                    role_id: data.result.id,
                                    access_token: data.result.access_token,
                                    refresh_token: data.result.refresh_token,
                                    role: "admin"
                                }
                            }
                        })
                        fetchAll()
                    }
                }
                refreshToken(applyRefresh).then(r => {}, error => {}).catch(e =>{})
            }
        }
        getData({url: '/admin/' + id}, applyData).then(r => {}, error => {}).catch(e => {})
    }
    useEffect(() => {
        fetchAll()
    }, [])

    return(
        <div className="row container-fluid g-0 " style={{marginTop: 70, marginBottom: 6, justifyContent:"center"}}>
            {
                loadingStatus !== "loading"  && loadingStatus !== "try" ?
                    <Fragment>
                        <DashboardAdmin />
                        <DashboardAgents />
                        <DashboardGuaranties />
                        <DashboardProductCustomer />
                    </Fragment>:
                    loadingStatus === "loading" ?
                        <Loading />:
                        <ConnectionError  tryAgain={fetchAll} />
            }

            <Snackbar open={open} autoHideDuration={4000} onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity={severity} sx={{ width: 400 }}>
                    {verificationMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}
export default Dashboard