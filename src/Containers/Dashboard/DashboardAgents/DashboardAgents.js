import {AccountTree} from "@mui/icons-material";
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {useNavigate} from "react-router";

const DashboardAgents = () => {
    const navigate = useNavigate()
    const modifyAgentsHandler = () => {
        navigate("/dashboard/modify-agents")
    }
    const modifyOrdersHandler = () => {
        navigate("/dashboard/modify-orders")
    }
    return(
        <div className="row">
            <div className="col-sm-4" style={{marginTop:5}}>
                <Card sx={{ minWidth: 275  , backgroundColor:"#56b8c9"}}>
                    <CardContent>
                        <Typography sx={{ fontSize: 25 }} color="#000000" gutterBottom>
                            Add an agent
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Agents Can to register by yourself but admins also can register an agent
                        </Typography>
                        <Typography variant="body2">
                            that's absolutely optionals.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Register an Agent</Button>
                    </CardActions>
                </Card>
            </div>
            <div className="col-sm-4" style={{marginTop:5}}>
                <Card sx={{ minWidth: 275 , backgroundColor:"#56b8c9"}}>
                    <CardContent>
                        <Typography sx={{ fontSize: 25 }} color="#000" gutterBottom>
                            Modify agents
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Activate, Deactivate, Edit and Delete agents is possible in here
                        </Typography>
                        <Typography variant="body2">
                            complete controls on your agents
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={modifyAgentsHandler}>Learn More and Modify</Button>
                    </CardActions>
                </Card>
            </div>
            <div className="col-sm-4" style={{marginTop:5}}>
                <Card sx={{ minWidth: 275 , backgroundColor:"#56b8c9"}}>
                    <CardContent>
                        <Typography sx={{ fontSize: 25 }} color="#000" gutterBottom>
                            Modify orders
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            order investigating
                        </Typography>
                        <Typography variant="body2">
                            checkout orders registered by agents
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={modifyOrdersHandler}>Learn More and Modify</Button>
                    </CardActions>
                </Card>
            </div>
        </div>
    )
}
export default DashboardAgents