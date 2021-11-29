const removeLetters = (value: string) => {
    return value.replace(/\D/g, '');
};

export const formatPhoneInput = (rawValue: string) => {
    let value = removeLetters(rawValue);
    let result = '';

    if (!value) {
        return '';
    }

    if (value[0] !== '8') {
        value = `8${value}`;
    }

    result = `8`;

    if (value.length > 1) {
        result = `${result} (${value.substring(1, 4)}`;
    }

    if (value.length > 4) {
        result = `${result}) ${value.substring(4, 7)}`;
    }

    if (value.length > 7) {
        result = `${result}-${value.substring(7, 9)}`;
    }

    if (value.length > 9) {
        result = `${result}-${value.substring(9, 11)}`;
    }

    return result;
};
