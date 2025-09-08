import {Fragment, useState} from "react";
import ModifyAgents from "../Containers/ModifyAgents/ModifyAgents";
import {useContext, useEffect} from "react";
import {AuthContext} from "../Contexts/AuthContext/AuthContext";
import {useNavigate} from "react-router";
import useDecryption from "../Hooks/useDecryption";
import {useDispatch, useSelector} from "react-redux";
import {roleSliceActions} from "../Store/roleSlice";
import ModifyOrders from "../Containers/ModifyOrders/ModifyOrders";
const ModifyOrdersLayout = () => {
    const navigate = useNavigate()
    const {decryption} = useDecryption()
    const dispatch = useDispatch()
    const roleStore = useSelector(state => state.roleSlice.role)
    useEffect(() => {
        let role = ""
        if(localStorage.getItem("data") !== null){
            decryption(localStorage.getItem("data"), (data) => {
                dispatch(roleSliceActions.setRole(JSON.parse(data).role))
                role = JSON.parse(data).role
            })
            if(localStorage.getItem("data") === null || role !== "admin"){
                navigate("/")
            }
        }
    }, [])
    return(
        <Fragment>
            {roleStore !== "admin" ? navigate("/") : <ModifyOrders /> }
        </Fragment>
    )

}
export default ModifyOrdersLayout