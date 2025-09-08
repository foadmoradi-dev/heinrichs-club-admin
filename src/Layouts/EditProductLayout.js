import {Fragment} from "react";
import EditProduct from "../Containers/EditProduct/EditProduct";
import {useContext, useEffect} from "react";
import {AuthContext} from "../Contexts/AuthContext/AuthContext";
import {useNavigate} from "react-router";
import useDecryption from "../Hooks/useDecryption";
import {useDispatch, useSelector} from "react-redux";
import {roleSliceActions} from "../Store/roleSlice";

const EditProductLayout = () => {
    const roleStore = useSelector(state => state.roleSlice.role)
    const navigate = useNavigate()
    const {decryption} = useDecryption()
    const dispatch = useDispatch()
    useEffect(() => {
        let role = ""
        if(localStorage.getItem("data") !== null){
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
            {roleStore !== "admin" ? navigate("/") :<EditProduct /> }
        </Fragment>
    )
}
export default EditProductLayout