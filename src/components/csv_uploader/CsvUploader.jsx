import React, { useCallback, useState, useMemo } from "react";
import { useDropzone } from "react-dropzone";
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
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>ลากไฟล์ CSV มาวางที่นี่ หรือคลิกเพื่อเลือกไฟล์</p>
      </div>
      <button onClick={onSubmit}>กดสิ รอไร</button>
    </div>
  );
}
