import {Card} from "@mui/material";
import AddWidget from "../../Widgets/AddWidget/AddWidget";
import SendIcon from "@mui/icons-material/Send";
import MessageIcon from '@mui/icons-material/Message';
const MessagesLink = () => {
    return(
        <AddWidget color="#11ee33" title="Message Management"
                   icon={<MessageIcon sx={{fontSize:70}} />} buttonTitle="message to agents , ..."/>
    )
}
export default MessagesLink