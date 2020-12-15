import XLSX from "xlsx";

export const parseWorkbook = (binaryString, type) => {
  const wb = XLSX.read(binaryString, { type });

  // Get the first worksheet
  const wsname = wb.SheetNames[0];
  const ws = wb.Sheets[wsname];

  // Convert to JSON and map to valid property name
  const data = XLSX.utils.sheet_to_json(ws).map((record) => {
    return {
      to_postal_code: record["Sendt til postnummer"],
      from_postal_code: record["Sendt fra postnummer"],
      send_date: new Date().toISOString().slice(0, 10), // usikker på denne...
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
  const now = new Date().toISOString().slice(0, 10);
  fileName = `${fileName.substr(0, i)}-ESTIMAT-${now}.xlsx`;

  XLSX.writeFile(newWB, fileName);
};
