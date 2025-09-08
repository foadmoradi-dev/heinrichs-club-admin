import {useCallback, useState} from "react";
import useDecryption from "./useDecryption";
//const mainURL = "http://localhost/club/api"
const mainURL = "https://heinrichs-club.com/club/api"
const usePostByToken = () => {
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

    const sendRequest = useCallback(async (requestConfig, applyData) => {
        let access_token = ""
        decryption(localStorage.getItem("data"), (data) => {access_token = JSON.parse(data).access_token})
        setLoadingStatus("loading")
        const response = await fetch(mainURL + requestConfig.url, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(requestConfig.data)
        }).then((success) => {
            return success
        }, (error) => {
            return false
        }).catch((error) => {
            return false
        })
        let data = null
        if (response) {
            setLoadingStatus(null)
            const json = await response.text();
            const obj = JSON.parse(json);
            if (response.status === 200) {
                data = {
                    status: true,
                    result: obj
                }
                setOpen(true)
                setSeverity("success")
                if(obj.message[0].length > 1)
                {
                    setVerificationMessage("Uploading was Successful")
                }else{
                    setVerificationMessage(obj.message)
                }

            } else {
                if(obj.message === "token has expired"){
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
                    setLoadingStatus("Try")
                }
            }
        } else {
            data =  {
                status: false,
                result: "API Error"
            }
            setOpen(true)
            setSeverity("error")
            setVerificationMessage("API Error")
            setLoadingStatus(null)
        }
        applyData(data)
    }, [])
    return {
        sendRequest,
        open,
        severity,
        verificationMessage,
        loadingStatus,
        handleSnackClose
    }
}
export default usePostByToken