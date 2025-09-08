import {forwardRef, useContext, useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router";
import useGetByToken from "../../Hooks/useGetByToken";
import useUpdateRefreshToken from "../../Hooks/useUpdateRefreshToken";
import {AuthContext} from "../../Contexts/AuthContext/AuthContext";
import {Card, Divider, Snackbar, TextField, Typography} from "@mui/material";
import TicketContentRow from "../../Components/TicketContentRow/TicketContentRow";
import LoadingButton from "@mui/lab/LoadingButton";
import CirProgress from "../../Components/CirProgress/CirProgress";
import useDecryption from "../../Hooks/useDecryption";
import usePostByToken from "../../Hooks/usePostByToken";
import MuiAlert from "@mui/material/Alert";

const Capitalizer = (str) => {
    return str.charAt(0).toUpperCase()+ str.slice(1)
}
const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const TicketContent = () => {
    const params = useParams()
    let ticket_id = params.id
    const {verificationMessage, handleSnackClose, open, severity, sendRequest:getData, loadingStatus} = useGetByToken()
    const {verificationMsg, loadingStat, sendRequest: postHandler, op, snackClose, sever} = usePostByToken()
    const {sendRequest: refreshToken} = useUpdateRefreshToken()
    const authContext = useContext(AuthContext)
    const { state } = useLocation();
    const [ticketContentsList, setTicketContentList] = useState([])
    const {decryption} = useDecryption()
    const navigate = useNavigate()
    const [isErrorContent, setIsErrorContent] = useState()
    const [content, setContent] = useState()

    useEffect(() => {
        getAllData().then(r => {}, e => {}).catch(e => {})
    }, []);
    const getAllData = async () => {
        const applyData = (data) => {
            if (data.status) {
               setTicketContentList(data.result)
            } else if (data.result === "Refresh-Token") {
                const applyRefresh = (data) => {
                    let d = null
                    if (data.status) {
                        authContext.dispatch({
                            type: "update-token", payload: {
                                data : {
                                    role_id: data.result.id,
                                    role: "admin",
                                    access_token: data.result.access_token,
                                    refresh_token: data.result.refresh_token}
                            }
                        })
                        getAllData()
                    }
                }
                refreshToken(applyRefresh).then(r => {}, error => {}).catch(e => {})
            }
        }
        await getData({url: `/ticket/` + ticket_id}, applyData)
    }
    const contentHandler = (event) => {
        event.target.value.length < 5 ? setIsErrorContent(true) : setIsErrorContent(false)
        setContent(event.target.value)
    }
    const replyTicket = () => {
        postTicket().then(r => console.log(r), e => console.log(e)).catch(e => console.log(e))
    }
    const postTicket = async () => {
        const applyData = (data) => {
            if (data.status) {
                navigate("/dashboard/tickets")
            } else if(data.result === "Refresh-Token") {
                const applyRefresh = (data) => {
                    if (data.status) {
                        authContext.dispatch({
                            type: "update-token", payload: {
                                data : {
                                    role_id: data.result.id,
                                    role: "admin",
                                    access_token: data.result.access_token,
                                    refresh_token: data.result.refresh_token}
                            }
                        })
                        replyTicket()
                    }
                }
                refreshToken(applyRefresh).then(r => {}, error => {}).catch(e => {})
            }
        }
        const data = {
            ticket_id: ticket_id,
            content: content,
            writer_id:"1",
            status: "2",
            role:state.role_id,
            department_id: "1"
        }
        console.log(data)
        if (!isErrorContent ) {
            postHandler({url: '/ticket/' + ticket_id, data: data}, applyData).then(r => {console.log(r)}, error => {console.log(error)}).catch(e => {console.log(e)})
        }
    }
    return(
        <div className="row container-fluid g-0" style={{marginTop: 70, marginBottom: 6, justifyContent:"center"}}>
            <Card sx={{marginRight: "auto", marginLeft: "auto", width: "95%", padding: 1}} >
                <div style={{ marginBottom:10, minHeight: 60}} className="row container-fluid g-0">
                    <Typography className="col-sm-2" sx={{ fontSize: 17, padding:1 }} color="#000000" gutterBottom>
                        <span style={{fontWeight:"bold", color:"#1e544f", fontSize:20}} >Name:</span> {Capitalizer(state.first_name)} {Capitalizer(state.last_name)}
                    </Typography>
                    <Typography className="col-sm-4" sx={{ fontSize: 17, padding:1 }} color="#000000" gutterBottom>
                        <span style={{fontWeight:"bold", color:"#1e544f", fontSize:20}} >Subject:</span> {Capitalizer(state.subject)}
                    </Typography>
                    <Typography className="col-sm-2" sx={{ fontSize: 17, padding:1 }} color="#000000" gutterBottom>
                        <span style={{fontWeight:"bold", color:"#1e544f", fontSize:20}} >Role:</span> {Capitalizer(state.role)}
                    </Typography>
                    <Typography className="col-sm-1" sx={{ fontSize: 17, padding:1 }} color="#000000" gutterBottom>
                        <span style={{fontWeight:"bold", color:"#1e544f", fontSize:20}} >Status:</span> {Capitalizer(state.status)}
                    </Typography>
                    <Typography className="col-sm-3" sx={{ fontSize: 17, padding:1 }} color="#000000" gutterBottom>
                        <span style={{fontWeight:"bold", color:"#1e544f", fontSize:20}} >Last Update:</span> {state.last_update}
                    </Typography>
                </div>
                <Divider sx={{borderColor:"#10474f", borderWidth: 5, marginBottom: 1}}/>
                {
                    loadingStatus !== "loading" ?
                        ticketContentsList.map( row =>
                            <TicketContentRow rowContent={row} userId={state.user_id} />
                        ): null

                }
                <div className="row" style={{padding:20}}>
                    <TextField
                        id="outlined-multiline-static"
                        label="Content"
                        multiline
                        defaultValue="Content"
                        rows={20}
                        onChange={contentHandler}
                    />

                </div>
                <LoadingButton
                    size="medium" sx={{margin:"auto"}} onClick={replyTicket}
                    loadingIndicator={<CirProgress width={32} height={32}/>}
                    loading={loadingStatus === "loading"}
                >
                    Send
                </LoadingButton>
                <Snackbar open={open || op} autoHideDuration={4000} onClose={handleSnackClose}>
                    <Alert onClose={handleSnackClose} severity={severity || sever} sx={{ width: 400 }}>
                        {verificationMessage || verificationMsg }
                    </Alert>
                </Snackbar>
            </Card>
        </div>
    )

}
export default TicketContent