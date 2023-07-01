import React, { useCallback, useState, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { CSVReader, CSVIndexed, JsonToCSV } from "../../services/CSVProvider";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

export default function CsvUploader() {
  const [data, setData] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      CSVReader(file, (data_) => {
        setData(data_);
      });
    });
  }, []);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      maxFiles: 1,
    });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const onSubmit = () => {
    CSVIndexed(data, (data_) => {
      JsonToCSV(data_, (data__) => {
        console.log(data__);
      });
    });
  };

  return (
    <React.Fragment>
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: 5,
        }}
      >
        <Typography variant="h5" color="inherit" align="left" paddingBottom={2}>
          Audit Choice 2 Check 3 by AI
        </Typography>
        <Typography variant="h7" color="inherit" align="left">
          File ที่นำเข้าเพื่อให้ AI ช่วยตรวจสอบตวมถูกต้องของสาเหตุการตาย
        </Typography>
      </Toolbar>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>ลากไฟล์ CSV มาวางที่นี่ หรือคลิกเพื่อเลือกไฟล์</p>
      </div>
      <button onClick={onSubmit}>กดสิ รอไร</button>
    </React.Fragment>
  );
}
