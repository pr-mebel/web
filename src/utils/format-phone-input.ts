const removeLetters = (value: string) => {
    return value.replace(/\D/g, '');
};

export const formatPhoneInput = (rawValue: string) => {
    let value = removeLetters(rawValue);
    let result = '';

    if (!value) {
        return '';
    }

    if (['7', '8', '9'].includes(value[0])) {
        if (value[0] == '9') {
            value = `7${value}`;
        }

        const firstSymbols = value[0] == '8' ? '8' : '+7';

        result = `${firstSymbols} `;

        if (value.length > 1) {
            result = `${result}(${value.substring(1, 4)}`;
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
    }

    return value.substring(0, 16);
};
