import {
    Avatar,
    Box,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CircularProgress,
    Divider, Grid,
    IconButton,
    Snackbar,
    Typography
} from "@mui/material";
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import MobileOffIcon from '@mui/icons-material/MobileOff';
import {red} from "@mui/material/colors";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import {useContext, useEffect, useState} from "react";
import {forwardRef, Fragment} from "react";
import MuiAlert from "@mui/material/Alert";
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import WebAssetOffIcon from '@mui/icons-material/WebAssetOff';
import useGetByToken from "../../Hooks/useGetByToken";
import usePatchByToken from "../../Hooks/usePatchByToken";
import useUpdateRefreshToken from "../../Hooks/useUpdateRefreshToken";
import {AuthContext} from "../../Contexts/AuthContext/AuthContext";
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import {useNavigate} from "react-router";

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={4} ref={ref} variant="filled" {...props} />;
});
const Agent = (props) => {
    const {loadingStatus, severity, verificationMessage, open, sendRequest: getByTokenHandler, handleSnackClose } = useGetByToken()
    const {loadingStatus: loading, severity: sev, verificationMessage : verMessage, open: op, sendRequest :updateHandler, handleSnackClose : handleClose} = usePatchByToken()
    const {sendRequest: refreshToken} = useUpdateRefreshToken()
    const [isActive, setIsActive] = useState(false)
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [address, setAddress] = useState("")
    const [id, setId] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [webAddress, setWebAddress] = useState("")
    const [socialAddress, setSocialAddress] = useState("")
    const [date, setDate] = useState()
    const [websiteStatus, setWebsiteStatus] = useState(false)
    const [socialStatus, setSocialStatus] = useState(false)
    const [level, setLevel] = useState("0")
    const [rrCount, setRRCount] = useState("0")
    const [rCount, setRCount] = useState("0")
    const [aCount, setACount] = useState("0")

    const authContext = useContext(AuthContext)
    const navigate = useNavigate()
    const downloadData = (id) => {
        const applyData = (data) => {
            if (data.status) {
                setWebsiteStatus(data.result.is_active === "1")
                setSocialStatus(data.result.social_active === "1")
            }else if(data.result === "Refresh-Token"){
                const applyRefresh = (data) => {
                    if(data.status){
                        authContext.dispatch({
                            type: "update", payload: {
                                data :{
                                    role_id: data.result.id,
                                    access_token: data.result.access_token,
                                    refresh_token: data.result.refresh_token,
                                    role: "admin"
                                }
                            }
                        })
                        downloadData(id)
                    }
                }
                refreshToken(applyRefresh).then(r => {}, error => {}).catch(e =>{})
            }
        }
        getByTokenHandler({url: '/cert/' + id}, applyData).then(r => {}).catch(e => {})
    }
    const getGuaranteeData = (id) => {
        const applyData = (data) => {
            if (data.status) {
                setRRCount(data.result.rrcount)
                setRCount(data.result.rcount)
                setACount(data.result.acount)
            }else if(data.result === "Refresh-Token"){
                const applyRefresh = (data) => {
                    if(data.status){
                        authContext.dispatch({
                            type: "update", payload: {
                                data :{
                                    role_id: data.result.id,
                                    access_token: data.result.access_token,
                                    refresh_token: data.result.refresh_token,
                                    role: "admin"
                                }
                            }
                        })
                        downloadData(id)
                    }
                }
                refreshToken(applyRefresh).then(r => {}, error => {}).catch(e =>{})
            }
        }
        getByTokenHandler({url: '/guarantee/' + id}, applyData).then(r => {}).catch(e => {})
    }
    useEffect(() => {
        setIsActive(props.agent.is_active === "1" )
        setFirstname(props.agent.first_name)
        setLastname(props.agent.last_name)
        setAddress(props.agent.address)
        setPhoneNumber(props.agent.phone_number)
        setWebAddress(props.agent.web_address)
        setSocialAddress(props.agent.social_address)
        setEmail(props.agent.email)
        setDate(props.agent.update_date)
        setId(props.agent.id)
        setLevel(props.agent.level)
        downloadData(props.agent.id)
        getGuaranteeData(props.agent.id)
    }, [])
    const websiteActivationHandler = () => {
        const applyData = (data) => {
            if(data.status){
                setWebsiteStatus(!websiteStatus)
            } else if(data.result === "Refresh-Token"){
                const applyRefresh = (data) => {
                    if(data.status){
                        authContext.dispatch({
                            type: "update", payload: {
                                data :{
                                    role_id: data.result.id,
                                    access_token: data.result.access_token,
                                    refresh_token: data.result.refresh_token,
                                    role: "admin"
                                }
                            }
                        })
                        websiteActivationHandler()
                    }
                }
                refreshToken(applyRefresh).then(r => {}, error => {}).catch(e =>{})
            }
        }
        const data = {
            is_active: websiteStatus ? "2" : "1",
            social_active: socialStatus ? "1" : "2",
        }
        if(webAddress !== "" && isActive){
            updateHandler({
                url:'/cert/' + id,
                data:data
            }, applyData).then((r) => {}).catch((e) => {})
        }
    }
    const socialActivationHandler = () => {
        const applyData = (data) => {
            if(data.status){
                setSocialStatus(!socialStatus)
            } else if(data.result === "Refresh-Token"){
                const applyRefresh = (data) => {
                    if(data.status){
                        authContext.dispatch({
                            type: "update", payload: {
                                data :{
                                    role_id: data.result.id,
                                    access_token: data.result.access_token,
                                    refresh_token: data.result.refresh_token,
                                    role: "admin"
                                }
                            }
                        })
                        websiteActivationHandler()
                    }
                }
                refreshToken(applyRefresh).then(r => {}, error => {}).catch(e =>{})
            }
        }
        const data = {
            is_active: websiteStatus ? "1" : "2",
            social_active: socialStatus ? "2" : "1",
        }
        console.log(data)
        if(webAddress !== "" && isActive){
            updateHandler({
                url:'/cert/' + id,
                data:data
            }, applyData).then((r) => {}).catch((e) => {})
        }
    }
    const activationHandler = () => {
        const applyUpdate = (data) => {
            if (data.status) {
                setIsActive(!isActive)
            }else if(data.result === "Refresh-Token"){
                const applyRefresh = (data) => {
                    if(data.status){
                        authContext.dispatch({
                            type: "update", payload: {
                                data:{
                                    role_id: data.result.id,
                                    access_token: data.result.access_token,
                                    refresh_token: data.result.refresh_token,
                                    role: "admin"
                                }
                            }
                        })
                        activationHandler()
                    }
                }
                refreshToken(applyRefresh).then(r => {}, error => {}).catch(e =>{})
            }
        }
        const data = {
            is_active: isActive ? "2" : "1",
            phone_number: phoneNumber,
            level: isActive ? "2" : "3",
        }
        updateHandler({
            url: '/agent/' + id,
            data: data
        }, applyUpdate).then(r => () => {}).catch((e) => {})
    }
    const deleteHandler = () => {

    }
    const editHandler = () => {
        navigate("/dashboard/edit-agent/"+id, {
            state: {
                rrCount:rrCount,
                rCount:rCount,
                aCount:aCount

            }
        })
    }
    return(
        <Fragment>
            <Card sx={{ margin:2, minHeight: 300 }}>
                <CardHeader
                    sx={{backgroundColor: "#0d7881", color:"#fff"}}
                    avatar={
                        <Avatar sx={{ color: red[400] }} aria-label="recipe">
                            {firstname.charAt(0).toUpperCase() + lastname.charAt(0).toUpperCase()}
                        </Avatar>
                    }
                    title={firstname+ " " + lastname}
                    subheader={date}
                />
                <CardContent>
                    <PhoneAndroidIcon sx={{marginTop:1}}/>
                    <Typography variant="body2" color="text.secondary" sx={{minHeight: 20, fontSize:20}} >
                        {
                            phoneNumber
                        }
                    </Typography>
                    <MarkEmailReadIcon sx={{marginTop:1}} />
                    <Typography variant="body2" color="text.secondary" sx={{minHeight: 20, fontSize:15}} >
                        {
                            email
                        }
                    </Typography>
                    <LocationOnIcon sx={{marginTop:1}} />
                    <Typography variant="body2" color="text.secondary" sx={{minHeight: 40}} >
                        {
                            address
                        }
                    </Typography>
                    <LanguageIcon sx={{marginTop:2}}/>
                    <Typography variant="body2" color="text.secondary" >
                        <a href={webAddress !=="" ? "https://" + webAddress: null} target="_blank" underline="none">
                            {webAddress !=="" ? webAddress: "web address Not Inserted Yet"}
                        </a>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" >
                        <a href={socialAddress !=="" ? socialAddress: null} target="_blank" underline="none">
                            {socialAddress !=="" ? socialAddress: "social address Not Inserted Yet"}
                        </a>
                    </Typography>
                    <Divider />
                    <div className="row" >
                        <div className="col-sm"  style={{borderStyle:"solid", borderWidth:2, borderColor: "#602669" , borderRadius: 10, margin:10}}>
                            <Typography variant="body2" color="text.secondary" style={{fontSize:20}}>
                                {
                                    loadingStatus === "loading" || loading === "loading"  ?
                                        <CircularProgress size={20}/>  : rrCount
                                }
                            </Typography>
                        </div>
                        <div className="col-sm"  style={{borderStyle:"solid", borderWidth:2, borderColor: "#602669" , borderRadius: 10, margin:10}}>
                            <Typography variant="body2" color="text.secondary" style={{fontSize:20}}>
                                {
                                    loadingStatus === "loading" || loading === "loading"  ?
                                        <CircularProgress size={20}/>  : rCount
                                }
                            </Typography>
                        </div>
                        <div className="col-sm "  style={{borderStyle:"solid", borderWidth:2, borderColor: "#602669" , borderRadius: 10, margin:10}}>
                            <Typography variant="body2" color="text.secondary" style={{fontSize:20}}>
                                {
                                    loadingStatus === "loading" || loading === "loading"  ?
                                        <CircularProgress size={20}/>  : aCount
                                }
                            </Typography>
                        </div>
                    </div>
                </CardContent>
                <CardActions disableSpacing sx={{backgroundColor: "#00ffeb", margin:"auto", position:"relative"}}>
                    <IconButton aria-label="delete">
                        <DeleteIcon onClick={deleteHandler} />
                    </IconButton>
                    <IconButton aria-label="edit">
                        <EditIcon onClick={editHandler} />
                    </IconButton>
                    <IconButton aria-label="share">
                        {
                            loadingStatus === "loading" || loading === "loading"  ?
                                <CircularProgress size={30}/> :isActive  ? <CheckIcon onClick={activationHandler} /> :
                                    <RadioButtonUncheckedIcon onClick={activationHandler} />
                        }
                    </IconButton>
                    <IconButton aria-label="website">
                        {
                            loadingStatus === "loading" || loading === "loading"  ?
                                <CircularProgress size={30} /> : websiteStatus ?
                                    <WebAssetIcon onClick={websiteActivationHandler}/> :
                                    <WebAssetOffIcon onClick={websiteActivationHandler} />
                        }
                    </IconButton>
                    <IconButton aria-label="social">
                        {
                            loadingStatus === "loading" || loading === "loading"  ?
                                <CircularProgress size={30} /> : socialStatus ?
                                    <MobileFriendlyIcon onClick={socialActivationHandler}/> :
                                    <MobileOffIcon onClick={socialActivationHandler} />
                        }
                    </IconButton>
                    <div style={{borderStyle:"solid", borderWidth:2, paddingLeft:10, paddingRight:10, borderColor:"#b4a514", borderRadius:5, right:10, position:"absolute"}}>
                        <Typography variant="body2" color="text.secondary" style={{fontSize:20}}>
                            {
                                loadingStatus === "loading" || loading === "loading"  ?
                                    <CircularProgress size={20}/>  : level
                            }
                        </Typography>
                    </div>
                </CardActions>
                <Snackbar  open={open || op} autoHideDuration={4000} onClose={open ? handleSnackClose : op ? handleClose: null }>
                    <Alert onClose={open ? handleSnackClose : op ? handleClose : null} severity={severity || sev} sx={{ width: 400 }}>
                        {verificationMessage ||  verMessage}
                    </Alert>
                </Snackbar>
            </Card>
        </Fragment>
    )
}
export default Agent