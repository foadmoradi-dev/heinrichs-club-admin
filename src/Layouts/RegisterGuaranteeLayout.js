import {Fragment, useState} from "react";
import RegisterGuarantee from "../Containers/RegisterGuarantee/RegisterGuarantee";
import {useContext, useEffect} from "react";
import {AuthContext} from "../Contexts/AuthContext/AuthContext";
import {useNavigate} from "react-router";
import useDecryption from "../Hooks/useDecryption";
import {useDispatch, useSelector} from "react-redux";
import {roleSliceActions} from "../Store/roleSlice";

const RegisterGuaranteeLayout = () => {
    const roleStore = useSelector(state => state.roleSlice.role)
    const navigate = useNavigate()
    const {decryption} = useDecryption()
    const dispatch = useDispatch()
    useEffect(() => {
        let role = ""
        if(localStorage.getItem("data") !== null){
            decryption(localStorage.getItem("role"), (data) => {
                dispatch(roleSliceActions.setRole(data))
                role = JSON.parse(data).role
            })
            if(role !== "admin"){
                navigate("/")
            }

        }
    })
    return(
        <Fragment>
            {roleStore !== "admin" ? navigate("/") : <RegisterGuarantee />}
        </Fragment>
    )
}
export default RegisterGuaranteeLayout