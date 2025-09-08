import TableTemplate from "../../Components/TableTemplate/TableTemplate";
import Paper from "@mui/material/Paper";
import {Box, Card, CircularProgress, IconButton, InputLabel, MenuItem, Select, Snackbar} from "@mui/material";
import {forwardRef, Fragment, useContext, useEffect, useState} from "react";
import useUpdateRefreshToken from "../../Hooks/useUpdateRefreshToken";
import useGetByToken from "../../Hooks/useGetByToken";
import {AuthContext} from "../../Contexts/AuthContext/AuthContext";
import PropTypes from "prop-types";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";
import {useTheme} from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import {roleTable, statusTable} from "../TicketsManagement/TicketsManagement";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export const orderStatusTable = [
    {
        bre:1, name:"New" // 1
    },
    {
        bre:2, name:"In Progress" // 2
    },
    {
        bre:3, name:"Rejected" // 3
    },
    {
        bre:4, name:"Pending" // 4
    },
    {
        bre:5, name:"Paid" // 5
    },
    {
        bre:6, name:"Dispatched" // 6
    },
    {
        bre:7, name:"Delivered" // 7
    },
    {
        bre:8, name:"Archived" // 8
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
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page > Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page > Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
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
    { id: 'id', label: 'Order ID', minWidth: 15 },
    { id: 'agent_first_name', label: 'First Name', minWidth: 50 },
    { id: 'agent_last_name', label: 'Last Name', minWidth: 50 },
    { id: 'agent_phone_number', label: 'Phone Number', minWidth: 50 },
    { id: 'total_price', label: 'Total Price', minWidth: 50 },
    {id: 'order_status', label: 'Status', minWidth: 50, align: 'center'},
    {id: 'order_date', label: 'Order Date', minWidth: 50, align: 'center'},
];
const ModifyOrders = () => {
    const authContext = useContext(AuthContext)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [count, setCount] = useState(0)
    const [rows, setRows] = useState([])
    const [orderStatus, setOrderStatus] = useState(1)
    const {verificationMessage, handleSnackClose, open, severity, sendRequest:getData, loadingStatus} = useGetByToken()
    const {sendRequest: refreshToken} = useUpdateRefreshToken()
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const orderStatusHandler = (event) => {
        console.log(event.target.value)
        setRows([])
        setCount(0)
        setOrderStatus(event.target.value)
        getAllData(event.target.value).then( r=> {}, e => {console.log(e)}).catch( e=>{
            console.log(e)
        })
    }
    const getAllData = async (status) => {
        const applyData = (data) => {
            if (data.status) {
                console.log(data.result)
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
                        getAllData(status)
                    }
                }
                refreshToken(applyRefresh).then(r => {}, error => {}).catch(e => {})
            }
        }
        await getData({url: `/order?status=${status}`}, applyData)
    }
    useEffect(() => {
        // getCountData().then(r => () => {
        // }).catch((e) => {
        // })
        getAllData(orderStatus).then(r => () => {
        }).catch((e) => {
        })
    }, [])
    return (
        <div className="row container-fluid g-0 " style={{marginTop: 70, marginBottom: 6, justifyContent:"center"}}>
            <Card sx={{marginRight: "auto", marginLeft: "auto", width: "95%", padding: 1}}>
                <FormControl size="small" variant="standard" sx={{ m: 1, width: 240, marginRight:"auto", marginLeft:"auto", marginBottom:2, marginTop:2 }}>
                    <InputLabel id="demo-select-small-label">Ticket Status</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={orderStatus}
                        onChange={orderStatusHandler}
                        label="Order Status"
                    >
                        {
                            orderStatusTable.map(table =>
                                <MenuItem value={table.bre}>{table.name}</MenuItem>
                            )
                        }
                    </Select>
                </FormControl>
                <TableTemplate
                    type="order"
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
export default ModifyOrders