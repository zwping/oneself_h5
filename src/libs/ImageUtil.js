function isImg(file) {
    let names = fileName(file).split('.')
    if (names.length > 1) {
        switch (names[1].toLowerCase()) {
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
                return true
            default:
                return false
        }
    }
    return false
}

function fileName(file) {
    return String(file.name)
}

export {
    isImg
}
