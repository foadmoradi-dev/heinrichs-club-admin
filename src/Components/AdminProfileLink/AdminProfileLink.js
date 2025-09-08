import {Button, Card, Typography} from "@mui/material";
import {useNavigate} from "react-router";

const AdminProfileLink = (props) => {
    const navigate = useNavigate()
    return(
        <Card sx={{marginBottom:1, textAlign:"center", height:150}}>
            <Typography sx={{marginBottom:2, fontSize:17, fontWeight:"bold"}} variant="caption" component="div" color="text.secondary">
                <span style={{fontSize:24, fontStyle:"italic", color:"#691785"}}>Dear {props.firstname} {props.lastname}</span>
            </Typography>
            <Typography sx={{marginBottom:2, fontSize:15, fontWeight:"bold"}} variant="caption" component="div" color="text.secondary">
                Welcome To  Admin Dashboard
            </Typography>
            <Button onClick={() => {
                navigate("/dashboard/profile")
            }}>User Account</Button>
        </Card>
    )
}
export default AdminProfileLink