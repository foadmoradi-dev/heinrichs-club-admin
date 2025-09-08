import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {DrawerContext} from "../../Contexts/DrawerContext/DrawerContext";
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {AuthContext} from "../../Contexts/AuthContext/AuthContext";
import {AdminContext} from "../../Contexts/AdminContext/AdminContext";
import useDecryption from "../../Hooks/useDecryption";


const TopAppBar = () => {
    const authContext = useContext(AuthContext)
    const agentContext = useContext(AdminContext)
    const navigate = useNavigate()
    const drawerContext = useContext(DrawerContext);
    const [role, setRole] = useState()
    const {decryption} = useDecryption()
    const toggleDrawer =() => {
        drawerContext.dispatch({type:"toggleDrawer"})
    }
    const loginHandler = () => {
        navigate("/")
    }
    const logoutHandler = () => {
        setRole("")
        authContext.dispatch({type:"logout"})
        agentContext.dispatch({type:"unsaved"})
        navigate("/", {replace:true})
    }
    useEffect(() => {
        if(localStorage.getItem("data") !== null){
            decryption(localStorage.getItem("data"), (data) => {
                setRole(JSON.parse(data).role)
            })
        }
    })
    return(
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton onClick={toggleDrawer}
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Heinrichs Customer Club
                    </Typography>
                    {
                        role === "admin" ?
                            <Button color="inherit" onClick={logoutHandler}>Logout</Button>
                            : <Button color="inherit" onClick={loginHandler}>Login</Button>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    )
}
export default TopAppBar