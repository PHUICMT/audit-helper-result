import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import { green, yellow, red, grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";
import { ExportToCsv } from "export-to-csv";

function createData(label, point, total_point, is_y = false) {
  const calculatePercentage = (value, total) => {
    return (value / total) * 100;
  };

  const calculateColor = (value, total) => {
    if (is_y) {
      return green;
    }
    const percentage = calculatePercentage(value, total);
    if (percentage > 40) {
      return red;
    } else if (percentage > 0) {
      return yellow;
    }
  };

  const color = calculateColor(point, total_point);
  return { label, color, point };
}

function BadgePoint(props) {
  const { point, color } = props;
  return (
    <Avatar sx={{ color: color[900], bgcolor: color[200] }}>{point}</Avatar>
  );
}

export default function InfoTable(props) {
  const allpoint = props.allpoint;
  const csvJson = props.csvJson;

  const rows = [
    createData("Y : ข้อมูลไม่มีความผิดปกติ", allpoint.y, allpoint.total, true),
    createData(
      "N1 : พบข้อมูลที่เป็น Unknown ทั้งหมด",
      allpoint.n1,
      allpoint.total
    ),
    createData("N2 : พบข้อมูลที่มีภาษาไทยปนอยู่", allpoint.n2, allpoint.total),
    createData("N3 : พบ MODE OF DEATH", allpoint.n3, allpoint.total),
    createData("N4 : พบการบาดเจ็บที่ไม่บอกสาเหตุ", allpoint.n4, allpoint.total),
    createData(
      "N5 :พบปลายเหตุที่ควรมีสาเหตุต่อไปอีก",
      allpoint.n5,
      allpoint.total
    ),
    createData(
      "N6 : พบการเรียงลำดับที่ไม่สอดคล้องกัน",
      allpoint.n6,
      allpoint.total
    ),
  ];

  const onDownload = () => {
    const options = {
      filename: "audit_helper_result",
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalSeparator: ".",
      showLabels: true,
      showTitle: false,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(csvJson);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.label}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ fontSize: 18, color: grey[800] }}
                >
                  {row.label}
                </TableCell>
                <TableCell variant="body" align="right">
                  <BadgePoint point={row.point} color={row.color} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        onClick={onDownload}
        sx={{
          padding: 2,
          marginTop: 2,
          marginBottom: 4,
          float: "left",
          fontSize: 18,
          fontWeight: "bold",
        }}
        variant="contained"
        endIcon={<DownloadIcon />}
      >
        ดาวน์โหลดไฟล์ทั้งหมด
      </Button>
    </div>
  );
}
