import {Fragment} from "react";
import {Box, Button, Card, CardActionArea, CardActions, CardContent, Typography} from "@mui/material";
const AddWidget = (props) => {
    return(
        <Card >
            <CardContent sx={{backgroundColor:props.color, textAlign:'center', height:97}}>
                <div>
                    <div>
                        <Typography fontSize={20} fontWeight="bold">
                            {props.title}
                        </Typography>
                    </div>
                    <div>
                        {
                            props.icon
                        }
                    </div>
                </div>
            </CardContent>
            <CardActions sx={{backgroundColor:props.color}}>
                <Button sx={{ width:"100%"}} color="primary" onClick={props.onClick}>
                    {props.buttonTitle}
                </Button>
            </CardActions>
        </Card>
    )
}
export default AddWidget