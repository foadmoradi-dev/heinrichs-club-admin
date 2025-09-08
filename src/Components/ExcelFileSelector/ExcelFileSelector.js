import {useState} from "react";
import "./ExcelFileSelector.css"
import {Button} from "@mui/material";
import {TextFields} from "@mui/icons-material";
const ExcelFileSelector = (props) => {
    const [fileName, setFileName] = useState("File must be xlsx or xls format")
    const fileInputSelectionHandler = (event) => {
        let fileName = event.target.files[0].name
        let extension = fileName.substring(fileName.lastIndexOf(".")).toUpperCase()
        if(extension === ".XLS" || extension === ".XLSX"){
            setFileName(event.target.files[0].name)
            props.formatHandler(true)
            props.fileHandler(event)
        }
        else
        {
            setFileName("Please Select a Valid File")
            props.formatHandler(false)
        }

    }
    return(
        <div>
            <div className="file-upload mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                 data-upgraded="MaterialButton,MaterialRipple">
                <span>BROWSE</span>
                <input disabled={!props.active} type="file" name="FileAttachment" id="FileAttachment" className="upload" onChange={fileInputSelectionHandler}/>
                <span className="mdl-button__ripple-container">
                    <span className="mdl-ripple"/>
                </span>
            </div>
            <span id="fileuploadurl">{fileName}</span>
        </div>
    )
}
export default ExcelFileSelector