import {Fragment, useContext, useEffect, useState} from "react";
import {Box, Button, Card, CircularProgress, Snackbar, Tab, Tabs, TextField, Typography} from "@mui/material";
import PropTypes from "prop-types";
import "./AddProduct.css"
import {forwardRef} from "react";
import MuiAlert from "@mui/material/Alert";
import {AuthContext} from "../../Contexts/AuthContext/AuthContext";
import useUpdateRefreshToken from "../../Hooks/useUpdateRefreshToken";
import usePostByToken from "../../Hooks/usePostByToken";
import LoadingButton from "@mui/lab/LoadingButton";
import CirProgress from "../CirProgress/CirProgress";
import CategoryTree from "../CategoryTree/CategoryTree";
const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
const AddProductForm = () =>  {
    const authContext = useContext(AuthContext)
    const [value, setValue] = useState(0);

    const [selectedImage, setSelectedImage] = useState(null);
    const [image, setImage] = useState()
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUploaded, setImageUploaded] = useState(false)
    const [isErrorProductName, setIsErrorProductName] = useState(true)
    const [productName, setProductName] = useState("")
    const [isErrorProductModel, setIsErrorProductModel] = useState(true)
    const [productModel, setProductModel] = useState("")
    const [isErrorProductShortDesc, setIsErrorProductShortDesc] = useState(true)
    const [productShortDesc, setProductShortDesc] = useState("")
    const [isErrorProductLongDesc, setIsErrorProductLongDesc] = useState(true)
    const [productLongDesc, setProductLongDesc] = useState("")
    const [isErrorProductWholesaleProse, setIsErrorProductWholesalePrice ] = useState(true)
    const [productWholesalePrice, setProductWholesalePrice] = useState(0)
    const [isErrorProductRetailPrice, setIsErrorProductRetailPrice] = useState(true)
    const [productRetailPrice, setProductRetailPrice] = useState(0)
    const [isErrorProductEntity, setIsErrorProductEntity] = useState(true)
    const [productEntity, setProductEntity] = useState(0)
    const [productDollarPrice, setProductDollarPrice] = useState(0)
    const [isErrorProductDollarPrice, setIsErrorProductDollarPrice] = useState(true)

    const [open, setOpen] = useState(false)
    const [severity, setSeverity] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState("loaded")
    const [selectedCategory, setSelectedCategory] = useState([])
    const {loadingStatus, verificationMessage, severity: sever, open: op, sendRequest: upload, handleClose} = usePostByToken()
    const {sendRequest: refreshToken} = useUpdateRefreshToken()
    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    const fullNameHandler = (event) => {
        if(event.target.value === ""){
            setIsErrorProductName(true)
        }else{
            setIsErrorProductName(false)
        }
        setProductName(event.target.value)
    }
    const productModelHandler = (event) => {
        if(event.target.value === ""){
            setIsErrorProductModel(true)
        }else{
            setIsErrorProductModel(false)
        }
        setProductModel(event.target.value)
    }
    const longDescriptionHandler = (event) => {
        if(event.target.value === ""){
            setIsErrorProductLongDesc(true)
        }else{
            setIsErrorProductLongDesc(false)
        }
        setProductLongDesc(event.target.value)
    }
    const shortDescHandler = (event) => {
        if(event.target.value === ""){
            setIsErrorProductShortDesc(true)
        }else{
            setIsErrorProductShortDesc(false)
        }
        setProductShortDesc(event.target.value)
    }
    const entityHandler = (event) => {
        if(event.target.value === ""){
            setIsErrorProductEntity(true)
        }else{
            setIsErrorProductEntity(false)
        }
        setProductEntity(event.target.value)
    }
    const wholesaleHandler = (event) => {
        if(event.target.value === ""){
            setIsErrorProductWholesalePrice(true)
        }else{
            setIsErrorProductWholesalePrice(false)
        }
        setProductWholesalePrice(event.target.value)
    }
    const retailPriceHandler = (event) => {
        if(event.target.value === ""){
            setIsErrorProductRetailPrice(true)
        }else{
            setIsErrorProductRetailPrice(false)
        }
        setProductRetailPrice(event.target.value)
    }
    const dollarPriceHandler = (event) => {
        if(event.target.value === ""){
            setIsErrorProductDollarPrice(true)
        }else{
            setIsErrorProductDollarPrice(false)
        }
        setProductDollarPrice(event.target.value)
    }
    const onSelectFile = (event) => {
        let fileName = event.target.files[0].name
        let filesize = event.target.files[0].size
        console.log(filesize)
        let extension = fileName.substring(fileName.lastIndexOf(".")).toUpperCase()
        if (extension === ".JPG" || extension === ".JPEG" || extension === ".PNG") {
            if(filesize < 200000)
            {
                setSelectedImage(event.target.files[0])
            }else{
                setOpen(true)
                setSeverity("error")
                setMessage("size must be less than 200 kb")
            }
        } else {
            setOpen(true)
            setSeverity("error")
            setMessage("you should choose jpeg, jpg  or png file")
        }
    }
    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
            const fileReader = new FileReader()
            fileReader.readAsDataURL(selectedImage)
            fileReader.onload = () => {
                setImage(fileReader.result)
                setImageUploaded(true)
            }
        }
    }, [selectedImage]);
    const uploadProduct = () => {
        if(!(isErrorProductShortDesc || isErrorProductWholesaleProse || isErrorProductLongDesc || isErrorProductRetailPrice || isErrorProductName || isErrorProductEntity || isErrorProductModel)){
            if(imageUploaded){
                fetchData().then(r => () => {
                    setOpen(true)
                    setSeverity("success")
                    setMessage("Product Uploaded Successfully")
                }).catch((e) => {
                    setOpen(true)
                    setSeverity("error")
                    setMessage("Product Not Uploaded")
                })
            }else{
                setOpen(true)
                setSeverity("error")
                setMessage("Image Not Uploaded")
            }
        }
        else{
            setOpen(true)
            setSeverity("error")
            setMessage("Please Fill All Field")
        }

    }

    const fetchData = async () => {
        try {

            const applyData = (data) => {
                if (data.status) {
                    setMessage(data.result.message)
                    setProductRetailPrice(0)
                    setProductWholesalePrice(0)
                    setProductEntity(0)
                    setProductModel("")
                    setProductShortDesc("")
                    setProductLongDesc("")
                    setProductName("")
                    setProductDollarPrice(0)
                    setImage(null)
                    setImageUrl(null)
                } else if (data.result === "Refresh-Token") {
                    const applyRefresh = (data) => {
                        if (data.status) {
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
                            fetchData()
                        }
                    }
                    refreshToken(applyRefresh).then(r => {
                    }, error => {
                    }).catch(e => {
                    })
                }else {
                    console.log(data)
                }
            }
            const data = {
                product_name: productName,
                product_model: productModel,
                product_wholesale_price: productWholesalePrice,
                product_retail_price: productRetailPrice,
                product_dollar_price:productDollarPrice,
                product_entity: productEntity,
                product_short_desc: productShortDesc,
                product_long_desc: productLongDesc,
                product_image_id: Date.now(),
                product_image_data: image,
                cat:selectedCategory
            }
            console.log(data)
            upload({url: '/product', data: data}, applyData).then(r => {
            }, error => {
            }).catch(e => {
            })

        } catch (e){

        }
    }
    const categoryHandler = (value) => {
        console.log(value)
        setSelectedCategory([...value])
    }
    return (
        <Fragment>
            <Card sx={{marginRight: "auto", marginLeft: "auto", width: "95%", padding: 1}}>
                <TextField sx={{width: "50%", margin: 1}}
                           error={isErrorProductName}
                           id="standard-helperText"
                           label="Product Name"
                           variant="outlined"
                           onChange={fullNameHandler}
                           value={productName}
                           disabled={loadingStatus === "loading"}
                />
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Upload Image" {...a11yProps(0)} />
                        <Tab label="Descriptions" {...a11yProps(1)} />
                        <Tab label="Entities" {...a11yProps(2)} />
                        <Tab label="Prices" {...a11yProps(3)} />
                        <Tab label="Category" {...a11yProps(4)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <form>
                        <input
                            accept="image/*"
                            type="file"
                            id="select-image"
                            multiple
                            onChange={onSelectFile}
                            disabled={loadingStatus === "loading"}
                        />
                        <div>
                            {!imageUrl && !selectedImage &&
                                <p>Drag your files here or click in this area.</p>
                            }
                            {imageUrl && selectedImage && (
                                <Box sx={{marginLeft: 1, justifyContent: "center", verticalAlign: "center"}}>
                                    <img src={imageUrl} alt={selectedImage.name}
                                         style={{width: 350, margin: "4%", height: 350}}/>
                                </Box>
                            )}
                        </div>
                    </form>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <TextField sx={{width: "50%", margin: 1}}
                               error={isErrorProductModel}
                               id="standard-helperText"
                               label="Product Model"
                               variant="outlined"
                               onChange={productModelHandler}
                               value={productModel}
                               disabled={loadingStatus === "loading"}
                    />
                    <TextField sx={{width: "50%", margin: 1}}
                               error={isErrorProductShortDesc}
                               id="standard-helperText"
                               label="Short Description"
                               variant="outlined"
                               multiline={true}
                               onChange={shortDescHandler}
                               value={productShortDesc}
                               disabled={loadingStatus === "loading"}
                    />
                    <TextField sx={{width: "50%", margin: 1}}
                               error={isErrorProductLongDesc}
                               id="standard-helperText"
                               label="Long Description"
                               variant="outlined"
                               multiline={true}
                               onChange={longDescriptionHandler}
                               value={productLongDesc}
                               disabled={loadingStatus === "loading"}
                    />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <TextField sx={{width: "50%", margin: 1}}
                               error={isErrorProductEntity}
                               id="standard-helperText"
                               label="Product entity"
                               variant="outlined"
                               onChange={entityHandler}
                               type="number"
                               value={productEntity}
                               disabled={loadingStatus === "loading"}
                    />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <TextField sx={{width: "50%", margin: 1}}
                               error={isErrorProductDollarPrice}
                               id="standard-helperText"
                               label="Product Dollar Price"
                               variant="outlined"
                               onChange={dollarPriceHandler}
                               value={productDollarPrice}
                               type="number"
                               disabled={loadingStatus === "loading"}
                    />
                    <TextField sx={{width: "50%", margin: 1}}
                               error={isErrorProductWholesaleProse}
                               id="standard-helperText"
                               label="Product Wholesale Price"
                               variant="outlined"
                               onChange={wholesaleHandler}
                               value={productWholesalePrice}
                               type="number"
                               disabled={loadingStatus === "loading"}
                    />
                    <TextField sx={{width: "50%", margin: 1}}
                               error={isErrorProductRetailPrice}
                               id="standard-helperText"
                               label="Product Retail Price"
                               variant="outlined"
                               onChange={retailPriceHandler}
                               value={productRetailPrice}
                               type="number"
                               disabled={loadingStatus === "loading"}
                    />
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <CategoryTree onSelectedCategory={categoryHandler}/>
                </TabPanel>
                <Snackbar open={open || op} autoHideDuration={4000} onClose={open ? handleSnackClose : handleClose}>
                    <Alert onClose={open ? handleSnackClose : handleClose} severity={severity || sever} sx={{width: 400}}>
                        {message || verificationMessage}
                    </Alert>
                </Snackbar>
            </Card>
            <Card style={{width:"95%", textAlign:"center", bottom: 0, position:"fixed", marginBottom: 10, backgroundColor: "#ec6a6a" }}>
                <LoadingButton
                    loading={loadingStatus === "loading" || loading === "loading"}
                    onClick={uploadProduct}
                    loadingIndicator={<CirProgress width={32} height={32} />}
                >
                    Upload Product
                </LoadingButton>
            </Card>
        </Fragment>
    )
}

export default AddProductForm