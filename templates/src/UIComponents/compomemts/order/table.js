import {Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import QRCustom from "../../QRCustom";
import React from "react";
import tableCellClasses from "@material-ui/core/TableCell"


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
    "font-family": "Montserrat"
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    height:"fit-content",
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



const rows = [
    // createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
];

export default function CustomizedTables(props) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Product ID</StyledTableCell>
                        <StyledTableCell align="right">Product Name</StyledTableCell>
                        <StyledTableCell align="right">Size</StyledTableCell>
                        <StyledTableCell align="right">qr</StyledTableCell>
                        <StyledTableCell align="right">Price</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                {row.Product_ID}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.Name}</StyledTableCell>
                            <StyledTableCell align="right">{row.Size}</StyledTableCell>
                            <StyledTableCell align="right">
                                <QRCustom qroptions={JSON.parse(row.qr)}  width={90} height={90} Oup_url={`${window.location.protocol}//${window.location.host}/oupu/${row.Product_ID}`}/>
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.Price}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
