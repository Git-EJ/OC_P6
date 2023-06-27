const File = {
    extractPath : (url) => url.split(".").slice(0, -1).join('.')
}

export default File