const readFile = require('./getFileName');
const getdep = require('./Filedepend');
const formatData = require('./formatData');
const connatData = require('./connatData');
const uniq = require('./uniq');

function cssControl(root, type) {
    // 遍历完的目录
    const res = readFile(root);
    // 遍历依赖关系
    const resDep = getdep(res, type);
    // 处理依赖的重复操作
    const arr = uniq(resDep);
    // 将依赖关系去掉目录    
    const links = formatData(arr, res, root);
    // 讲依赖树形输出    
    const realtionTree = connatData(links);
    
    console.log(realtionTree);
}

module.exports =  cssControl;
