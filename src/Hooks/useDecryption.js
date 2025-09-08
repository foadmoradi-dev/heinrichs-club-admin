import * as CryptoJS from 'crypto-js'
import {useCallback} from "react";
const useDecryption = () => {

    const decryption = useCallback((value, applyData) => {
        if(value !== null){
            const secretKey = process.env.REACT_APP_KEY
            const bytes = CryptoJS.AES.decrypt(value, secretKey )
            const plainText = bytes.toString(CryptoJS.enc.Utf8)
            applyData(plainText)
        }
    }, [])

    return({
        decryption
    })
}
export default useDecryption