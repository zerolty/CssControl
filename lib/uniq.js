function unique(array) {
    var obj = {};
    return array.filter((item, index) => obj.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : (obj[typeof item + JSON.stringify(item)] = true))
}

module.exports = unique;