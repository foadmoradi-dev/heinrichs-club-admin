import {Fragment} from "react";
import EditProduct from "../Containers/EditProduct/EditProduct";
import {useContext, useEffect} from "react";
import {AuthContext} from "../Contexts/AuthContext/AuthContext";
import {useNavigate} from "react-router";
import useDecryption from "../Hooks/useDecryption";
import {useDispatch, useSelector} from "react-redux";
import {roleSliceActions} from "../Store/roleSlice";
import EditAgent from "../Containers/EditAgent/EditAgent";

const EditAgentLayout = () => {
    const roleStore = useSelector(state => state.roleSlice.role)
    const navigate = useNavigate()
    const {decryption} = useDecryption()
    const dispatch = useDispatch()
    useEffect(() => {
        let role = ""
        if(localStorage.getItem("data") === null){
            decryption(localStorage.getItem("level"), (data) => {
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
            {roleStore !== "admin" ? navigate("/") :<EditAgent /> }
        </Fragment>
    )
}
export default EditAgentLayout