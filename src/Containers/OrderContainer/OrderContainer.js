import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../Contexts/AuthContext/AuthContext";
import OrderItem from "../../Components/OrderItem/OrderItem";
import {Button, Card, CardActions, Divider, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import {useLocation, useNavigate, useParams} from "react-router";
import useGetByToken from "../../Hooks/useGetByToken";
import useUpdateRefreshToken from "../../Hooks/useUpdateRefreshToken";
import useDecryption from "../../Hooks/useDecryption";
import usePostByToken from "../../Hooks/usePostByToken";
import CirProgress from "../../Components/CirProgress/CirProgress";
import FormControl from "@mui/material/FormControl";
import {orderStatusTable} from "../ModifyOrders/ModifyOrders";
import usePatchByToken from "../../Hooks/usePatchByToken";

const OrderContainer = (props) => {
    const navigate = useNavigate()
    const location = useLocation();
    const state = location.state;
    const params = useParams()
    let order_id = params.id
    const authContext = useContext(AuthContext)
    const [orderStatus, setOrderStatus] = useState(state.status_id)
    const [productList, setProductList] = useState([])
    const [finalProductList, setFinalProductList] = useState([])
    const [totalCount, setTotalCount] = useState()
    const [totalPrice, setTotalPrice] = useState()
    const {loadingStatus, severity, verificationMessage, open, sendRequest: getByTokenHandler, handleSnackClose } = useGetByToken()
    const {loadingStatus:loadingStat, severity:sever, verificationMessage:verificationMsg, open:ob, sendRequest: orderHandler, handleSnackClose:handleClose } = usePatchByToken()
    const {sendRequest: updateToken} = useUpdateRefreshToken()
    const {sendRequest: refreshToken} = useUpdateRefreshToken()
    const {decryption} = useDecryption()


    const orderStatusHandler = (event) => {
        setOrderStatus(event.target.value)
    }
    const fetchOrderProduct = (order_id) => {
        const applyData = (data) => {
            if (data.status) {
                const temp = [...data.result]
                setFinalProductList([...data.result])
                setProductList([...data.result])
                console.log(data.result)
                let total = 0;
                let totalPrice = 0;
                for(let p of temp){
                    total = total + parseInt(p.count)
                    totalPrice = totalPrice + parseInt(p.count) * parseInt(p.price)
                }
                setTotalCount(total)
                setTotalPrice(totalPrice)
            } else if (data.result === "Refresh-Token") {
                const applyRefresh = (data) => {
                    if (data.status) {
                        authContext.dispatch({
                            type: "update", payload: {
                                data:{
                                    role_id: data.result.id,
                                    access_token: data.result.access_token,
                                    refresh_token: data.result.refresh_token,
                                    role: props.role
                                }
                            }
                        })
                        fetchOrderProduct(order_id)
                    }
                }
                updateToken(applyRefresh).then(r => {}, error => {}).catch(e => {})
            }
        }
        getByTokenHandler({url: `/order/${order_id}`}, applyData).then(r => {}).catch(e => {})
    }
    useEffect(() => {
        console.log(state)
        fetchOrderProduct(order_id)
    }, []);
    const countAndPriceHandler = (product, count) => {
        let temp = []
        temp = [...finalProductList.filter(t => t.product_id !== product.product_id)]
        console.log(temp)
        temp.push({...product, count:count})
        setFinalProductList([...temp])
        let total = 0;
        let totalPrice = 0;
        for(let p of temp){
            total = total + parseInt(p.count)
            totalPrice = totalPrice + parseInt(p.count) * parseInt(p.price)
        }
        setTotalCount(total)
        setTotalPrice(totalPrice)
    }
    const itemHandler = (id) => {
        let temp = []
        temp = [...productList.filter(t => t.id !== id)]
        setProductList([...temp])
        setFinalProductList([...temp])
        let total = 0;
        let totalPrice = 0;
        for(let p of temp){
            total = total + parseInt(p.count)
            totalPrice = totalPrice + parseInt(p.count) * parseInt(p.price)
        }
        setTotalCount(total)
        setTotalPrice(totalPrice)
    }
    const updateOrder = () => {
        let id = ""
        decryption(localStorage.getItem("data"), (data) => {id = JSON.parse(data).role_id})
        const applyData = (data) => {
            if (data.status) {
               navigate("/dashboard/modify-orders")
            } else if(data.result === "Refresh-Token") {
                const applyRefresh = (data) => {
                    if (data.status) {
                        authContext.dispatch({
                            type: "update-token", payload: {
                                data : {
                                    role_id: data.result.id,
                                    role: "admin",
                                    access_token: data.result.access_token,
                                    refresh_token: data.result.refresh_token}
                            }
                        })
                        updateOrder()
                    }
                }
                refreshToken(applyRefresh).then(r => {}, error => {}).catch(e => {})
            }
        }
        const data = {
            agent_id: id,
            product_ids: finalProductList,
            total_price:totalPrice,
            status:orderStatus
        }
        console.log(data)
        if (totalCount > 0) {
            orderHandler({url: `/order/${order_id}`, data: data}, applyData).then(r => {}, error => {console.log(error)}).catch(e => {console.log(e)})
        }
    }
    return(
        <div className="row container-fluid g-0" style={{marginTop: 70, marginBottom: 6, justifyContent:"center"}}>
            {
                productList.length > 0 ?
                <div className="col-sm-8">
                    {
                        productList.map(product => <OrderItem role="agent" product={product} countAndPricHandler = {countAndPriceHandler} itemHandler={itemHandler}/>)
                    }
                </div>:
                <div className="col-sm-8" style={{minHeight:400, justifyContent:"center"}} >
                    <Typography variant="p" component="p" color="#000000" sx={{paddingTop:15, textAlign:"center", marginLeft:3, fontSize:30, marginBottom:2, marginRight:2}}>
                        The Cart is Empty
                    </Typography>
                </div>

            }

            <div className="col-sm-4" >
                <div style={{width:"90%"}}>
                    <Card sx={{ width:"100%", padding:1, marginTop:2}}>
                        <div>
                            <Typography variant="h2" component="h2" color="#000000" sx={{textAlign:"center", fontSize:30, marginBottom:2, marginRight:2}}>
                                Checkout
                            </Typography>
                        </div>
                        <Divider sx={{borderColor:"#16313a", borderWidth: 2, marginBottom: 2, marginTop: 2}}/>
                        <div>
                            <Typography variant="p" component="p" color="#000000" sx={{float:"left", marginLeft:3, fontSize:30, marginBottom:2, marginRight:2}}>
                                Total:
                            </Typography>
                            <Typography variant="p" component="p" color="#000000" sx={{float:"right", marginLeft:3, fontSize:30, marginBottom:2, marginRight:2}}>
                                ${totalPrice}
                            </Typography>
                        </div>
                            <Divider sx={{borderColor:"#16313a", borderWidth: 2, marginBottom: 2, marginTop: 10}}/>
                        <div>
                            <FormControl size="small" variant="standard" sx={{ marginBottom:1, marginTop:1, width:"100%" }}>
                                <InputLabel id="demo-select-small-label">Order Status</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={orderStatus}
                                    onChange={orderStatusHandler}
                                    label="Order Status"
                                >
                                    {
                                        orderStatusTable.map(table =>
                                            <MenuItem value={table.bre}>{table.name}</MenuItem>
                                        )
                                    }
                                </Select>
                            </FormControl>
                        </div>
                        <CardActions sx={{padding:"auto"}}>
                            <LoadingButton
                                variant="contained"
                                size="medium" sx={{margin:"auto", width:"100%"}} onClick={updateOrder}
                                loadingIndicator={<CirProgress width={32} height={32}/>}
                                loading={loadingStat === "loading"}
                            >
                                Update Order
                            </LoadingButton>
                        </CardActions>
                    </Card>

                </div>
            </div>
        </div>
    )
}
export default OrderContainer