import {Fragment} from "react";
import {TableCell, TableRow} from "@mui/material";
import {useNavigate} from "react-router";

const TicketsRow = (props) => {
    const navigate = useNavigate()
    const handleClick = (event, id) => {
        console.log(id)
        navigate("/agent-dashboard/tickets/" + id)
    };
    return (
        <Fragment>
            {props.ticketsList
                .slice(props.page * props.rowPerPage, props.page * props.rowPerPage + props.rowPerPage)
                .map((row) => {
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id} onClick={(event) => handleClick(event, row.id)}>
                            {props.columns.map((column) => {
                                const value = row[column.id];
                                return (
                                    <TableCell key={column.id} align={column.align}>
                                        {column.format && typeof parseInt(value) === 'number'
                                            ? new Intl.NumberFormat('de-DE').format(value)
                                            : value}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    );
                })}
        </Fragment>
    )
}
export default TicketsRow