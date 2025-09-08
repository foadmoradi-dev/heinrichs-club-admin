import {Fragment, useState} from "react";
import Dashboard from "../Containers/Dashboard/Dashboard";
import {useContext, useEffect} from "react";
import {AuthContext} from "../Contexts/AuthContext/AuthContext";
import {useNavigate} from "react-router";
import useDecryption from "../Hooks/useDecryption";
import {useDispatch, useSelector} from "react-redux";
import {roleSliceActions} from "../Store/roleSlice";

const DashboardLayout = () => {
    const dispatch = useDispatch()
    const {decryption} = useDecryption()
    const navigate = useNavigate()
    const roleStore = useSelector(state => state.roleSlice.role)
    const [role, setRole] = useState("")
    useEffect(() => {

        let role = ""
        if(localStorage.getItem("data") !== null){
            decryption(localStorage.getItem("data"), (data) => {
                dispatch(roleSliceActions.setRole(JSON.parse(data).role))
                role = JSON.parse(data).role
                setRole(JSON.parse(data).role)
            })
            if(role !== "admin"){
                navigate("/")
            }
        }
    })

    return(
        <Fragment>
            {roleStore !== "admin" ? navigate("/") : <Dashboard/> }
        </Fragment>
    )
}
export default DashboardLayout