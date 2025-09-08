import AdminProfileLink from "../../../Components/AdminProfileLink/AdminProfileLink";
import {forwardRef, Fragment, useContext, useEffect, useState} from "react";
import {AdminContext} from "../../../Contexts/AdminContext/AdminContext";
import AdminOptions from "../../AdminOptions/AdminOptions";
import MuiAlert from "@mui/material/Alert";
import DigitalWatch from "../../../Widgets/DigitalWatch/DigitalWatch";
import MessagesLink from "../../../Components/MessagesLink/MessagesLink";
import TicketsLink from "../../../Components/TicketsLink/TicketsLink";
import useGetByToken from "../../../Hooks/useGetByToken";
import useDecryption from "../../../Hooks/useDecryption";
import {useNavigate} from "react-router";

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const DashboardAdmin = () => {
    const adminContext = useContext(AdminContext)
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [level, setLevel] = useState("")
    const {loadingStatus, sendRequest: getHandler, verificationMessage, severity, handleSnackClose, open} = useGetByToken()
    const {decryption} = useDecryption()
    const navigate = useNavigate()
    const getData = (id) => {
        const applyData = (data) => {
            if(data.status){
                setFirstname(data.result.first_name)
                setLastname(data.result.last_name)
                setLevel(data.result.level)
            }
        }
        getHandler({url:"/admin/" + id}, applyData).then(r => {}, error => {}).catch(e => {})
    }
    const ticketHandler = () => {
        navigate('/dashboard/tickets')
    }
    useEffect(() => {
        decryption(localStorage.getItem("data"), (data) => {
            getData(JSON.parse(data).role_id)
        })

    }, [])

    return(
        <div className="row" >
            {
                level !== "1"?
                <div className="col-sm-3">
                    <DigitalWatch />
                </div>:
                    null
            }
            <div className="col-sm-3">
                <AdminProfileLink firstname={firstname} lastname={lastname} />
            </div>
            <Fragment>
                {
                    level === "1"?
                        <div className="col-sm-9">
                            <AdminOptions />
                        </div>
                        :
                        <Fragment>
                            <div className="col-sm-3">
                                <TicketsLink onClick={ticketHandler}/>
                            </div>
                            <div className="col-sm-3">
                                <MessagesLink />
                            </div>
                        </Fragment>
                }
            </Fragment>
        </div>
    )
}
export default DashboardAdmin