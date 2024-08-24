const escapeTags = (string) => {
    if (!string || string.length === 0) return '';

    // Might delete something valuable
    return string.replace(/(<([^>]+)>)/ig, "");
}

export default escapeTags;