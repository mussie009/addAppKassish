import XLSX from "xlsx";
import { from_postal_code, to_postal_code, send_date } from "./columns";

export const parseWorkbook = (binaryString, type) => {
  const wb = XLSX.read(binaryString, { type, cellDates: true });

  // Get the first worksheet
  const wsname = wb.SheetNames[0];
  const ws = wb.Sheets[wsname];

  // Convert to JSON and map to valid property name
  const data = XLSX.utils.sheet_to_json(ws).map((record) => {
    // Format date
    const isoDate = new Date(record[send_date]).toISOString().slice(0, 10); // blir én dag bak?

    return {
      from_postal_code: record[from_postal_code],
      to_postal_code: record[to_postal_code],
      send_date: isoDate, // usikker på denne...
      // Dimensions må også inn her, men eksisterer ikke i excel-arket
    };
  });

  return data;
};

export const generateWorkbook = (data, fileName) => {
  const newWB = XLSX.utils.book_new();
  const newWS = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(newWB, newWS, "Estimater");

  // Create filename
  const i = fileName.lastIndexOf(".");
  const now = new Date().toLocaleDateString("no-NO").replaceAll(".", "-");
  fileName = `${fileName.substr(0, i)}-ESTIMAT-${now}.xlsx`;

  XLSX.writeFile(newWB, fileName);
};
