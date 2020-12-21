import { from_postal_code, to_postal_code } from './headersInput';

/**
 * Iterates every value (cell) and checks if columns contain invalid data
 */
export const validateData = (data) => {
    const errors = [];
    let from_containsInvalidData = false;
    let to_containsInvalidData = false;

    data.forEach((item) => {

        if (!isString(item[from_postal_code])) {
            from_containsInvalidData = true;
        }
        if (!isString(item[to_postal_code])) {
            to_containsInvalidData = true;
        }
    });

    if (from_containsInvalidData) errors.push(from_postal_code);
    if (to_containsInvalidData) errors.push(to_postal_code);

    return errors;
}

/**
 * Checks if the necessary headers are present in the given headers
 */
export const validateHeaders = (headers) => {
    const errors = [];

    if (!headers.includes(from_postal_code)) {
        errors.push(from_postal_code);
    }
    if (!headers.includes(to_postal_code)) {
        errors.push(to_postal_code);
    }

    return errors;
}

const isString = (value) => {
    return typeof(value) === 'string';
}