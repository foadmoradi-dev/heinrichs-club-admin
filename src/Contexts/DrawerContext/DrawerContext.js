import React, {useReducer} from "react";

export const DrawerContext = React.createContext(undefined)

const DrawerContextProvider = (props) => {
    const reducer = (isOpen, action) => {
        switch (action.type){
            case "toggleDrawer":{
                isOpen = !isOpen;
                break
            }
            default:
                break
        }
        return isOpen
    }
    const [isOpen, dispatch] = useReducer(reducer, [])
    return(
        <DrawerContext.Provider value={{isOpen, dispatch}}>
            {props.children}
        </DrawerContext.Provider>
    )
}
export default DrawerContextProvider