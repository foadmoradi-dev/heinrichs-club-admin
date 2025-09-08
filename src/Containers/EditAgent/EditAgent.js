import AgentInformation from "../../Components/AgentInformation/AgentInformation";
import AgentManagement from "../../Components/AgentManagement/AgentManagement";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../Contexts/AuthContext/AuthContext";
import {useParams} from "react-router";
import useUpdateRefreshToken from "../../Hooks/useUpdateRefreshToken";
import useGetByToken from "../../Hooks/useGetByToken";
import usePatchByToken from "../../Hooks/usePatchByToken";
import useDecryption from "../../Hooks/useDecryption";

const EditAgent = (props) => {
    const params = useParams()
    let id = params.id
    const authContext = useContext(AuthContext)
    const [agent, setAgent] = useState()
    const [websiteStatus, setWebsiteStatus] = useState(null)
    const [socialStatus, setSocialStatus] = useState(null)
    const {sendRequest: refreshToken} = useUpdateRefreshToken()
    const {sendRequest: getHandler, loadingStatus: loading} = useGetByToken()
    const {verificationMessage, loadingStatus, sendRequest: patchHandler, open, handleSnackClose, severity} = usePatchByToken()
    const {decryption} = useDecryption()
    const getInformation = (id) => {
        const applyData = (data) => {
            if (data.status) {
                setAgent(data.result)
                downloadData(id)
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
                        getInformation(id)
                    }
                }
                refreshToken(applyRefresh).then(r => {}, error => {}).catch(e => {})
            }
        }
        getHandler({url: '/agent/' + id}, applyData).then(r => {}, error => {}).catch(e => {})
    }
    const downloadData = (id) => {
        const applyData = (data) => {
            if (data.status) {
                setWebsiteStatus(data.result.is_active )
                setSocialStatus(data.result.social_active)
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
        getHandler({url: '/cert/' + id}, applyData).then(r => {}).catch(e => {})
    }
    useEffect(() => {
        getInformation(id)

    }, []);
    return(
        <div className="row" style={{marginTop:70}}>
            {
                agent &&
                <div className="col-sm-6" style={{marginBottom:6}}>
                    <AgentInformation agent={agent} />
                </div>
            }
            {
                websiteStatus && agent && socialStatus &&
                <div className="col-sm-6" style={{marginBottom:6}}>
                    <AgentManagement agent={agent} websiteStatus={websiteStatus} socialStatus={socialStatus} />
                </div>
            }

        </div>
    )
}
export default EditAgent