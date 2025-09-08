import {Box, Button, Card, CardMedia, Divider, Modal, TextField, Typography} from "@mui/material";
import "./cart.css"
import LoadingButton from "@mui/lab/LoadingButton";
import {useContext, useState} from "react";
import usePostByToken from "../../Hooks/usePostByToken";
import useDeleteByToken from "../../Hooks/useDeleteByToken";
import useUpdateRefreshToken from "../../Hooks/useUpdateRefreshToken";
import useDecryption from "../../Hooks/useDecryption";
import {AuthContext} from "../../Contexts/AuthContext/AuthContext";
import CirProgress from "../CirProgress/CirProgress";
import {useNavigate} from "react-router";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "20%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const OrderItem = (props) => {
    const {product} = props
    const [countValue , setCountValue] = useState(product.count)
    const [openModal, setOpenModal] = useState(false)
    const {verificationMessage, handleSnackClose, open:op, severity, sendRequest:postHandler, loadingStatus} = usePostByToken()
    const {verificationMessage:veriMsg, handleSnackClose:handleClose, open:ope, severity:sev, sendRequest:deleteHandler, loadingStatus:loading} = useDeleteByToken()
    const {sendRequest: refreshToken} = useUpdateRefreshToken()
    const {decryption} = useDecryption()
    const authContext = useContext(AuthContext)
    const navigate = useNavigate()
    const handleCloseModal = () => setOpenModal(false);

    const removeHandler = () => {
        props.itemHandler(product.id)
    }

    const countItemHandler = (event) => {
        let count = event.target.value
        if(count === 0){
            setOpenModal(true)
            return
        }
        setCountValue(event.target.value)
        props.countAndPricHandler(product, parseInt(count))
    }
    return (
        <Card  sx={{marginRight:"auto", marginLeft:"auto", width:"90%", padding:1, marginTop:2}} >
            <div className="row">
                <div className="col-sm-2">
                    <img style={{width:"100%"}} src={"https://heinrichsclub.com/club/assets/img/p/"+product.product_image_id + ".jpg"} />
                </div>
                <div className="col-sm-10">
                    <Typography variant="p" component="div" color="#000000" sx={{ fontSize:20, marginBottom:2}}>
                        { product.product_name }
                    </Typography>
                    <di>
                        <Typography variant="p" component="div" color="#000000" sx={{ fontSize:20, marginBottom:2}}>
                            Price: {product.price}
                        </Typography>

                    </di>
                    <div >
                        <Divider sx={{borderColor:"#16313a", borderWidth: 2, marginBottom: 2}}/>
                        <Typography variant="p" component="span" color="#000000" sx={{ fontSize:20, marginBottom:2, marginRight:2}}>
                            Qty:
                        </Typography>

                        <TextField className="qty" sx={{verticalAlign:"middle", marginRight:2, marginLeft: 2, textAlign:"center"}} size="small"
                                   data-value type="text" value={countValue} onChange={countItemHandler} />
                        <Typography variant="p" component="span" color="#000000" sx={{marginLeft:3, fontSize:30, marginBottom:2, marginRight:2}}>
                            ${parseInt(countValue) * parseInt(product.price)}
                        </Typography>
                    </div>
                </div>
            </div>
            {
                openModal &&
                <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" style={{fontSize:17, marginBottom:10}}>
                            Do You Want TO Remove this Item?
                        </Typography>
                        <Button style={{marginTop:10, float:"right"}} onClick={() => {
                            setOpenModal(false)
                            removeHandler(product.id)
                        }}>Yes</Button>
                        <Button style={{marginTop:10, float:"right"}} onClick={() => {
                            setOpenModal(false)
                        }}>No</Button>
                    </Box>
                </Modal>
            }

        </Card>
    )
}
export default OrderItem