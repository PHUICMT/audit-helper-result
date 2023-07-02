import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(id, a, b, c, d) {
  return { id, a, b, c, d };
}

export default function BasicTable(props) {
  const csvJson = props.csvJson;
  const header = ["ID", "A", "B", "C", "D"];
  const rows = csvJson.map((row) =>
    createData(row.id, row.a, row.b, row.c, row.d)
  );
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {header.map((head) => (
              <TableCell>{head}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right"> {row.a} </TableCell>
              <TableCell align="right"> {row.b} </TableCell>
              <TableCell align="right"> {row.c} </TableCell>
              <TableCell align="right"> {row.d} </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
