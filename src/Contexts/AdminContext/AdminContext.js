import React, {useReducer} from "react";
export const AdminContext = React.createContext()
const AgentContextProvider = (props) => {
    const authReducer = (admin, action) => {
        switch (action.type){
            case "save": {
                admin = action.payload.admin
                return admin
            }
            case "unsaved":
            {
                admin = false
                return admin
            }
            case "update":
            {

            }
            default:
                return admin
        }
    }
    const [admin, dispatch] = useReducer(authReducer,false)

    return(
        <AdminContext.Provider value={{admin, dispatch}}>
            {props.children}
        </AdminContext.Provider>
    )
}
export default AgentContextProvider
