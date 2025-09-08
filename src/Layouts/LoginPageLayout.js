import {Fragment, useContext, useEffect} from "react"
import Login from "../Containers/Login/Login";
import {AuthContext} from "../Contexts/AuthContext/AuthContext";
import {useNavigate} from "react-router";
const LoginPageLayout = () => {
    const loginContext = useContext(AuthContext)
    const navigate = useNavigate()

    return(
        <Fragment>
            <Login />
        </Fragment>
    )
}
export default LoginPageLayout