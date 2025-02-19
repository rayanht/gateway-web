export const toHex = (stringToConvert) => {
    return stringToConvert
        .toString()
        .split('')
        .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('')
}

export const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}