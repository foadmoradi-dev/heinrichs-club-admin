import {useCallback, useState} from "react";
import useDecryption from "./useDecryption";
//const mainURL = "http://localhost/club/api"
const mainURL = "https://heinrichs-club.com/club/api"
const useUpdateRefreshToken = () => {
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
    const sendRequest = useCallback(async (applyData) => {
        let refresh_token = ""
        decryption(localStorage.getItem("data"), (data) => {refresh_token = JSON.parse(data).refresh_token})
        setLoadingStatus("loading")
        const response = await fetch(mainURL + '/refresh.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                token: refresh_token
            })
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
            } else {
                data =  {
                    status:false,
                    result: obj.message ? obj.message : "Network Error"
                }
                setOpen(true)
                setSeverity("error")
                setVerificationMessage(obj.message ? obj.message : "Network Error")
                setLoadingStatus("try")
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
export default useUpdateRefreshToken