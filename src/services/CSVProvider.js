import { read, utils } from "xlsx";
import axios from "axios";
import Papa from "papaparse";

export function CSVReader(handleFile, callback) {
  const reader = new FileReader();
  const rABS = !!reader.readAsBinaryString;
  reader.onabort = () => {
    callback("Aborted")
  }
  reader.onerror = () => {
    callback("Error")
  }
  reader.onload = () => {
    try {
      const binaryStr = reader.result;
      const wb = read(binaryStr, {
        type: rABS ? "binary" : "array",
        bookVBA: true,
      });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = utils.sheet_to_json(ws, { raw: false, defval: "" });
      callback(data)
    } catch (_) {
      callback("Error")
    }
  };

  try {
    if (rABS) {
      reader.readAsBinaryString(handleFile);
    } else {
      reader.readAsArrayBuffer(handleFile);
    }
  } catch (_) {
    callback("Error")
  }
}

export async function CSVIndexed(json_data, callback) {
  let indexed_data = []
  let index = 0
  try {
    for await (let i of json_data) {
      indexed_data.push({ index: index, ...i })
      index++
    }
  } catch (_) {
    callback("Error")
  }
  callback(indexed_data)
}

export async function JsonToCSV(json_data, callback) {
  let csv_data_with_header = ""
  let csv_data = ""
  try {
    let header = Object.keys(json_data[0])
    for await (let i of header) {
      csv_data_with_header += i + ","
    }
    csv_data_with_header += "\n"
    for await (let i of json_data) {
      for await (let j of header) {
        csv_data += i[j] + ","
      }
      csv_data += "\n"
    }
  } catch (_) {
    callback("Error")
  }
  callback(csv_data_with_header + csv_data)
}

export async function CSVToApi(csv_data, callback) {
  const apiUrl = "http://localhost:5000/upload";
  const blob = new Blob([csv_data], { type: 'text/csv' });
  const csv_file = new File([blob], 'data.csv', { type: 'text/csv' });

  try {
    const formData = new FormData();
    formData.append('file', csv_file);
    await axios.post(apiUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      callback(res.data)
    }).catch(_ => {
      callback("Error")
    })
  } catch (error) {
    callback("Error")
  }
}

export function CSVStringToJson(csv_string, callback) {
  try {
    const json_data = Papa.parse(csv_string, { header: true, skipEmptyLines: true })
    console.log(json_data.data)
    callback(json_data.data)
  } catch (_) {
    callback("Error")
  }
}
