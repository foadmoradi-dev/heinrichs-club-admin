import {Avatar, Divider, IconButton, ListItem, ListItemAvatar, ListItemText, Snackbar} from "@mui/material";
import {Fragment, useContext, useState} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from "@mui/icons-material/Edit";
import {AuthContext} from "../../Contexts/AuthContext/AuthContext";
import {forwardRef} from "react";
import MuiAlert from "@mui/material/Alert";
import {useNavigate} from "react-router";

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Product = (props) => {
    const authContext = useContext(AuthContext)
    const [open, setOpen] = useState(false)
    const [severity, setSeverity] = useState("")
    const [message, setMessage] = useState("")
    const navigate = useNavigate()
    const editHandler = () => {
        navigate("/dashboard/edit-product/"+props.product.id,
            {state:
                {
                    id:props.product.id,
                    product_name:props.product.product_name,
                    product_model: props.product.product_model,
                    product_wholesale_price: props.product.product_wholesale_price,
                    product_retail_price: props.product.product_retail_price,
                    product_image_id: props.product.product_image_id,
                    product_short_desc: props.product.product_short_desc,
                    product_long_desc: props.product.product_long_desc,
                    product_entity:props.product.product_entity,
                    product_dollar_price:props.product.product_dollar_price
                }
            })
        }
    const deleteHandler = () => {
        props.deleteHandler(props.product.id)
    }

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    return(
        <Fragment>
            <ListItem secondaryAction={
                    <Fragment>
                        <IconButton onClick={editHandler}>
                            <EditIcon style={{fontSize: 30}} />
                        </IconButton>
                        <IconButton onClick={deleteHandler}>
                            <DeleteIcon style={{fontSize: 30}}/>
                        </IconButton>
                    </Fragment>
                     }
                    >
                <ListItemAvatar>
                    <Avatar sx={{width: 100, height: 100, marginRight: 5}}>
                        <img style={{width: 100, height: 100}} src={"https://heinrichsclub.com/club/assets/img/p/"+ props.product.product_image_id + ".jpg"}  alt=""/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    sx={{color: "#000"}}
                    primary={props.product.product_name}
                    secondary={props.product.product_model}
                />
            </ListItem>
            <Divider variant="inset" component="li"/>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity={severity} sx={{ width: 400 }}>
                    {message}
                </Alert>
            </Snackbar>
        </Fragment>
    )
}
export default Product