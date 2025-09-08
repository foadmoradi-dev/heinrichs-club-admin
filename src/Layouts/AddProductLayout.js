import {Fragment, useState} from "react";
import AddProduct from "../Containers/AddProduct/AddProduct";
import {useContext, useEffect} from "react";
import {AuthContext} from "../Contexts/AuthContext/AuthContext";
import {useNavigate} from "react-router";
import useDecryption from "../Hooks/useDecryption";
import {roleSliceActions} from "../Store/roleSlice";
import {useDispatch, useSelector} from "react-redux";

const AddProductLayout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {decryption} = useDecryption()
    const roleStore = useSelector(state => state.roleSlice.role)
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

    })
    return(
        <Fragment>
            {roleStore !== "admin" ? navigate("/") : <AddProduct /> }
        </Fragment>
    )
}
export default AddProductLayout