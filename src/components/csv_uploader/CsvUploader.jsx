import React, { useCallback, useState, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { CircleSpinnerOverlay } from "react-spinner-overlay";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  CSVReader,
  CSVIndexed,
  JsonToCSV,
  CSVToApi,
} from "../../services/CSVProvider";
import {
  ErrorDialogPopup,
  ErrorFormatPopup,
} from "../dialog_popup/ErrorDialogPopup";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  paddingBlock: "100px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#E4FFFB",
  color: "#11B599",
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
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [fileNames, setFileNames] = useState(null);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      setFileNames(file.name);
      setOpen(true);
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
    setLoading(true);
    CSVIndexed(data, (json_csv_indexed) => {
      if (json_csv_indexed === "WrongCSV") {
        setIsError(true);
        setLoading(false);
        ErrorFormatPopup();
        return null;
      } else if (json_csv_indexed === "Error") {
        setIsError(true);
        setLoading(false);
        ErrorDialogPopup();
        return null;
      } else {
        JsonToCSV(json_csv_indexed, (string_csv) => {
          if (string_csv === "Error") {
            setIsError(true);
            setLoading(false);
            ErrorDialogPopup();
            return null;
          }
          CSVToApi(string_csv, (response) => {
            if (response === "Error") {
              setIsError(true);
              setLoading(false);
              ErrorDialogPopup();
              return null;
            }
            navigate("/audit-helper", { state: { data: response } });
            setLoading(false);
            return null;
          });
        });
      }
    });
  };

  const onRemoveCsv = () => {
    setOpen(false);
    setData([]);
    setFileNames(null);
  };

  return (
    <React.Fragment>
      <CircleSpinnerOverlay
        size={200}
        loading={loading}
        overlayColor="rgba(0,153,255,0.2)"
      />

      <div style={{ paddingInline: 100 }}>
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <p>ลากไฟล์ CSV มาวางที่นี่ หรือคลิกเพื่อเลือกไฟล์</p>
        </div>
        <Collapse in={open}>
          <Alert
            action={
              <IconButton
                color="error"
                onClick={onRemoveCsv}
                aria-label="delete"
                size="small"
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            อัปโหลดไฟล์ <b>{fileNames}</b> เรียบร้อยแล้ว
          </Alert>
        </Collapse>
        <Button
          disabled={data.length === 0}
          sx={{ marginTop: 2, fontWeight: "bold", fontSize: "1.2rem" }}
          onClick={onSubmit}
          variant="contained"
          color="success"
          endIcon={<SendIcon />}
        >
          เริ่มตรวจสอบ
        </Button>
      </div>
    </React.Fragment>
  );
}
