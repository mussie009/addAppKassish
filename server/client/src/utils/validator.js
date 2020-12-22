export const isValidPostalCode = (value) => {
    if (typeof(value) === 'string' && value.length === 4) return true;
    else return false;
}