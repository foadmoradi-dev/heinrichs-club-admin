import {Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";
import {Fragment} from "react";
import {useNavigate} from "react-router";

const TableTemplate = (props) => {
    const navigate = useNavigate()
    const handleClick = (event, id, row) => {
        switch (props.type){
            case "guarantee":
                break;
            case "ticket":
                navigate("/dashboard/tickets/" + id,{
                    state :{
                        ...row
                    }
                })
                break;
            case "order":
                navigate("/dashboard/order/" + id,{
                    state :{
                        ...row
                    }
                })
                break;
            default:
                break;
        }

    };
    const {columns, rowsPerPage,  rows, page, emptyRows, allRowCount, handleChangePage, handleChangeRowsPerPage, TablePaginationActions} = props
    return(
        <Fragment>
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
                        {(rowsPerPage > 0
                                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : rows
                        ).map((row) => (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id} onClick={(event) => handleClick(event, row.id, row)}>
                                {columns.map((column) => {

                                    const value = row[column.id];
                                    return (
                                        <TableCell key={column.id} align={column.align}>
                                            { column.id==="start_at" ?
                                                (540 -  Math.ceil( ((new Date()).getTime() - (new Date(row.start_at)).getTime()) / (1000 * 3600 * 24))) :
                                                column.format && typeof parseInt(value) === 'number' ?
                                                    new Intl.NumberFormat('de-DE').format(value) :
                                                    value}
                                        </TableCell>
                                    );
                                })}
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
    )
}
export default TableTemplate