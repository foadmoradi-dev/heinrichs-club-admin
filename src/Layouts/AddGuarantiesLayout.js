import {Fragment, useContext, useEffect, useState} from "react";
import AddGuarantiesContainer from "../Containers/AddGuarantiesContainer/AddGuarantiesContainer";
import {AuthContext} from "../Contexts/AuthContext/AuthContext";
import {useNavigate} from "react-router";
import useDecryption from "../Hooks/useDecryption";
import {useDispatch, useSelector} from "react-redux";
import {roleSliceActions} from "../Store/roleSlice";

const AddGuarantiesLayout = () => {
    const roleStore = useSelector(state => state.roleSlice.role)
    const dispatch = useDispatch()
    const {decryption} = useDecryption()
    const navigate = useNavigate()
    useEffect(() => {
        let role = ""
        if(localStorage.getItem("data") !== null)
        {
            decryption(localStorage.getItem("data"), (data) => {
                dispatch(roleSliceActions.setRole(JSON.parse(data).role))
                    role = JSON.parse(data).role
            })
            if(role !== "admin"){
                navigate("/")
            }
        }

    }, [])
    return(
        <Fragment>
            {roleStore !== "admin" ? navigate("/") :<AddGuarantiesContainer />}
        </Fragment>
    )
}
export default  AddGuarantiesLayout