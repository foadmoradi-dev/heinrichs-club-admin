import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {useNavigate} from "react-router";

const DashboardGuaranties = () => {
    const navigate = useNavigate()
    const addGuarantiesHandler = () => {
        navigate("/dashboard/add-guaranties")
    }
    const modifyGuarantiesHandler = () => {
        navigate("/dashboard/modify-guaranties")
    }
    const registerGuaranteeHandler = () => {
        navigate("/dashboard/register-guarantee")
    }
    return(
        <div className="row mt-2">
            <div className="col-sm-3" style={{marginTop:5}}>
                <Card sx={{ minWidth: 275  , backgroundColor:"#c086e7"}}>
                    <CardContent>
                        <Typography sx={{ fontSize: 25 }} color="#000000" gutterBottom>
                            Add Guaranties
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            You must using a excel file
                        </Typography>
                        <Typography variant="body2">
                            prepare an excel file
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={addGuarantiesHandler}>Read More and Adding</Button>
                    </CardActions>
                </Card>
            </div>
            <div className="col-sm-3" style={{marginTop:5}}>
                <Card sx={{ minWidth: 275  , backgroundColor:"#c086e7"}}>
                    <CardContent>
                        <Typography sx={{ fontSize: 25 }} color="#000000" gutterBottom>
                            Register a Guarantee
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            you are admin and agent
                        </Typography>
                        <Typography variant="body2">
                            act like as an agent
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={registerGuaranteeHandler}>Register Guarantee</Button>
                    </CardActions>
                </Card>
            </div>
            <div className="col-sm-3" style={{marginTop:5}}>
                <Card sx={{ minWidth: 275  , backgroundColor:"#c086e7"}}>
                    <CardContent>
                        <Typography sx={{ fontSize: 25 }} color="#000000" gutterBottom>
                            Modify Guaranties
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Edit, delete, Activate and Deactivate
                        </Typography>
                        <Typography variant="body2">
                            that's absolutely optionals.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={modifyGuarantiesHandler}>View and Modify</Button>
                    </CardActions>
                </Card>
            </div>
            <div className="col-sm-3" style={{marginTop:5}}>
                <Card sx={{ minWidth: 275  , backgroundColor:"#c086e7"}}>
                    <CardContent>
                        <Typography sx={{ fontSize: 25 }} color="#000000" gutterBottom>
                            Add a customer
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            admins also can add a customer
                        </Typography>
                        <Typography variant="body2">
                            that's absolutely optionals.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Register a Customer</Button>
                    </CardActions>
                </Card>
            </div>
        </div>
    )

}
export default DashboardGuaranties