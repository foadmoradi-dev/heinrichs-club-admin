import Box from "@mui/material/Box";
import {Button, CircularProgress, Snackbar, TableHead, TextField, Typography} from "@mui/material";
import {Fragment, useContext, useState} from "react";
import * as React from "react";
import {forwardRef} from "react";
import MuiAlert from "@mui/material/Alert";
import {AuthContext} from "../../Contexts/AuthContext/AuthContext";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import {useTheme} from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import PropTypes from "prop-types";
import useGetByToken from "../../Hooks/useGetByToken";
import useUpdateRefreshToken from "../../Hooks/useUpdateRefreshToken";

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
            {<IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>}
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
            {<IconButton
                onClick={handleLastPageButtonClick}
                disabled={page > Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>}
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
    { id: 'barcode', label: 'Barcode', maxWidth: 150 },
    { id: 'customer', label: 'Customer', minWidth: 250, align: "center" },
    {id: 'phone', label: 'Phone Number', minWidth: 250, align: 'center',},
    {id: 'product', label: 'Product Model', minWidth: 250, align: 'center',},
    {id: 'price', label: 'Product Price', minWidth: 250, align: 'center',},
    {id: 'left', label: 'Left Of Days', minWidth: 250, align: 'center',},
    {id: 'agent', label: 'Agent', minWidth: 250, align: 'center',},
];

const SearchGuarantee = () => {
    const authContext = useContext(AuthContext)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [isErrorBarcode, setIsErrorBarcode] = useState(true)
    const [isErrorPhone, setIsErrorPhone] = useState(true)
    const [barcode, setBarcode] = useState("")
    const [phone, setPhone] = useState("")
    const [rows, setRows] = useState([])
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    const {open, severity, verificationMessage, sendRequest: fetchSearch, loadingStatus, handleSnackClose} = useGetByToken()
    const {sendRequest: refreshToken} = useUpdateRefreshToken()
    const searchPhoneHandler = (event) => {
        if(event.target.value.length !== 11 || event.target.value === ""){
            setIsErrorPhone(true)
        }
        else{
            setIsErrorPhone(false)
        }
        setPhone(event.target.value)
    }
    const barcodeSearchHandler = (event) => {
        if(event.target.value.length <11 || event.target.value === ""){
            setIsErrorBarcode(true)
        }else{
            setIsErrorBarcode(false)
        }
        setBarcode(event.target.value)
    }
    const searchHandler = () => {
        const applyData = (data) => {
            if(data.status){
                setRows(data.result)
            }else if(data.result === "Refresh-Token"){
                const applyRefresh = (data) => {
                    if(data.status){
                        authContext.dispatch({
                            type: "update", payload: {
                                role_id: data.result.id,
                                access_token: data.result.access_token,
                                refresh_token: data.result.refresh_token,
                                role: "admin"
                            }
                        })
                        searchHandler()
                    }
                }
                refreshToken(applyRefresh).then(r => {}, error => {}).catch(e =>{})
            }
        }
        if(!isErrorBarcode) {
            fetchSearch({url: `/guarantee?barcode=${barcode}`}, applyData).then(r => {}, error => {}).catch(e => {})
        } else if(!isErrorPhone) {
            fetchSearch({url: `/guarantee?phone=${phone}`}, applyData).then(r => {}, error => {}).catch(e => {})
        }
    }
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage)

    };
    return(
        <div className="row" style={{marginTop: 70, marginBottom: 6, width:"90%", marginRight:"auto", marginLeft:"auto"}}>
            <Fragment>
                {
                    loadingStatus==="Loading"?
                        <Box sx={{ display: 'flex', width:"100%", height:"100%",paddingLeft:"48%", paddingTop:"135px", position:"fixed", zIndex:100 }}>
                            <CircularProgress />
                        </Box>:
                        null
                }
                <Typography variant="p" component="div" color="#000000" sx={{fontStyle:"italic", fontSize:20, marginBottom:2, textAlign:"center"}}>
                    Search In All Guaranties
                </Typography>
                <div className="row" style={{marginTop: 10, marginBottom: 6, width:"90%", marginRight:"auto", marginLeft:"auto"}}>
                    <div className="col-sm-6">
                        <TextField sx={{width:"90%", margin:2}}
                                   error={isErrorBarcode}
                                   id="standard-helperText"
                                   label="search by barcode"
                                   helperText="insert a barcode"
                                   variant="standard"
                                   onChange={barcodeSearchHandler}
                        />
                    </div>
                    <div className="col-sm-6">
                        <TextField sx={{width:"90%", margin:2}}
                                   error={isErrorPhone}
                                   id="standard-helperText"
                                   label="search by phone number"
                                   helperText="the phone number of a customer"
                                   variant="standard"
                                   type="number"
                                   onChange={searchPhoneHandler}
                        />
                    </div>
                </div>
                <Button onClick={searchHandler}>Search</Button>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                    ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : rows
                            ).map((row) => (
                                <TableRow key={row.barcode}>
                                    <TableCell component="th" scope="row">
                                        {row.barcode}
                                    </TableCell>
                                    <TableCell style={{ width: 160 }} align="center">
                                        {row.customer_first_name+ " " + row.customer_last_name}
                                    </TableCell>
                                    <TableCell style={{ width: 160 }} align="center">
                                        {row.customer_phone_number }
                                    </TableCell>
                                    <TableCell style={{ width: 160 }} align="center">
                                        {row.product_model}
                                    </TableCell>
                                    <TableCell style={{ width: 160 }} align="center">
                                        {row.price}
                                    </TableCell>
                                    <TableCell style={{ width: 160 }} align="center">
                                        {
                                            (540 -  Math.ceil( ((new Date()).getTime() - (new Date(row.start_at)).getTime()) / (1000 * 3600 * 24)))
                                        }
                                    </TableCell>
                                    <TableCell style={{ width: 160 }} align="center">
                                        {row.agent_first_name + " " + row.agent_last_name}
                                    </TableCell>
                                </TableRow>
                            ))}

                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={7} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10  /*, { label: 'All', value: -1 }*/]}
                    colSpan={7}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                        inputProps: {
                            'aria-label': 'rows per page',
                        },
                        native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                />
            </Fragment>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity={severity} sx={{ width: 400 }}>
                    {verificationMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}
export default SearchGuarantee