import { from_postal_code, to_postal_code, send_date } from "./headersInput";
import { arrival, window, confidence } from "./headersOutput";

/**
 * Extracts the mandatory columns from the provided data
 */
export const toInput = (data) => {
  return data.map((row) => {
    return {
      from_postal_code: row[from_postal_code],
      to_postal_code: row[to_postal_code],
      send_date
    };
  });
};

/**
 * Inserts the new data (estimation data) into the existing data
 */
export const toOutput = (oldData, newData) => {
  let output = [];
  const dateSent = new Date(send_date);

  for (let i = 0; i < oldData.length; i++) {
    const e = newData[i];
    const days = daysBetween(dateSent, new Date(e.date));

    output.push({
      ...oldData[i],
      [arrival]: days,
      [window]: `${e.start}-${e.end}`,
      [confidence]: e.confidence,
    });
  }

  return output;
};

const daysBetween = (first, second) => {

  const ONE_DAY = 1_000 * 60 * 60 * 24;

  return Math.round(Math.abs((first - second) / ONE_DAY));
}
