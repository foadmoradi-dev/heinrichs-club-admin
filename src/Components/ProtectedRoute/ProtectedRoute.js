import {Navigate} from "react-router"
import useDecryption from "../../Hooks/useDecryption";
const ProtectedRoute = (props) => {
    const {decryption } = useDecryption()
    let role = ""
    decryption(localStorage.getItem("data"), (data) => {
        role = JSON.parse(data).role
    })
    if(role !== "admin"){
        return(
            <Navigate to={"/"} />
        )
    }
    return (
        props.children
    )
}
export default ProtectedRoute