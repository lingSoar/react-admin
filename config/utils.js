const path = require('path')

const resolve = pathname => {
    return path.resolve(__dirname, '../', pathname)
}

module.exports = {
    resolve
}