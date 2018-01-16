const depHTmlToCss = require('./depHTmlToCss');
/**
 * 
 * 
 * @param {String} root 运行环境目录
 * @param {Object} realtionTree 文件关系树
 * @param {Array} diffData commit不同文件
 */
function traverse(root, realtionTree, diffData) {
    diffData = diffData || [];
    const influence = influenceFile(realtionTree, diffData);
    const dephtml2css = depHTmlToCss(root, influence);
    // 此时dephtml2css结构
    // {
    //    "./src/1.js": [{'./src/1.css':[...]}] 
    // }
    return dephtml2css;
}

/**
 * 
 * 
 * @param {Object} realtionTree 文件关系树
 * @param {Array} diffData commit不同文件
 */
function influenceFile(realtionTree, diffData) {
    return diffData.map((item, index) => {
        const hasList = hasThisFile(realtionTree, item.name);
        if(hasList.length > 0) {
            // 如果存在影响对应的文件
            item["influ"] = hasList;
            return item;
        }
        return item; 
    });
    // return diffData.reduce((pre, cur, index, array) => {
    //     const hasList = hasThisFile(cur.name);
    //     if(hasList.length > 0) {
    //         // 如果存在影响对应的文件
    //         pre[cur.name] = hasList;
    //         return pre;
    //     }
    //     return pre;
    // }, {});
}

/**
 * 
 * 
 * @param {Object} realtionTree 被查询对象
 * @param {String} item 需要查询的url
 * @returns {Array} 返回查询结果集合
 */
function hasThisFile(realtionTree, item) {
    const hasList = [];
    for(let i in realtionTree) {
        if(realtionTree[i].indexOf(item) > -1) {
            hasList.push(i);
        }
    }
    return hasList;
}

module.exports = traverse;

