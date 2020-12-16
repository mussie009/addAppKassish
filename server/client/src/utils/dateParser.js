/**
 * Parses from DD-MM-YYYY to YYYY-MM-DD
 */
export const parseToISO = (date) => {
  return (
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  );
};

/**
 * Parses from YYYY-MM-DD to DD-MM-YYYY
 */
export const parseFromISO = (date) => {
  return (
    date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
  );
};
