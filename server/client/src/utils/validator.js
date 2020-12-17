import { from_postal_code, to_postal_code, send_date } from './headersInput';

export const validateTypes = (data) => {
    const errors = [];

    data.forEach((item) => {
        const err = {
            row: (2 + data.indexOf(item)),
            fields: []
        };

        if (!isString(typeof item[from_postal_code])) {
            console.log(item[from_postal_code]);
            err.fields.push(from_postal_code);
        }
        if (!isString(item[to_postal_code])) {
            err.fields.push(to_postal_code);
        }
        if (!(item[send_date] instanceof Date)) {
            err.fields.push(send_date);
        }

        if (err.fields.length !== 0) {
            errors.push(err);
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
    return typeof(value) === 'string' || value instanceof String;
}