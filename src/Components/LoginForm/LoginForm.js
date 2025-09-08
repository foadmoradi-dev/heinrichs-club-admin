import {Card, CardActions, CardContent, Divider, Link, Snackbar, TextField, Typography} from "@mui/material";
import {useState, forwardRef, useContext, Fragment} from "react";
import MuiAlert from "@mui/material/Alert";
import {useNavigate} from "react-router";
import {AuthContext} from "../../Contexts/AuthContext/AuthContext";
import usePost from "../../Hooks/usePost";
import LoadingButton from '@mui/lab/LoadingButton';
import CirProgress from "../CirProgress/CirProgress";
import {roleSliceActions} from "../../Store/roleSlice";
import {useDispatch} from "react-redux";

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LoginForm = () => {
    const navigate = useNavigate()
    const authContext = useContext(AuthContext)
    const [isErrorUsername, setIsErrorUsername] = useState(true)
    const [isErrorPassword, setIsErrorPassword] = useState(true)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isEnteringData, setISEnteringData] = useState()
    const dispatch = useDispatch()
    const applyData = (data) => {
        if (data.status) {
            authContext.dispatch({
                type: "login", payload: {
                    data :{
                        role_id: data.result.id,
                        access_token: data.result.access_token,
                        refresh_token: data.result.refresh_token,
                        role: "admin"
                    },
                    exp_time: new Date(new Date().getTime() + 900000),

                }
            })
            dispatch(roleSliceActions.setRole("admin"))
            navigate("/dashboard", {replace: true})
            setTimeout(() => {
                navigate("/login")
            }, 900000)
        }
    }
    const {loadingStatus, severity, verificationMessage, open, sendRequest: postHandler, handleSnackClose } = usePost()
    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    const usernameHandler = (event) => {
        if(validateEmail(event.target.value)){
            setIsErrorUsername(false)
        }else if (/^\d+$/.test(event.target.value) && event.target.value.length === 11){
            setIsErrorUsername(false)
        }
        else{
            setIsErrorUsername(true)
        }
        setUsername(event.target.value)
    }
    const passwordHandler = (event) => {
        event.target.value.length < 8 ?setIsErrorPassword(true) : setIsErrorPassword(false)
        setPassword(event.target.value)
    }
    const loginHandler = async (event) => {
        event.preventDefault()
        if (!(isErrorUsername || isErrorPassword)) {
            const data = {
                username: username,
                password: password,
                role: "admin",
            }
            const url = '/admin-login.php'
            await postHandler({url, data}, applyData)
        }
    }
    const formFocusHandler = () => {
        setISEnteringData(true)
    }
    return(
        <Fragment>
            <Card sx={{marginRight:"auto", marginLeft:"auto", width:400, padding:1}} >
                <CardContent>
                    <Typography  variant="p" component="div" color="#000000" sx={{fontStyle:"italic", fontSize:20, marginBottom:2}}>
                        Admins Login Form
                    </Typography>
                    <Divider sx={{borderColor:"#bd04f6", borderWidth: 5}}/>
                    <TextField sx={{width:"90%", margin:2}}
                               error={isErrorUsername}
                               id="standard-helperText"
                               label="Email or Phone Number"
                               helperText="You Should Use One of Them"
                               variant="standard"
                               onChange={usernameHandler}
                               disabled={loadingStatus === "loading"}
                    />
                    <TextField sx={{width:"90%", margin:2}}
                               error={isErrorPassword}
                               id="password-helperText"
                               label="Password"
                               helperText="Please Enter Correct Password"
                               variant="standard"
                               type="password"
                               onChange={passwordHandler}
                               disabled={loadingStatus === "loading"}
                    />
                </CardContent>
                <CardActions sx={{padding:"auto"}}>
                    <LoadingButton
                        loading={loadingStatus === "loading"}
                        size="medium" sx={{margin:"auto"}}
                        onClick={loginHandler}
                        loadingIndicator={<CirProgress width={32} height={32}/>}
                    >
                        Login
                    </LoadingButton>
                    <Typography variant="p" component="div" color="#000000" sx={{ fontSize:11,margin:"auto"}}>
                        <Link onClick={() => {navigate("/otp")}} sx={{textDecoration:"none", color:"#9c22be"}}>Login by OTP?</Link>
                    </Typography>
                </CardActions>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackClose}>
                    <Alert onClose={handleSnackClose} severity={severity} sx={{ width: '100%' }}>
                        {verificationMessage}
                    </Alert>
                </Snackbar>
            </Card>
        </Fragment>

    )
}
export default LoginForm