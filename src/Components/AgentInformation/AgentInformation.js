import {Alert, Card, CardActions, CardContent, Divider, Snackbar, TextField, Typography} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import CirProgress from "../CirProgress/CirProgress";
import {useNavigate, useParams} from "react-router";
import {useContext, useEffect, useState} from "react";
import useUpdateRefreshToken from "../../Hooks/useUpdateRefreshToken";
import useDecryption from "../../Hooks/useDecryption";
import usePatchByToken from "../../Hooks/usePatchByToken";
import {AuthContext} from "../../Contexts/AuthContext/AuthContext";
import useGetByToken from "../../Hooks/useGetByToken";

const AgentInformation = (props) => {
    const params = useParams()
    let id = props.agent.id
    const [agent, setAgent] = useState(false)
    const authContext = useContext(AuthContext)
    const [isErrorFirstname, setIsErrorFirstname] = useState()
    const [isErrorLastname, setIsErrorLastname] = useState()
    const [isErrorEmail, setIsErrorEmail] = useState()
    const [isErrorAddress, setIsErrorAddress] = useState()
    const navigate = useNavigate()
    const [firstname, setFirstname] = useState()
    const [lastname, setLastname] = useState()
    const [address, setAddress] = useState()
    const [email , setEmail] = useState()
    const [pass, setPass] = useState("")
    const [web, setWeb] = useState("")
    const [socialAddress, setSocialAddress] = useState("")
    const {sendRequest: refreshToken} = useUpdateRefreshToken()
    const {verificationMessage, loadingStatus, sendRequest: patchHandler, open, handleSnackClose, severity} = usePatchByToken()
    const {decryption} = useDecryption()
    const [loaded, setLoaded] = useState(false)
    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    useEffect(() => {
        setFirstname(props.agent.first_name)
        setLastname(props.agent.last_name)
        setAddress(props.agent.address)
        setEmail(props.agent.email)
        setWeb(props.agent.web_address)
        setSocialAddress(props.agent.social_address)
        setLoaded(true)
    }, [])
    const firstNameHandler = (event) => {
        event.target.value.length < 3 ? setIsErrorFirstname(true) : setIsErrorFirstname(false)
        setFirstname(event.target.value)
    }
    const secondNameHandler = (event) => {
        event.target.value.length < 5 ? setIsErrorLastname(true) : setIsErrorLastname(false)
        setLastname(event.target.value)
    }
    const emailHandler = (event) => {
        validateEmail(event.target.value) ? setIsErrorEmail(false) : setIsErrorEmail(true)
        setEmail(event.target.value)
    }
    const addressHandler = (event) => {
        event.target.value.length < 40 ? setIsErrorAddress(true) : setIsErrorAddress(false)
        setAddress(event.target.value)
    }
    const webHandler = (event) => {
        setWeb(event.target.value)
    }
    const socialHandler = (event) => {
        setSocialAddress(event.target.value)
    }
    const passHandler = (event) => {
        setPass(event.target.value)
    }
    const update = () => {
        let admin_id = ""
        decryption(localStorage.getItem("data"), (data) => {
            admin_id = JSON.parse(data).role_id
        })

        const applyData = (data) => {
            if (data.status) {
                //navigate("/agent-dashboard")
            } else if(data.result === "Refresh-Token") {
                const applyRefresh = (data) => {
                    if (data.status) {
                        authContext.dispatch({
                            type: "update-token", payload: {
                                data: {
                                    role_id: data.result.id,
                                    role: "admin",
                                    access_token: data.result.access_token,
                                    refresh_token: data.result.refresh_token
                                }
                            }
                        })
                        update()
                    }
                }
                refreshToken(applyRefresh).then(r => {}, error => {}).catch(e => {})
            }
        }
        const data = {
            phone_number:props.agent.phone_number,
            first_name: firstname,
            last_name: lastname,
            email:email,
            address: address,
            web_address:web.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0],
            social_address: socialAddress,
            password:pass,
        }
        if (!(isErrorFirstname || isErrorLastname || isErrorEmail || isErrorAddress)) {
            patchHandler({url: '/agent/' + id, data: data}, applyData).then(r => {}, error => {}).catch(e => {})
        }
    }
    return (
        <Card sx={{marginRight:"auto", marginLeft:"auto", width:"90%", padding:1}}>
            {
            loaded ?
                <CardContent>
                    <Typography variant="p" component="div" color="#000000" sx={{ fontSize:20, marginBottom:2}}>
                        Please Complete your Registration to access All Components
                    </Typography>
                    <Divider sx={{borderColor:"#16313a", borderWidth: 3}}/>
                    <TextField sx={{width:"90%", margin:2}}
                               error={isErrorFirstname}
                               id="firstname"
                               label="First Name"
                               helperText="Firstname must be 8 letter at least"
                               variant="standard"
                               type="text"
                               onChange={firstNameHandler}
                               value={firstname}
                               disabled={loadingStatus === "loading"}
                    />
                    <TextField sx={{width:"90%", margin:2}}
                               error={isErrorLastname}
                               id="lastname"
                               label="Last Name"
                               helperText="Password must be 8 letter at least"
                               variant="standard"
                               type="text"
                               onChange={secondNameHandler}
                               value={lastname}
                               disabled={loadingStatus === "loading"}
                    />
                    <TextField sx={{width:"90%", margin:2}}
                               error={isErrorAddress}
                               id="address"
                               label="Address"
                               helperText="Your Complete Address"
                               variant="standard"
                               type="text"
                               onChange={addressHandler}
                               value={address}
                               disabled={loadingStatus === "loading"}
                    />
                    <TextField sx={{width:"90%", margin:2}}
                               error={isErrorEmail}
                               id="email"
                               label="Email"
                               helperText="Email Address"
                               variant="standard"
                               type="text"
                               onChange={emailHandler}
                               value={email}
                               disabled={loadingStatus === "loading"}
                    />
                    <TextField sx={{width:"90%", margin:2}}
                               id="web_address"
                               label="Web Address"
                               helperText="do you have an online shop? "
                               variant="standard"
                               type="text"
                               onChange={webHandler}
                               value={web}
                               disabled={loadingStatus === "loading"}
                    />
                    <TextField sx={{width:"90%", margin:2}}
                               id="social_address"
                               label="Social Address"
                               helperText="do you have a social account like instagram? "
                               variant="standard"
                               type="text"
                               onChange={socialHandler}
                               value={socialAddress}
                               disabled={loadingStatus === "loading"}
                    />
                    <TextField sx={{width:"90%", margin:2}}
                               id="password"
                               label="Password Update (Optional)"
                               helperText="Password must be 8 char at list "
                               variant="standard"
                               type="text"
                               onChange={passHandler}
                               value={pass}
                               disabled={loadingStatus === "loading"}
                    />
                </CardContent>: null
            }
            { loaded ?
                <CardActions sx={{padding:"auto"}}>
                    <LoadingButton
                        size="medium" sx={{margin:"auto"}} onClick={update}
                        loadingIndicator={<CirProgress width={32} height={32}/>}
                        loading={loadingStatus === "loading"}
                    >
                        Update
                    </LoadingButton>
                </CardActions>
                : null
            }
            <Snackbar open={open} autoHideDuration={4000} onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity={severity} sx={{ width: 400 }}>
                    {verificationMessage}
                </Alert>
            </Snackbar>
        </Card>
    )
}
export default AgentInformation