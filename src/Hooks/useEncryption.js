import * as CryptoJS from 'crypto-js'
import {useCallback} from "react";


const useEncryption = () => {
    const encryption = useCallback((value, applyData) => {
        if(value !== null){
            const secretKey = process.env.REACT_APP_KEY
            const res = CryptoJS.AES.encrypt(value.toString(), secretKey.toString()).toString();
            applyData(res)
        }
    }, [])

    return(
        {
            encryption
        }
    )
}
export default useEncryption