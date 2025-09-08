import {Button} from "@mui/material";
import "./ConnectionError.css"
const ConnectionError = (props) => {
    return(
        <div className="notfound-404" style={{textAlign: "center"}}>
            <h1 className="notfound-404-h1">Oops</h1>
            <h2 className="notfound-404-h2">403 - Data Not Loaded</h2>
            <Button onClick={props.tryAgain} sx={{display:"inline-block", top:"70%", fontSize:30}}>Try again</Button>
        </div>
    )
}
export default ConnectionError