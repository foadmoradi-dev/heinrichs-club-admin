import {forwardRef, Fragment, useContext} from "react";
import {Box,Button,Card,CardActions,CardContent,CircularProgress,Divider, Snackbar,TextField,Typography} from "@mui/material";
import {useState} from "react";
import MuiAlert from "@mui/material/Alert";
import {AuthContext} from "../../Contexts/AuthContext/AuthContext";
import usePatchByToken from "../../Hooks/usePatchByToken";
import useUpdateRefreshToken from "../../Hooks/useUpdateRefreshToken";
const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const RegisterGuaranteeForm = () => {
    const authContext = useContext(AuthContext)
    const [isErrorBarcode, setIsErrorBarcode] = useState(false)
    const [barcode, setBarcode] = useState("")
    const [isErrorFirstname, setIsErrorFirstname] = useState(false)
    const [firstname, setFirstname] = useState("")
    const [isErrorLastname, setIsErrorLastname] = useState(false)
    const [lastname, setLastname] = useState("")
    const [isErrorPhoneNumber, setIsErrorPhoneNumber] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState("")
    const [isErrorAddress, setIsErrorAddress] = useState(false)
    const [address, setAddress] = useState("")
    const [isErrorProductModel, setIsErrorProductModel] = useState(false)
    const [productModel, setProductModel] = useState("")
    const [productPrice, setProductPrice] = useState("")
    const [isErrorProductPrice, setIsErrorProductPrice] = useState(false)
    const {sendRequest: refreshToken} = useUpdateRefreshToken()
    const {verificationMessage, severity, handleSnackClose,sendRequest: register, open, loadingStatus} = usePatchByToken()
    const {} = useUpdateRefreshToken()
    const barcodeHandler = (event) => {
        if(event.target.value.length !== 11){
            setIsErrorBarcode(true)
        }else{
            setIsErrorBarcode(false)
        }
        setBarcode(event.target.value)
    }
    const firstnameHandler = (event) => {
        if(event.target.value.length < 2){
            setIsErrorFirstname(true)
        }else{
            setIsErrorFirstname(false)
        }
        setFirstname(event.target.value)
    }
    const lastnameHandler = (event) => {
        if(event.target.value.length < 2){
            setIsErrorLastname(true)
        }else{
            setIsErrorLastname(false)
        }
        setLastname(event.target.value)
    }
    const phoneNumberHandler = (event) => {
        if(event.target.value.length !== 11){
            setIsErrorPhoneNumber(true)
        }else{
            setIsErrorPhoneNumber(false)
        }
        setPhoneNumber(event.target.value)
    }
    const addressHandler = (event) => {
        if(event.target.value.length < 30){
            setIsErrorAddress(true)
        }else{
            setIsErrorAddress(false)
        }
        setAddress(event.target.value)
    }
    const productModelHandler = (event) => {
        if(event.target.value.length < 7){
            setIsErrorProductModel(true)
        }else{
            setIsErrorProductModel(false)
        }
        setProductModel(event.target.value)
    }
    const productPriceHandler = (event) => {
        if(event.target.value.length < 5){
            setIsErrorProductPrice(true)
        }else{
            setIsErrorProductPrice(false)
        }
        setProductPrice(event.target.value)
    }
    const registerHandler = () => {
        if (!(isErrorBarcode || isErrorFirstname || isErrorLastname || isErrorPhoneNumber || isErrorAddress || isErrorProductPrice)) {
            registerGuarantee()
        }
    }
    const registerGuarantee = () => {
        const applyData = (data) => {
            if(data.status){
                setBarcode("")
                setFirstname("")
                setLastname("")
                setPhoneNumber("")
                setProductModel("")
                setProductPrice("")
                setAddress("")
            }else if(data.result === "Refresh-Token"){
                const applyRefresh = (data) => {
                    if(data.status){
                        authContext.dispatch({
                            type: "update", payload: {
                                data :{
                                    role_id: data.result.id,
                                    access_token: data.result.access_token,
                                    refresh_token: data.result.refresh_token,
                                    role: "admin"
                                }

                            }
                        })
                        registerGuarantee()
                    }
                }
                refreshToken(applyRefresh).then(r => {}, error => {}).catch(e =>{})
            }
        }
        const data = {
            barcode: barcode,
            first_name: firstname,
            last_name: lastname,
            address: address,
            phone_number: phoneNumber,
            product_model: productModel,
            product_price: productPrice
        }
        register({url:'/guarantee/' + authContext.loginStatus, data: data }, applyData).then(r => {}, error => {}).catch(e => {})
    }

    return(
        <Fragment>
            {
                loadingStatus==="loading"?
                    <Box sx={{ display: 'flex', width:"100%", height:"100%",paddingLeft:"48%", paddingTop:"135px", position:"fixed", zIndex:100 }}>
                        <CircularProgress />
                    </Box>:
                    null
            }
            <Card sx={{marginRight:"auto", marginLeft:"auto", width:600, padding:1}}>
                <CardContent>
                    <Typography variant="p" component="div" color="#000000" sx={{fontStyle:"italic", fontSize:20, marginBottom:2}}>
                        Register A Guarantee
                    </Typography>
                    <Divider sx={{borderColor:"#bd04f6", borderWidth: 5}}/>
                    <TextField sx={{width:"90%", margin:2}}
                               error={isErrorBarcode}
                               id="standard-helperText"
                               label="Barcode"
                               helperText="must be 11 char exactly"
                               variant="standard"
                               onChange={barcodeHandler}
                               value={barcode}
                    />
                    <TextField sx={{width:"90%", margin:2}}
                               error={isErrorFirstname}
                               id="standard-helperText"
                               label="Firstname Customer"
                               helperText="first name of the customer"
                               variant="standard"
                               onChange={firstnameHandler}
                               value={firstname}
                    />
                    <TextField sx={{width:"90%", margin:2}}
                               error={isErrorLastname}
                               id="standard-helperText"
                               label="Lastname customer"
                               helperText="last name of the customer"
                               variant="standard"
                               onChange={lastnameHandler}
                               value={lastname}
                    />
                    <TextField sx={{width:"90%", margin:2}}
                               error={isErrorPhoneNumber}
                               id="standard-helperText"
                               label="Phone Number"
                               helperText="phone number must be 11 digits exactly"
                               variant="standard"
                               type="number"
                               onChange={phoneNumberHandler}
                               value={phoneNumber}
                    />

                    <TextField sx={{width:"90%", margin:2}}
                               error={isErrorAddress}
                               id="standard-helperText"
                               label="Address"
                               helperText="complete Address of Customer"
                               variant="standard"
                               onChange={addressHandler}
                               value={address}
                    />
                    <TextField sx={{width:"90%", margin:2}}
                               error={isErrorProductModel}
                               id="standard-helperText"
                               label="Product Model"
                               helperText="Model Of Product"
                               variant="standard"
                               onChange={productModelHandler}
                               value={productModel}
                    />
                    <TextField sx={{width:"90%", margin:2}}
                               error={isErrorProductPrice}
                               id="standard-helperText"
                               label="Product Price"
                               helperText="Price Of Product"
                               type="number"
                               variant="standard"
                               onChange={productPriceHandler}
                               value={productPrice}
                    />
                </CardContent>
                <CardActions sx={{padding:"auto"}}>
                    <Button size="medium" sx={{margin:"auto"}} onClick={registerHandler}>Register Guarantee</Button>
                </CardActions>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackClose}>
                    <Alert onClose={handleSnackClose} severity={severity} sx={{ width: 400 }}>
                        {verificationMessage}
                    </Alert>
                </Snackbar>
            </Card>
        </Fragment>

    )
}
export default RegisterGuaranteeForm