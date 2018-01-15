function traverse(realtionTree, diffData) {
    diffData = diffData || [];
    psDiffCss(realtionTree, diffData);
}
/**
 * 
 * 
 * @param {Object} realtionTree 文件关系树
 * @param {Array} diffData commit不同文件
 */
function psDiffCss(realtionTree, diffData) {
    diffData.forEach((item, index) => {
        const hasList = hasThisFile(item.name);
        if(hasList.length > 0) {
            // 如果存在影响对应的文件
        }
    })
}

function psDiffAttr() {

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