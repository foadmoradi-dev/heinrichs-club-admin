import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {useNavigate} from "react-router";

const DashboardProductCustomer = () => {
    const navigate = useNavigate()
    const addProductHandler = () => {
        navigate("/dashboard/add-product")
    }
    const modifyProductHandler = () => {
        navigate("/dashboard/modify-product")
    }
    const modifyCustomerHandler = () => {
        navigate("/dashboard/modify-customer")
    }
    return(
        <div className="row mt-2">
            <div className="col-sm-4" style={{marginTop:5}}>
                <Card sx={{ minWidth: 275  , backgroundColor:"#73e899"}}>
                    <CardContent>
                        <Typography sx={{ fontSize: 25 }} color="#000000" gutterBottom>
                            AddProduct
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            add new product
                        </Typography>
                        <Typography variant="body2">
                            you need all product information
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={addProductHandler}>Read More and Adding</Button>
                    </CardActions>
                </Card>
            </div>
            <div className="col-sm-4" style={{marginTop:5}}>
                <Card sx={{ minWidth: 275  , backgroundColor:"#73e899"}}>
                    <CardContent>
                        <Typography sx={{ fontSize: 25 }} color="#000000" gutterBottom>
                            ModifyProduct
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            view and edit all product
                        </Typography>
                        <Typography variant="body2">
                            edit, delete, ...
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={modifyProductHandler}>Register Guarantee</Button>
                    </CardActions>
                </Card>
            </div>
            <div className="col-sm-4" style={{marginTop:5}}>
                <Card sx={{ minWidth: 275  , backgroundColor:"#73e899"}}>
                    <CardContent>
                        <Typography sx={{ fontSize: 25 }} color="#000000" gutterBottom>
                            Customers
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            edit, delete, ...
                        </Typography>
                        <Typography variant="body2">
                            the bank of phone numbers
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={modifyCustomerHandler}>View and Modify</Button>
                    </CardActions>
                </Card>
            </div>
        </div>
    )

}
export default DashboardProductCustomer