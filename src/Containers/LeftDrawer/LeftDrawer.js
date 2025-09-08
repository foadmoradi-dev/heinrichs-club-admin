import {Fragment, useContext} from "react";
import {Backdrop, Drawer} from "@mui/material";
import {DrawerContext} from "../../Contexts/DrawerContext/DrawerContext";
import DrawerContent from "../../Components/DrawerContent/DrawerContent";
import zIndex from "@mui/material/styles/zIndex";


const LeftDrawer = () => {
    const drawerContext = useContext(DrawerContext)
    const closeDrawer = () => {
        drawerContext.dispatch({type: "toggleDrawer"})
    }
    return(
        <Fragment>
            <Drawer
                sx={{
                    width: 240,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 240,
                        boxSizing: 'border-box',
                        zIndex:10001
                    },
                }}
                variant="persistent"
                anchor="left"
                open={!drawerContext.isOpen}
            >
                <DrawerContent />
            </Drawer>
            <Backdrop sx={{zIndex:10000}} open={!drawerContext.isOpen} onClick={closeDrawer} />
        </Fragment>
    )
}
export default LeftDrawer