import XLSX from "xlsx";
import { validateHeaders, validateData } from './validator';
import { parseFromISO } from './dateParser';
const send_date = "2020-11-02";

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

      const shippings = getShippingInfo(ws);

      const content = XLSX.utils.sheet_to_json(ws, { defval: "" });

      // Returns as error TODO: MÅ FIKSE VALIDERING
      /* const dataErrors = validateData(shippings);
      if (dataErrors.length !== 0) {
        reject({
          type: "data",
          data: dataErrors
        });
      } */

      // Returns successfully
      resolve({
        content,
        shippings
      });
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

const getShippingInfo = (sheet) => {
  const shippings = [];
  const range = XLSX.utils.decode_range(sheet['!ref']);

  let rowNum;
  for (rowNum = range.s.r + 1; rowNum <= range.e.r; rowNum++) {
    const from_cell = sheet[XLSX.utils.encode_cell({r: rowNum, c: 0})];
    const to_cell = sheet[XLSX.utils.encode_cell({r: rowNum, c: 1 })];

    shippings.push({
      from_postal_code: XLSX.utils.format_cell(from_cell),
      to_postal_code: XLSX.utils.format_cell(to_cell),
      send_date
    });
  }

  return shippings;
}

/**
 * Creates a new recognizable name
 */
const getFileName = (fileName) => {
  const i = fileName.lastIndexOf(".");
  const now = parseFromISO(new Date());
  return `${fileName.substr(0, i)}-ESTIMAT-${now}.xlsx`;
};
