import {Alert,Box, Button, Card,CardActions,CardContent, CircularProgress,Divider,Snackbar,TextField,Typography} from "@mui/material";
import AuthCode from "react-auth-code-input";
import {CountdownCircleTimer} from "react-countdown-circle-timer";
import {useContext, useState} from "react";
import {AuthContext} from "../../Contexts/AuthContext/AuthContext";
import {useNavigate} from "react-router";
import "./AuthStyle.css"
import OtpInput from "react-otp-input";
import usePost from "../../Hooks/usePost";
const LoginByOTP = () => {
    const authContext = useContext(AuthContext)
    const navigate = useNavigate()
    const [isErrorPhoneNumber, setIsErrorPhoneNumber] = useState(true)
    const [phoneNumber, setPhoneNumber] = useState("")
    const [resetCounter, setResetCounter] = useState(false)
    const [isValid, setIsValid] = useState(false)
    const [remainTime , setRemainTime] =useState(1)
    const [actor, setActor] = useState("agent")
    const [code, setCode] = useState("")
    const [open , setOpen] = useState(false)
    const [verificationMessage, setVerificationMessage] = useState("")
    const [severity, setSeverity] = useState("")
    const [loadingStatus, setLoadingStatus] = useState("")
    const {loadingStatus: loading, sendRequest: post, handleSnackClose: handleClose, open: op, severity:sever, verificationMessage: message} = usePost()
    const phoneNumberHandler = (event) => {
        event.target.value.length !== 11 ? setIsErrorPhoneNumber(true) : setIsErrorPhoneNumber(false)
        setPhoneNumber(event.target.value)
    }
    const actorHandler = (event) => {
        setActor(event.target._wrapperState.initialValue)
    }
    const verify = () => {
        const applyData = (data) => {
            if (data.status) {
                setResetCounter(true)
                setRemainTime(1)
            }
        }

        if (!isErrorPhoneNumber) {
            setTimeout(() => {
                setRemainTime(0)
            }, 60000)
            setIsValid(true)
            const data = {
                phone_number: phoneNumber,
            }
            post({url: '/sms-verification.php', data:data}, applyData).then(r => {}, error => {}).catch(e => {})
        }
    }
    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const auth = (res) => {
        const applyData = (data) => {
            if (data.status) {
                setResetCounter(true)
                setRemainTime(1)
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
                navigate("/dashboard", {replace: true})
                setTimeout(() => {
                    navigate("/login")
                }, 900000)
            }
        }
        const data = {
            phone_number: phoneNumber,
            code:res,
        }
        post({url:'/admin-otp-login.php', data:data}, applyData).then(r => {}, error => {}).catch(e => {})
    }
    const authChangeHandler = async (res) => {
        setCode(res)
        if (res.length === 5) {
            setLoadingStatus("loading")
            if (remainTime === 0) {
                setOpen(true)
                setSeverity("error")
                setVerificationMessage("verification Code is Deprecated")
                return
            }
           auth(res)
        }
    }
    const resendCodeHandler = () => {

    }
    return(
        <div className="row" style={{marginTop: 70, marginBottom: 6}}>
            <Card sx={{marginRight:"auto", marginLeft:"auto", width:"90%", padding:1}}>
                {
                    loadingStatus==="loading"?
                        <Box sx={{ display: 'flex', width:"100%", height:"100%",paddingLeft:"40%", paddingTop:"135px", position:"fixed", zIndex:100 }}>
                            <CircularProgress />
                        </Box>:
                        null
                }
                <CardContent>
                    <Typography variant="p" component="div" color="#000000" sx={{fontStyle:"italic", fontSize:20, marginBottom:2}}>
                        Admin Login By OTP
                    </Typography>
                    <Divider sx={{borderColor:"#bd04f6", borderWidth: 5}}/>
                    <TextField sx={{width:"90%"}}
                               error={isErrorPhoneNumber}
                               id="phone_number"
                               label="Phone Number"
                               helperText="Phone Number must be 11 letter at least"
                               variant="standard"
                               type="number"
                               onChange={phoneNumberHandler}
                               disabled={resetCounter}
                    />
                </CardContent>
                <CardActions>
                    <Button onClick={verify} variant="contained" size="medium" sx={{marginTop:5, marginBottom:5,  backgroundColor:"#30be9c"}} disabled={resetCounter}>Verify</Button>
                    <Button variant="contained" size="medium" sx={{marginTop:5, marginBottom:5, marginLeft: 5, backgroundColor:"#30be9c"}}>Helps & Docs</Button>
                </CardActions>
                {isValid ?
                    <div className="row">
                        <div className="col-auto">
                            {/*<AuthCode  containerClassName='container' inputClassName='input' length={5}*/}
                            {/*           onChange={authChangeHandler}*/}
                            {/*/>*/}
                            <OtpInput
                                skipDefaultStyles={true}
                                value={code}
                                onChange={authChangeHandler}
                                numInputs={5}
                                renderSeparator={<span>-</span>}
                                inputStyle={"otp-input"}
                                renderInput={(props) => <input className="otp-input" {...props} />}
                                inputType={"tel"}
                                shouldAutoFocus={true}

                            />
                        </div>
                        <div className="col-auto" style={{ marginRight:"auto"}}>
                            {
                                resetCounter ?
                                    <CountdownCircleTimer
                                        isPlaying
                                        duration={60}
                                        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                                        colorsTime={[60, 45, 30, 15]}
                                        size="45"
                                        strokeWidth="2"
                                    >
                                        {
                                            ({ remainingTime }) =>
                                                remainingTime > 0 ?
                                                    <div style={{paddingRight:5, paddingBottom:10, display:"flex", justifyContent: "center", alignItems: "center", position: "absolute", left: 0, top: 0, width: 50, height: 50,}}>
                                                        {
                                                            remainingTime
                                                        }
                                                    </div>: setResetCounter(false)
                                        }
                                    </CountdownCircleTimer>
                                    :
                                    <Button onClick={resendCodeHandler} >Resend</Button>
                            }

                        </div>
                    </div>
                    :null}
                <Snackbar open={open || op} autoHideDuration={6000} onClose={open ? handleSnackClose : op ?handleClose : null}>
                    <Alert onClose={open ? handleSnackClose : op ?handleClose : null} severity={severity || sever} sx={{ width: 400 }}>
                        {open ? verificationMessage : op ? message : null}
                    </Alert>
                </Snackbar>
            </Card>
        </div>
    )
}
export default LoginByOTP