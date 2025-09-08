import {Fragment} from "react";
import {Card, Divider, Typography} from "@mui/material";

const AddGuarantiesLog = (props) => {
    return(
        <div className="row container-fluid g-0 " style={{marginTop: 10, marginBottom: 6, justifyContent:"center"}}>
            <div className="col-sm-6 px-2">
                <Card  sx={{marginRight:"auto", marginLeft:"auto", width:600, padding:1}}>
                    <Typography sx={{ fontSize: 25 }} color="#000000" gutterBottom>
                        Success List
                    </Typography>
                    <div style={{overflowY:"scroll", height:300}}>
                        {
                            props.successList ?
                                <p><span style={{fontSize:20, color:"#2bc519"}}>{props.successList.length}</span><span style={{fontSize:16}}> Guaranties Uploaded Successfully</span> </p>: null
                        }
                        {
                            props.successList?
                                props.successList.map(success =>
                                    <p><span style={{fontSize:16, color:"#b206a3"}}>{success}</span><span style={{fontSize:16}}>: Uploaded Successfully</span> </p>
                                ): null
                        }
                    </div>
                </Card>
            </div>
            <div className="col-sm-6 px-2">
                <Card  sx={{marginRight:"auto", marginLeft:"auto", width:600, padding:1}}>
                    <Typography sx={{ fontSize: 25 }} color="#000000" gutterBottom>
                        Faild List
                    </Typography>

                    <div style={{overflowY:"scroll", height: 300}}>
                        {
                            props.failedList?
                                <p><span style={{fontSize:20, color:"#e10808"}}>{props.failedList.length}</span><span style={{fontSize:16}}> Guaranties Failed Uploading</span> </p>: null
                        }
                        {
                            props.failedList ?
                                props.failedList.map(error =>
                                    <p>{error}</p>
                                ): null
                        }
                    </div>
                </Card>
            </div>
        </div>
    )
}
export default AddGuarantiesLog