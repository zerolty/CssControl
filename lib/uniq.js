/**
 * 
 * 
 * @param {Array} array  
 * @returns {Array} 
 * 去除同一文件可能多次引入同一文件的不同函数
 */
function unique(array) {
    var obj = {};
    return array.filter((item, index) => obj.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : (obj[typeof item + JSON.stringify(item)] = true))
}

module.exports = unique;