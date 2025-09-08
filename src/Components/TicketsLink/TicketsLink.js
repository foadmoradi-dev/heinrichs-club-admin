import {Card} from "@mui/material";
import AddWidget from "../../Widgets/AddWidget/AddWidget";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SendIcon from '@mui/icons-material/Send';


const TicketsLink = (props) => {
    return(
        <AddWidget
            color="#ffee33" title="Ticket Management"
            icon={<SendIcon sx={{fontSize:70}} />}
            buttonTitle="Send and Replay Tickets ..."
            onClick={props.onClick}
        />
    )
}
export default TicketsLink