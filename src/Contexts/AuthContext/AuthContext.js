import React, {useCallback, useReducer, useState} from "react";
import * as CryptoJS from "crypto-js";
import useEncryption from "../../Hooks/useEncryption";

export const AuthContext = React.createContext()

let logoutTimer;
const calculateRemainingTime = (expirationTime) => {
    const currenTime = new Date().getTime()
    const adjExpirationTime = new Date(expirationTime).getTime()
    return adjExpirationTime - currenTime
}
const retrieveStoredToken = () => {
    let plainText = ""
    if(localStorage.getItem("expTime") != null)
    {
        const secretKey = process.env.REACT_APP_KEY
        const bytes = CryptoJS.AES.decrypt(localStorage.getItem('expTime'), secretKey )
        plainText = bytes.toString(CryptoJS.enc.Utf8)
    }

    const data = localStorage.getItem("data")
    const remainingTime = calculateRemainingTime(plainText);
    if (remainingTime <= 10000) {
        localStorage.removeItem('data')
        localStorage.removeItem("expTime")
        return null;
    }

    return {
        data: data,
        duration: remainingTime,
    };
}
const AuthContextProvider = (props) => {
    const [tokenData, setTokenData] = useState(retrieveStoredToken())
    const {encryption} = useEncryption()
    const logoutHandler = useCallback(() => {
        localStorage.removeItem('data')
        localStorage.removeItem("expTime")
        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    }, [])
    const authReducer = (state, action) => {
        switch (action.type){
            case "login": {
                encryption(JSON.stringify(action.payload.data), (data) => {localStorage.setItem("data", data)})
                encryption(action.payload.exp_time, (data) => {localStorage.setItem("expTime", data)})
                setTokenData(retrieveStoredToken())
                const remainTime = calculateRemainingTime(action.payload.exp_time)
                logoutTimer = setTimeout(logoutHandler,remainTime)

                state = {
                    id:action.payload.role_id,
                    role:action.payload.role
                }
                return state
            }
            case "update":
            {
                encryption(JSON.stringify(action.payload.data), (data) => {localStorage.setItem("data", data)})
                state = {
                    id:action.payload.role_id,
                    role:action.payload.role
                }
                return state
            }
            case "logout":
            {
                localStorage.removeItem('data')
                localStorage.removeItem("expTime")

                state = {
                    id:0,
                    role:""
                }
                if (logoutTimer) {
                    clearTimeout(logoutTimer);
                }
                return state
            }
            default:
                return state
        }
    }
    const [loginStatus, dispatch] = useReducer(authReducer,0)

    return(
        <AuthContext.Provider value={{loginStatus, dispatch}}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider
