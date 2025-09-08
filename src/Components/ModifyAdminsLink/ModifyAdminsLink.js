import AddWidget from "../../Widgets/AddWidget/AddWidget";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const ModifyAdminsLink = () => {
    return(
        <AddWidget color="#ffeedd" title="Modify Admins"
                   icon={<AddCircleOutlineIcon sx={{fontSize:70}} />} buttonTitle="add, update and remove admins"/>
    )
}
export default ModifyAdminsLink