import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(index, a, b, c, d) {
  return { index, a, b, c, d };
}

export default function DetailTable(props) {
  const csvJson = props.csvJson;
  const header = ["ID", "A", "B", "C", "D"];
  const rows = csvJson.map((row) =>
    createData(row.index, row.a, row.b, row.c, row.d)
  );
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {header.map((head) => (
              <TableCell key={head}>{head}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.index}
              </TableCell>
              <TableCell align="left"> {row.a} </TableCell>
              <TableCell align="left"> {row.b} </TableCell>
              <TableCell align="left"> {row.c} </TableCell>
              <TableCell align="left"> {row.d} </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
