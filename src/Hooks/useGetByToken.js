import {useState} from "react";
import {useCallback} from "react";
import useDecryption from "./useDecryption";

//const mainURL = "http://localhost/club/api"
const mainURL = "https://heinrichs-club.com/club/api"
const useGetByToken = () => {
    const [open, setOpen] = useState(false)
    const [severity, setSeverity] = useState("")
    const [verificationMessage, setVerificationMessage] = useState("")
    const [loadingStatus, setLoadingStatus] = useState(null)
    const {decryption} = useDecryption()
    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const sendRequest = useCallback( async (requestConfig, applyData) => {
        let access_token = ""
        decryption(localStorage.getItem("data"), (data) => {access_token = JSON.parse(data).access_token})
        try{
            setLoadingStatus("loading")
            let data = null
            const response = await fetch(mainURL + requestConfig.url, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then((success) => {
                return success
            }, (error) => {
                return false
            }).catch((error) => {
                return false
            })
            if(response){
                setLoadingStatus(null)
                const json = await response.text();
                const obj = JSON.parse(json);
                if(response.status === 200){
                    data = {
                        status:true,
                        result:obj
                    }
                }else{
                    if(obj.message === "token has expired"){
                        setOpen(true)
                        setSeverity("warning")
                        setVerificationMessage("Token Refreshing ... ")
                        data =  {
                            status:false,
                            result:"Refresh-Token"
                        }
                    }else{
                        data = {
                            status:false,
                            result: obj.message ? obj.message :"Network Error, Please Try Again Later"
                        }
                        setOpen(true)
                        setSeverity("error")
                        setVerificationMessage(obj.message ? obj.message :"Network Error, Please Try Again Later")
                        setLoadingStatus("try")
                    }
                }
            }
            else{
                data =  {
                    status:false,
                    result:"API Error, Contact Us and Report it"
                }
                setOpen(true)
                setSeverity("error")
                setVerificationMessage("API Error, Contact Us and Report it")
                setLoadingStatus("try")
            }
            applyData(data)
        }catch (e){
            setLoadingStatus(null)
        }

    }, [])

    return{
        sendRequest,
        open,
        severity,
        verificationMessage,
        loadingStatus,
        handleSnackClose
    }
}
export default useGetByToken