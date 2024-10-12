const escapeString = (str) => {
    if (!str || str.length === 0) return '';

    return str.replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/'/g, "\\'")
        .replace(/`/g, '\\`')
        .replace(/\$/g, '\\$')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r');
};

export default escapeString;