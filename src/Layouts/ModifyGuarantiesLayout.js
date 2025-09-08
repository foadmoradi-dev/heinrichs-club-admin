import {Fragment, useEffect, useState} from "react";
import ModifyGuaranties from "../Containers/ModifyGuaranties/ModifyGuaranties";
import {useContext} from "react";
import {AuthContext} from "../Contexts/AuthContext/AuthContext";
import {useNavigate} from "react-router";
import useDecryption from "../Hooks/useDecryption";
import data from "bootstrap/js/src/dom/data";
import {useDispatch, useSelector} from "react-redux";
import {roleSliceActions} from "../Store/roleSlice";

const ModifyGuarantiesLayout = () => {
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
                console.log(role)
                console.log(roleStore)
            })
            if(role !== "admin"){
                navigate("/")
            }
        }
    })
    return (
        <Fragment>
            {roleStore !== "admin" ? navigate("/") : <ModifyGuaranties />}
        </Fragment>
    )
}
export default ModifyGuarantiesLayout