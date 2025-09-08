import {useCallback, useState} from "react";
//const mainURL = "http://localhost/club/api"
const mainURL = "https://heinrichs-club.com/club/api"
const usePost = () => {
    const [open, setOpen] = useState(false)
    const [severity, setSeverity] = useState("")
    const [verificationMessage, setVerificationMessage] = useState("")
    const [loadingStatus, setLoadingStatus] = useState(null)
    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const sendRequest = useCallback(async (requestConfig, applyData) => {
        setLoadingStatus("loading")
        const response = await fetch(mainURL + requestConfig.url, {
            method: 'POST',
            headers: {
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
            const json = await response.text();
            const obj = JSON.parse(json);
            if (response.status === 200) {
                setLoadingStatus(null)
                data = {
                    status: true,
                    result: obj
                }
            } else {
                data =  {
                    status: false,
                    result: obj.message ? obj.message : "Network Error, Please Try Again Later"
                }
                setOpen(true)
                setSeverity("error")
                setVerificationMessage(obj.message ? obj.message : "Network Error, Please Try Again Later")
                setLoadingStatus(null)
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
export default usePost