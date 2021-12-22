export const getUtcDate = () => {
    return toUtcDate(new Date());
}

export const toUtcDate = (date: Date) => {
    return new Date(date.toUTCString().slice(0, -4));
}

export const reviveDateTime = (key: any, value: any): any => {
    if (typeof value === 'string') {
        let temp = /\d{4}-\d{2}-\d{2}(.*)/.exec(value);
        if (temp) {
            const date = new Date(value);
            if (isValidDate(date))
                return date;
        }
    }

    return value;
}

export const isValidDate = (d: Date) => {
    return d.toString() !== 'Invalid Date';
}