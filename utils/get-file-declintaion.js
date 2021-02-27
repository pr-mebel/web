export const getFileDeclination = (num) => {
    const variants = ['файл', 'файла', 'файлов'];
    const remainder = num % 100;
    const remainderOfTen = remainder % 10;

    if (remainder > 4 && remainder < 20) {
        return variants[2];
    }
    if (remainderOfTen === 0) {
        return variants[2];
    }
    if (remainderOfTen === 1) {
        return variants[0];
    }
    if (remainderOfTen < 5) {
        return variants[1];
    }
    return variants[2];
};
