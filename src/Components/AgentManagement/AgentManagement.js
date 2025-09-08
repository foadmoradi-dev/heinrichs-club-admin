import {Card, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, Snackbar, Switch} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import {forwardRef, useContext, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router";
import useGetByToken from "../../Hooks/useGetByToken";
import usePatchByToken from "../../Hooks/usePatchByToken";
import useUpdateRefreshToken from "../../Hooks/useUpdateRefreshToken";
import {AuthContext} from "../../Contexts/AuthContext/AuthContext";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={4} ref={ref} variant="filled" {...props} />;
});
const AgentManagement = (props) => {
    const params = useParams()
    let id = params.id
    const {state} = useLocation()
    const authContext = useContext(AuthContext)
    const {loadingStatus, severity, verificationMessage, open, sendRequest: getByTokenHandler, handleSnackClose } = useGetByToken()
    const {loadingStatus: loading, severity: sev, verificationMessage : verMessage, open: op, sendRequest :updateHandler, handleSnackClose : handleClose} = usePatchByToken()
    const {sendRequest: refreshToken} = useUpdateRefreshToken()
    const [rrCount, setRRCount] = useState(state.rrCount)
    const [rCount, setRCount] = useState(state.rCount)
    const [aCount, setACount] = useState(state.aCount)
    const [agentId, setAgentId] = useState(params.id)

    const [agent, setAgent] = useState()
    const [level, setLevel] = useState()
    const [isActive, setIsActive] = useState()
    const [websiteStatus, setWebsiteStatus] = useState()
    const [socialStatus, setSocialStatus] = useState()
    const [phoneNumber, setPhoneNumber] = useState()

    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        console.log(props.agent)
        setAgent(props.agent)
        setIsActive(props.agent.is_active === "1")
        setPhoneNumber(props.agent.phone_number)
        setWebsiteStatus(props.websiteStatus === "1")
        setSocialStatus(props.socialStatus === "1")
        setLevel(props.agent.level)
        setLoaded(true)

    }, []);

    const handleChange = (event) => {
        if(!isActive)
        {
            return
        }
        const applyUpdate = (data) => {
            if (data.status) {
                setLevel(event.target.value)
                setIsActive(event.target.value > 2)
            } else if (data.result === "Refresh-Token") {
                const applyRefresh = (data) => {
                    if (data.status) {
                        authContext.dispatch({
                            type: "update", payload: {
                                data: {
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
                refreshToken(applyRefresh).then(r => {
                }, error => {
                }).catch(e => {
                })
            }
        }
        const data = {
            phone_number:phoneNumber,
            is_active:  event.target.value > 2 ? "1" : "2",
            level: event.target.value
        }
        updateHandler({
            url: '/agent/' + agentId,
            data: data
        }, applyUpdate).then(r => () => {}).catch((e) => {})
    }
    const activationHandler = () => {
        const applyUpdate = (data) => {
            if (data.status) {
                setIsActive(!isActive)
                if(isActive && level > 2){
                    setLevel(2)
                }
                if (!isActive && level < 3){
                    setLevel(3)
                }
            } else if (data.result === "Refresh-Token") {
                const applyRefresh = (data) => {
                    if (data.status) {
                        authContext.dispatch({
                            type: "update", payload: {
                                data: {
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
                refreshToken(applyRefresh).then(r => {
                }, error => {
                }).catch(e => {
                })
            }
        }
        const data = {
            phone_number:agent.phone_number,
            is_active: isActive ? "2" : "1",
            level: isActive ? "2" : "3",

        }

        updateHandler({
            url: '/agent/' + agentId,
            data: data
        }, applyUpdate).then(r => () => {}).catch((e) => {})
    }
    const websiteHandler = () => {
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
                        websiteHandler()
                    }
                }
                refreshToken(applyRefresh).then(r => {}, error => {}).catch(e =>{})
            }
        }
        const data = {
            is_active: websiteStatus ? "2" : "1",
            social_active: socialStatus ? "1" : "2",
        }
        if(isActive){
            updateHandler({
                url:'/cert/' + agentId,
                data:data
            }, applyData).then((r) => {}).catch((e) => {})
        }
    }

    const socialHandler = () => {
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
                        socialHandler()
                    }
                }
                refreshToken(applyRefresh).then(r => {}, error => {}).catch(e =>{})
            }
        }
        const data = {
            is_active: websiteStatus ? "1" : "2",
            social_active: socialStatus ? "2" : "1",
        }
        if(isActive){
            updateHandler({
                url:'/cert/' + agentId,
                data:data
            }, applyData).then((r) => {}).catch((e) => {})
        }
    }

    return (
        <Card sx={{marginRight:"auto", marginLeft:"auto", width:"90%", padding:1}}>
            {
                agent ?
                <FormGroup>
                    <FormControlLabel label="Agent Activation" control={<Switch checked={isActive} onChange={activationHandler}  />}  />
                    <FormControlLabel label="Website Activation"  control={<Switch checked={websiteStatus} onChange={websiteHandler} />} />
                    <FormControlLabel label="Social Activation"  control={<Switch checked={socialStatus} onChange={socialHandler} />} />
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Level</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={level}
                            onChange={handleChange}
                            label="Level"
                        >
                            <MenuItem value={1}>Level 1</MenuItem>
                            <MenuItem value={2}>Level 2</MenuItem>
                            <MenuItem value={3}>Level 3</MenuItem>
                            <MenuItem value={4}>Level 4</MenuItem>
                        </Select>
                    </FormControl>
                </FormGroup> : null
            }
            <Snackbar  open={open || op} autoHideDuration={4000} onClose={open ? handleSnackClose : op ? handleClose: null }>
                <Alert onClose={open ? handleSnackClose : op ? handleClose : null} severity={severity || sev} sx={{ width: 400 }}>
                    {verificationMessage ||  verMessage}
                </Alert>
            </Snackbar>
        </Card>
    )
}
export default AgentManagement