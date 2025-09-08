import AddWidget from "../../Widgets/AddWidget/AddWidget";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const AddNewAdminLink = () => {
    return(
        <AddWidget color="#ffeedd" title="New Employee"
                         icon={<AddCircleOutlineIcon sx={{fontSize:70}} />} buttonTitle="Add new Admin"/>
    )
}
export default AddNewAdminLink