import XLSX from "xlsx";
import { from_postal_code, to_postal_code, send_date } from "./headersIn";
import { from, to, sent, arrival, window, confidence } from "./headersOut";

/**
 * Reads the workbook and parses to objects for the Posten API
 */
export const parseWorkbook = (binaryString, type) => {
  const wb = XLSX.read(binaryString, { type, cellDates: true });

  // Get the first worksheet
  const wsname = wb.SheetNames[0];
  const ws = wb.Sheets[wsname];

  // Convert to JSON and map to valid property name
  const data = XLSX.utils.sheet_to_json(ws).map((record) => {
    // Format date to YYYY-MM-DD
    const dateISO = parseToISO(record[send_date]);

    return {
      from_postal_code: record[from_postal_code],
      to_postal_code: record[to_postal_code],
      send_date: dateISO,
    };
  });

  return data;
};

/**
 * Creates a new workbook (xlsx-file) with new data
 */
export const generateWorkbook = (data, fileName) => {
  const newBook = XLSX.utils.book_new();

  // Customize column header names and order
  const formatted = data.map((rec) => {
    return {
      [from]: rec.from_postal_code,
      [to]: rec.to_postal_code,
      [sent]: parseFromISO(new Date(rec.send_date)),
      [arrival]: parseFromISO(new Date(rec.date)),
      [window]: `${rec.start}-${rec.end}`,
      [confidence]: rec.confidence,
    };
  });

  const newSheet = XLSX.utils.json_to_sheet(formatted);
  XLSX.utils.book_append_sheet(newBook, newSheet, "Estimater");

  // Writing the file will cause an automatic download
  XLSX.writeFile(newBook, getFileName(fileName));
};

/**
 * Parses from DD-MM-YYYY to YYYY-MM-DD
 */ 
const parseToISO = (date) => {
  return (
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  );
};

/**
 * Parses from YYYY-MM-DD to DD-MM-YYYY
 */
const parseFromISO = (date) => {
  return (
    date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
  );
};

/**
 * Creates a new recognizable name
 */
const getFileName = (fileName) => {
  const i = fileName.lastIndexOf(".");
  const now = parseFromISO(new Date());
  return `${fileName.substr(0, i)}-ESTIMAT-${now}.xlsx`;
};
