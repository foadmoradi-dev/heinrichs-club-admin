import {Fragment} from "react";
import {Card, Typography} from "@mui/material";

const TicketContentRow = (props) => {
    return(
        <Fragment>
            <Card sx={{borderStyle:"solid", borderWidth:2, borderColor:"#02f8e0", minHeight: 200, marginBottom:2, marginRight: "auto", marginLeft: "auto", width: "95%", padding: 1, backgroundColor : props.userId === props.rowContent.writer_id ? "#eae9e9" : "#8c8989"  }}>
                <Typography className="col-sm-3" sx={{ fontSize: 17, padding:1 }} color="#000000" gutterBottom>
                    <span style={{fontWeight:"bold", color:"#1e544f", fontSize:20}} >{props.rowContent.date}:</span>
                </Typography>
                <Typography className="col-sm-3" sx={{ fontSize: 15, padding:1, color : props.userId === props.rowContent.writer_id ? "#000" : "#fff"}} color="#000000" gutterBottom>
                    {props.rowContent.content}
                </Typography>
            </Card>
        </Fragment>
    )
}
export default TicketContentRow