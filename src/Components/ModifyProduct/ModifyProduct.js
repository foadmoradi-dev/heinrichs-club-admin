import {Box, Snackbar} from "@mui/material";
import {Fragment, useContext, useEffect, useState} from "react";
import Products from "../Products/Products";

import Loading from "../../Widgets/Loading/Loading";
import ConnectionError from "../ConnectionError/ConnectionError";
import {forwardRef} from "react";
import MuiAlert from "@mui/material/Alert";
import useGetByToken from "../../Hooks/useGetByToken";
import useDeleteByToken from "../../Hooks/useDeleteByToken";
import useUpdateRefreshToken from "../../Hooks/useUpdateRefreshToken";
import {AuthContext} from "../../Contexts/AuthContext/AuthContext";

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const ModifyProduct = () => {
    const authContext = useContext(AuthContext)
    const [rows, setRows] = useState([])
    const {loadingStatus, severity, open, handleSnackClose, sendRequest :fetchProduct, verificationMessage} = useGetByToken()
    const {loadingStatus :loading, open: op, severity:sever, sendRequest: deleteData, verificationMessage : message, handleSnackClose :handleClose} = useDeleteByToken()
    const {sendRequest: refreshToken} = useUpdateRefreshToken()
    const fetchData = () => {
        const applyData = (data) => {
            if (data.status) {
                setRows([...data.result])
            }else if(data.result === "Refresh-Token"){
                const applyRefresh = (data) => {
                    if(data.status){
                        authContext.dispatch({
                            type: "update", payload: {
                                data :{
                                    role_id: data.result.id,
                                    access_token: data.result.access_token,
                                    refresh_token: data.result.refresh_token,
                                    role: "admin"
                                }
                            }
                        })
                        fetchData()
                    }
                }
                refreshToken(applyRefresh).then(r => {}, error => {}).catch(e =>{})
            }
        }
        fetchProduct({
            url: '/product'
        }, applyData).then(r => {}, error => {}).catch(e => {})
    }
    useEffect(() => {
       fetchData()
    }, [])

    const deleteHandler = (id) => {
        const applyDelete = (data) => {
            if(data.status){
                const rows_temp = [...rows]
                const product_index = rows_temp.findIndex(st => st.id === id)
                rows_temp.splice(product_index, 1)
                setRows([...rows_temp])
            }else if(data.result === "Refresh-Token"){
                const applyRefresh = (data) => {
                    if(data.status){
                        authContext.dispatch({
                            type: "update", payload: {
                                data:{
                                    role_id: data.result.id,
                                    access_token: data.result.access_token,
                                    refresh_token: data.result.refresh_token,
                                    role:"admin"
                                }
                            }
                        })
                        deleteHandler(id)
                    }
                }
                refreshToken(applyRefresh).then(r => {}, error => {}).catch(e =>{})
            }
        }
        deleteData({url: '/product/' + id}, applyDelete).then(r => {}, error => {}).catch(e => {})
    }
    return(
        <Fragment>
            {
                loadingStatus !== "loading" && loadingStatus !== "try" ?
                    <Fragment>
                        <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
                            <Products productsList={rows} deleteHandler={deleteHandler} />
                        </Box>
                    </Fragment>:
                    loadingStatus === "loading" ?
                        <Loading />:
                        <ConnectionError  tryAgain={fetchData} />
            }
            <Snackbar open={open || op} autoHideDuration={4000} onClose={open ? handleSnackClose : op ? handleClose : null}>
                <Alert onClose={open ? handleSnackClose : op ? handleClose : null} severity={severity || sever} sx={{ width: 400 }}>
                    {verificationMessage || message}
                </Alert>
            </Snackbar>
        </Fragment>

    )
}
export default ModifyProduct