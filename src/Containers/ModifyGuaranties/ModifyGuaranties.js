import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import "./ModifyGuaranties.css"
import {useContext, useEffect, useState, Fragment} from "react";
import {CircularProgress, InputLabel, MenuItem, Select, Snackbar, TableHead, Typography} from "@mui/material";
import {AuthContext} from "../../Contexts/AuthContext/AuthContext";
import FormControl from '@mui/material/FormControl';
import SearchGuarantee from "../../Components/SearchGuarantee/SearchGuarantee";
import {forwardRef} from "react";
import MuiAlert from "@mui/material/Alert";
import {TablesList} from "./TablesList";
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
                disabled={page > Math.ceil(count / rowsPerPage) - 1}
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
    { id: 'barcode', label: 'Barcode', maxWidth: 150 },
    { id: 'agent', label: 'Agent', minWidth: 250, align: "center" },
    {id: 'customer', label: 'Customer', minWidth: 250, align: 'center',},
    {id: 'phone', label: 'Phone Number', minWidth: 250, align: 'center',},
    {id: 'product', label: 'Product Model', minWidth: 250, align: 'center',},
    {id: 'price', label: 'Product Price', minWidth: 250, align: 'center',},
    {id: 'left', label: 'Left Of Days', minWidth: 250, align: 'center',},
];
const productTable = [
    {
        name:"hkm", value:"Kneading Machine"
    },
    {

    }
]
const ModifyGuaranties = () => {
    const authContext = useContext(AuthContext)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [pageForLoading, setPageForLoading] = useState(1)
    const [allRowCount, setAllRowCount] = useState(0)
    const [rows, setRows] = useState([])
    const [table, setTable] = useState("hfr")
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    const {loadingStatus, verificationMessage, sendRequest: fetchData, handleSnackClose,severity, open} = useGetByToken()
    const {sendRequest: refreshToken} = useUpdateRefreshToken()
    const handleChangePage = (event, newPage) => {
        setPage(newPage)
        if(rowsPerPage * newPage >= rows.length ){
            setPageForLoading(pageForLoading + 1)
            fetchTableAll(pageForLoading + 1)
        }
    };
    const fetchCountAll = () => {
        const applyData = async (data) => {
            if (data.status) {
                setAllRowCount(data.result.count)
               fetchTableAll(pageForLoading)
            }else if(data.result === "Refresh-Token"){
                const applyRefresh = (data) => {
                    if(data.status){
                        authContext.dispatch({
                            type: "update", payload: {
                                data:{
                                    role_id: data.result.id,
                                    access_token: data.result.access_token,
                                    refresh_token: data.result.refresh_token,
                                    role:"admin"
                                }
                            }
                        })
                        fetchCountAll()
                    }
                }
                refreshToken(applyRefresh).then(r => {}, error => {}).catch(e =>{})
            }
        }
        fetchData({url:`/guarantee?page=-1&type=`+table}, applyData).then( r => {}, error => {}).catch(e => {})
    }
    const fetchTableAll = (pageForLoad) => {
        const applyData = (data) => {
            if(data.status){
                const current = [... rows]
                current.push(...data.result)
                setRows(current)
            }else if(data.result === "Refresh-Token"){
                const applyRefresh = (data) => {
                    if(data.status){
                        authContext.dispatch({
                            type: "update", payload: {
                                data:{
                                    role_id: data.result.id,
                                    access_token: data.result.access_token,
                                    refresh_token: data.result.refresh_token,
                                    role:"admin"
                                }
                            }
                        })
                        fetchTableAll()
                    }
                }
                refreshToken(applyRefresh).then(r => {}, error => {}).catch(e =>{})
            }
        }
        fetchData({url:`/guarantee?page=${pageForLoad}&type=${table}`}, applyData).then( r => {}, error => {}).catch(e => {})
    }
    const tableSelectHandler = (event) => {
        setTable(event.target.value)
        setRows([])
        setAllRowCount(0)
    }
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    useEffect(() => {
        fetchCountAll()
    }, [table])


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
                All guaranties Registered
            </Typography>
                <FormControl variant="standard" sx={{ m: 1, width: 240, marginRight:"auto", marginLeft:"auto", marginBottom:2, marginTop:2 }}>
                    <InputLabel id="demo-simple-select-standard-label">Type Of Product</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={table}
                        onChange={tableSelectHandler}
                        label="Type of Product"
                    >
                        {
                            TablesList.map(table => (
                                <MenuItem value={table.bre}>{table.name}</MenuItem>
                                )
                            )
                        }

                    </Select>
                </FormControl>
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
                                    {row.agent_first_name + " " + row.agent_last_name}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="center">
                                    {row.customer_first_name + " " + row.customer_last_name}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="center">
                                    {row.phone_number}
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
                            </TableRow>
                        ))}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 100  /*, { label: 'All', value: -1 }*/]}
                colSpan={6}
                count={allRowCount}
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
            <Fragment>
                <SearchGuarantee />
            </Fragment>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity={severity} sx={{ width: 400 }}>
                    {verificationMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}
export default ModifyGuaranties