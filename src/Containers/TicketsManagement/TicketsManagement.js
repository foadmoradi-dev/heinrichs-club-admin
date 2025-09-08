import {forwardRef, Fragment, useContext, useEffect, useState} from "react";
import useGetByToken from "../../Hooks/useGetByToken";
import useUpdateRefreshToken from "../../Hooks/useUpdateRefreshToken";
import {AuthContext} from "../../Contexts/AuthContext/AuthContext";
import {Box, Card, IconButton, InputLabel, MenuItem, Select, Snackbar} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import TicketListTemplate from "../../Components/TicketListTemplate/TicketListTemplate";
import PropTypes from "prop-types";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";
import {useTheme} from "@mui/material/styles";
const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export const statusTable = [
    {
        bre:1, name:"New" // 1
    },
    {
        bre:2, name:"In Progress" // 2
    },
    {
        bre:3, name:"On Hold" // 3
    },
    {
        bre:4, name:"Resolved" // 4
    },
    {
        bre:6, name:"Closed" // 6
    },
    {
        bre:5, name:"Reopen" // 5
    }
]
export const roleTable = [
    {
        bre:2, name:"Customer" // 2
    },
    {
        bre:1, name:"Agent" // 1
    },
    {
        bre:3, name:"Others" // 3
    }
]
function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            {/* <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>*/}
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page > Math.ceil(count / rowsPerPage) - 2}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            {/*<IconButton
                onClick={handleLastPageButtonClick}
                disabled={page > Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>*/}
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};
const columns = [
    { id: 'id', label: 'Ticket Id', maxWidth: 50 },
    { id: 'last_name', label: 'Lastname', minWidth: 50, align: "center" },
    { id: 'first_name', label: 'Firstname', minWidth: 50, align: "center" },
    {id: 'role', label: 'Role', minWidth: 100, align: 'center',},
    {id: 'phone_number', label: 'Phone Number', minWidth: 100, align: 'center',},
    {id: 'subject', label: 'Subject', minWidth: 300, align: 'center',},
    {id: 'status', label: 'Status', minWidth: 100, align: 'center',},
    {id: 'last_update', label: 'Last Update', minWidth: 100, align: 'center',},

];

const TicketsManagement = () => {
    const [ticketStatus, setTicketStatus] = useState(1)
    const [roleStatus, setRoleStatus] = useState(2)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([])
    const [count, setCount] = useState()
    const {verificationMessage, handleSnackClose, open, severity, sendRequest:getData, loadingStatus} = useGetByToken()
    const {sendRequest: refreshToken} = useUpdateRefreshToken()
    const authContext = useContext(AuthContext)
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const statusSelectHandler = (event) => {
        console.log(event.target.value)
        setRows([])
        setCount(0)
        setTicketStatus(event.target.value)
        getAllData(event.target.value, roleStatus).then( r=> {}, e => {}).catch( e=>{

        })
    }
    const roleSelectHandler = (event) => {
        console.log(event.target.value)
        setRows([])
        setCount(0)
        setRoleStatus(event.target.value)
        getAllData(ticketStatus, event.target.value).then( r=> {}, e => {}).catch( e=>{
        })
    }

    const getAllData = async (status, role) => {
        const applyData = (data) => {
            if (data.status) {
                setCount(data.result.length)
                setRows([...data.result])
            } else if (data.result === "Refresh-Token") {
                const applyRefresh = (data) => {
                    let d = null
                    if (data.status) {
                        authContext.dispatch({
                            type: "update-token", payload: {
                                data : {
                                    role_id: data.result.id,
                                    role: "admin",
                                    access_token: data.result.access_token,
                                    refresh_token: data.result.refresh_token}
                            }
                        })
                        getAllData(status, role)
                    }
                }
                refreshToken(applyRefresh).then(r => {}, error => {}).catch(e => {})
            }
        }
        await getData({url: `/ticket?status=${status}&role=${role}`}, applyData)
    }
    useEffect(() => {
        // getCountData().then(r => () => {
        // }).catch((e) => {
        // })
        getAllData(ticketStatus, roleStatus).then(r => () => {
        }).catch((e) => {
        })
    }, [])
    return(
        <div className="row container-fluid g-0 " style={{marginTop: 70, marginBottom: 6, justifyContent:"center"}}>
            <Card sx={{marginRight: "auto", marginLeft: "auto", width: "95%", padding: 1}}>
                <FormControl size="small" variant="standard" sx={{ m: 1, width: 240, marginRight:"auto", marginLeft:"auto", marginBottom:2, marginTop:2 }}>
                    <InputLabel id="demo-select-small-label">Ticket Status</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={ticketStatus}
                        onChange={statusSelectHandler}
                        label="Ticket Status"
                    >
                        {
                            statusTable.map(table =>
                                    <MenuItem value={table.bre}>{table.name}</MenuItem>
                            )
                        }
                    </Select>
                </FormControl>
                <FormControl size="small" variant="standard" sx={{ m: 1, width: 240, marginRight:"auto", marginLeft:3, marginBottom:2, marginTop:2 }}>
                    <InputLabel id="demo-select-small-label">Role</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={roleStatus}
                        onChange={roleSelectHandler}
                        label="Role"
                    >
                        {
                            roleTable.map(table =>
                                <MenuItem value={table.bre}>{table.name}</MenuItem>
                            )
                        }
                    </Select>
                </FormControl>
                <TicketListTemplate
                    type="ticket"
                    columns={columns}
                    rowsPerPage={rowsPerPage}
                    rows={rows}
                    page={page}
                    emptyRows={emptyRows}
                    allRowCount={count}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    TablePaginationActions={TablePaginationActions}
                />
                <Snackbar open={open} autoHideDuration={4000} onClose={handleSnackClose}>
                    <Alert onClose={handleSnackClose} severity={severity} sx={{ width: 400 }}>
                        {verificationMessage}
                    </Alert>
                </Snackbar>
            </Card>
        </div>
    )
}
export default TicketsManagement