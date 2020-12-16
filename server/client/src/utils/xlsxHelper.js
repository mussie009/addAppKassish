import XLSX from "xlsx";
import { parseFromISO } from './dateParser';

/**
 * Reads and parses the provided file
 * TODO: Validation and error handling
 */
export const readAndParse = (file) => {
  const data = [];

  const reader = new FileReader();
  const rABS = !!reader.readAsBinaryString;

  reader.onload = (e) => {
    // Parse data
    const bstr = e.target.result;

    const wb = XLSX.read(bstr, {
      type: rABS ? "binary" : "array",
      cellDates: true,
    });

    // Get the first worksheet
    const wsname = wb.SheetNames[0];
    const ws = wb.Sheets[wsname];

    XLSX.utils.sheet_to_json(ws, { defval: "" }).forEach((row) => {
        data.push(row);
    });
  };

  if (rABS) {
    reader.readAsBinaryString(file);
  } else {
    reader.readAsArrayBuffer(file);
  }

  return data;
};

/**
 * Writes the old and new data to a new xlsx-file
 */
export const writeAndDownload = (data, fileName) => {
    const newBook = XLSX.utils.book_new();
    const newSheet = XLSX.utils.json_to_sheet(data, { cellDates: true, dateNF: "dd.MM.yyyy" });

    XLSX.utils.book_append_sheet(newBook, newSheet, "Estimater");

    // Writing the file will cause an automatic download
    XLSX.writeFile(newBook, getFileName(fileName));
}

/**
 * Creates a new recognizable name
 */
const getFileName = (fileName) => {
  const i = fileName.lastIndexOf(".");
  const now = parseFromISO(new Date());
  return `${fileName.substr(0, i)}-ESTIMAT-${now}.xlsx`;
};
