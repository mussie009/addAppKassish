import { from_postal_code, to_postal_code, send_date } from './headersInput';

export const validateData = (data) => {
    const errors = [];

    data.forEach((item) => {
        const row = (2 + data.indexOf(item));

        if (!isString(item[from_postal_code])) {
            errors.push(stringError(row, from_postal_code, item[from_postal_code]));
        }
        if (!isString(item[to_postal_code])) {
            errors.push(stringError(row, to_postal_code, item[to_postal_code]));
        }
        if (!(item[send_date] instanceof Date)) {
            errors.push(dateError(row, send_date, item[send_date]));
        }
    });

    return errors;
}

export const validateHeaders = (headers) => {
    const errors = [];

    if (!headers.includes(from_postal_code)) {
        errors.push(from_postal_code);
    }
    if (!headers.includes(to_postal_code)) {
        errors.push(to_postal_code);
    }
    if (!headers.includes(send_date)) {
        errors.push(send_date);
    }

    return errors;
}

const isString = (value) => {
    return typeof(value) === 'string';
}

const stringError = (row, column, value) => {
    return {
        row,
        column,
        message: `${value} er ikke en gyldig tekststreng`
    }
}

const dateError = (row, column, value) => {
    return {
        row,
        column,
        message: `${value} er ikke en gyldig dato`
    }
}