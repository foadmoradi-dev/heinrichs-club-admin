import {Fragment, useState} from "react";
import {useEffect} from "react";
import {useNavigate} from "react-router";
import useDecryption from "../Hooks/useDecryption";
import {useDispatch, useSelector} from "react-redux";
import {roleSliceActions} from "../Store/roleSlice";
import OrderContainer from "../Containers/OrderContainer/OrderContainer";

const OrderLayout = () => {
    const roleStore = useSelector(state => state.roleSlice.role)
    const navigate = useNavigate()
    const {decryption} = useDecryption()
    const dispatch = useDispatch()
    const [id, setId] = useState()
    useEffect(() => {
        let role = ""
        if(localStorage.getItem("data") !== null){
            decryption(localStorage.getItem("data"), (data) => {
                dispatch(roleSliceActions.setRole(JSON.parse(data).role))
                role = JSON.parse(data).role
                setId(JSON.parse(data).role_id)
            })
            if(role !== "admin"){
                navigate("/")
            }
        }
    })
    return(
        <Fragment>
            {roleStore !== "admin" ? navigate("/") : id && <OrderContainer /> }
        </Fragment>
    )
}
export default OrderLayout