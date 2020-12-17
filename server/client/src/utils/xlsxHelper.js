import XLSX from "xlsx";
import { validateHeaders, validateData } from './validator';
import { parseFromISO } from './dateParser';

/**
 * Reads and parses the provided file
 */
export const readAndParse =  (file) => {

  // Using promise because headers and data array is not populating synchronizable
  return new Promise((resolve, reject) => {
  
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
  
      const headers = getHeaders(ws);

      // Returns as error
      const headerErrors = validateHeaders(headers);
      if (headerErrors.length !== 0) {
        reject({
          type: "headers",
          data: headerErrors
        });
      }
  
      const data = XLSX.utils.sheet_to_json(ws, { defval: "" });

      // Returns as error
      const dataErrors = validateData(data);
      if (dataErrors.length !== 0) {
        reject({
          type: "data",
          data: dataErrors
        });
      }

      // Returns successfully
      resolve(data);
    };
  
    if (rABS) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  });
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
 * Extracts only the headers from the file
 * (to be used for checking if necessary columns are present)
 */
const getHeaders = (sheet) => {
  const headers = [];
  const range = XLSX.utils.decode_range(sheet['!ref']);
  let C, R = range.s.r;

  for (C = range.s.c; C <= range.e.c; ++C) {
    const cell = sheet[XLSX.utils.encode_cell({c: C, r: R})];

    if (cell && cell.t) {
      headers.push(XLSX.utils.format_cell(cell));
    }
  }
  
  return headers;
}

/**
 * Creates a new recognizable name
 */
const getFileName = (fileName) => {
  const i = fileName.lastIndexOf(".");
  const now = parseFromISO(new Date());
  return `${fileName.substr(0, i)}-ESTIMAT-${now}.xlsx`;
};
