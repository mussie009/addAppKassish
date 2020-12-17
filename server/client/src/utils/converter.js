import { from_postal_code, to_postal_code, send_date } from "./headersInput";
import { arrival, window, confidence } from "./headersOutput";
import { parseToISO } from "./dateParser";

/**
 * Extracts the mandatory columns from the provided data
 */
export const toInput = (data) => {
  return data.map((row) => {
    return {
      from_postal_code: row[from_postal_code],
      to_postal_code: row[to_postal_code],
      send_date: parseToISO(row[send_date]),
    };
  });
};

/**
 * Inserts the new data (estimation data) into the existing data
 */
export const toOutput = (oldData, newData) => {
  let output = [];

  for (let i = 0; i < oldData.length; i++) {
    const e = newData[i];
    const d = new Date(e.date);
    d.setHours(e.start);

    output.push({
      ...oldData[i],
      [arrival]: d,
      [window]: `${e.start}-${e.end}`,
      [confidence]: e.confidence,
    });
  }

  return output;
};
