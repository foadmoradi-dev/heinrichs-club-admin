import ExcelFileSelector from "../ExcelFileSelector/ExcelFileSelector";
import {Box, Button, Card, CircularProgress, Divider, Snackbar, Typography} from "@mui/material";
import {useContext, useState} from "react";
import "./InputFileContainer.css"
import {AuthContext} from "../../Contexts/AuthContext/AuthContext";
import {forwardRef} from "react";
import MuiAlert from "@mui/material/Alert";
import AddGuarantiesLog from "../AddGuarantiesLog/AddGuarantiesLog";
import usePostByToken from "../../Hooks/usePostByToken";
import useUpdateRefreshToken from "../../Hooks/useUpdateRefreshToken";
import LoadingButton from "@mui/lab/LoadingButton";
import CirProgress from "../CirProgress/CirProgress";
const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddGuaranties = () => {
    const authContext = useContext(AuthContext)
    const [formatIsTrue, setFormatIsTrue] = useState(false)
    const [event, setEvent] = useState()
    const [successList, setSuccessList] = useState([])
    const [failedList, setFailedList] = useState([])

    const {loadingStatus, handleSnackClose, open, sendRequest: upload, severity, verificationMessage} = usePostByToken()
    const {sendRequest: refreshToken} = useUpdateRefreshToken()
    const formatHandler = (formatIsTrue) => {
        setFormatIsTrue(formatIsTrue)
    }
    const excelFileToJson = (file) => {
        try {
            let reader = new FileReader()
            reader.readAsBinaryString(file)
            reader.onload = function (e) {
                let data = e.target.result
                // eslint-disable-next-line no-undef
                let workbook = XLSX.read(data, {type: "binary"})
                let result = {}
                workbook.SheetNames.forEach(function (sheetName) {
                    // eslint-disable-next-line no-undef
                    let roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {header: 1})
                    if (roa.length > 0) {
                        result[sheetName] = roa
                    }
                    //parseJson(JSON.stringify(result, null, 4), sheetName)
                    uploadJson(JSON.stringify(result, null, 4), sheetName)
                })
            }
        } catch (e) {

        }
    }

    const uploadJson = (obj, sheetName) => {
        const applyData = (data) => {
            if (data.status) {
                setSuccessList(data.result.message[0][0])
                setFailedList(data.result.message[0][1])
            }else if(data.result === "Refresh-Token"){
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
                        uploadJson()
                    }
                }
                refreshToken(applyRefresh).then(r => {}, error => {}).catch(e => {})
            }
        }
        try{
            let data = []
            let res = JSON.parse(obj)[sheetName]
            for (let row in res) {
                data.push(res[row][0])
            }
            upload({url:'/guarantee', data:data}, applyData).then( r=> {}, error => {}).catch(e => {})
        }catch (e){

        }

    }
    const fileHandler = (event) => {
        setEvent(event)
    }
    const uploading = () => {
        let file = event.target.files[0]
        if (file.length === 0) {
            alert("Please Choose a Valid File...")
        } else {
            excelFileToJson(file)
        }
    }

    return (
        <div className="row container-fluid g-0 " style={{marginTop: 70, marginBottom: 6, justifyContent:"center"}}>
           <Card sx={{marginRight:"auto", marginLeft:"auto", width:"95%", padding:1}}>
               <div className="container mdl-shadow--6dp" style={{width:400}}>
                   <h2>Please Input Barcodes File</h2>
                   <h6>Inspired by
                       <a href="#" target="_blank">
                           Heinrichs Co. Online
                       </a>
                   </h6>
                   <ExcelFileSelector active={loadingStatus !== "loading"} formatHandler={formatHandler} fileHandler={fileHandler}/>
                   {formatIsTrue ? <LoadingButton loadingIndicator={<CirProgress width={32} height={32} />} loading={loadingStatus === "loading"} onClick={uploading} style={{marginTop: 10}}>Upload</LoadingButton> : null}
                   <Snackbar open={open} autoHideDuration={4000} onClose={handleSnackClose}>
                       <Alert onClose={handleSnackClose} severity={severity} sx={{ width: 400 }}>
                           {verificationMessage}
                       </Alert>
                   </Snackbar>
               </div>
               <Divider sx={{borderColor:"#3a1b44", borderWidth: 1, marginTop:2, marginBottom:2}}/>
               <AddGuarantiesLog successList={successList} failedList={failedList} />
           </Card>
        </div>

    )
}
export default AddGuaranties