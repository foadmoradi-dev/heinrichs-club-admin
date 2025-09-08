import AddWidget from "../../Widgets/AddWidget/AddWidget";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const ContentManagementLink = () => {
    return(
        <AddWidget color="#ffeedd" title="Content Manage"
                   icon={<AddCircleOutlineIcon sx={{fontSize:70}} />} buttonTitle="Modify Contents"/>
    )
}
export default ContentManagementLink