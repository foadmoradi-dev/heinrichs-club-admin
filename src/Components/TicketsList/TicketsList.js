import {Box, CircularProgress, IconButton, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";
import {forwardRef, useEffect, useState, Fragment, useContext} from "react";
import "./Prices.css"
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";
import {useTheme} from "@mui/material/styles";
import MuiAlert from "@mui/material/Alert";
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import PropTypes from "prop-types";
import {AuthContext} from "../../Contexts/AuthContext/AuthContext";
import TicketsRow from "../TicketsRow/TicketsRow";



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
    { id: 'id', label: 'ID', minWidth: 15 },
    { id: 'department_id', label: 'Department', minWidth: 50 },
    { id: 'subject', label: 'Subject', minWidth: 200 },
    {id: 'status', label: 'Status', minWidth: 50, align: 'right'},
    {id: 'last_update', label: 'Last Update', minWidth: 50, align: 'right'},
];
const TicketsList = (props) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {

    }, [])
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return(
        <Fragment>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 500 }}>
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
                            <TicketsRow ticketsList={props.rows} columns={columns} page={page} rowPerPage={rowsPerPage}/>
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 50, 100]}
                    component="Card"
                    count={props.rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <Snackbar open={open} autoHideDuration={4000} onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity={severity} sx={{ width: 400 }}>
                    {verificationMessage}
                </Alert>
            </Snackbar>
        </Fragment>
    )
}
export default TicketsList