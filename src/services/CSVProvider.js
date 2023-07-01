import { read, utils } from "xlsx";

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
    const binaryStr = reader.result;
    const wb = read(binaryStr, {
      type: rABS ? "binary" : "array",
      bookVBA: true,
    });
    const wsname = wb.SheetNames[0];
    const ws = wb.Sheets[wsname];
    const data = utils.sheet_to_json(ws, { raw: false, defval: "" });

    callback(data)
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
  for await (let i of json_data) {
    indexed_data.push({ index: index, ...i })
    index++
  }
  callback(indexed_data)
}

export async function JsonToCSV(json_data, callback) {
  let csv_data_with_header = ""
  let csv_data = ""
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
  callback(csv_data_with_header + csv_data)
}