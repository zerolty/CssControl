const fs = require('fs'),
      path = require('path'),
      {IGNORE_DEP:ignore_dep} = require('./const');
const reqReg = /require\(['|"](.*?)['|"]\)/g,
      impReg = /import\s.*?['|"](.*?)['|"]/g,
      linkReg = /<link\s.*href=['|"](.*?)['|"].*>/g;
const resDepend = [];

/**
 * 
 * 
 * @param {String} res 
 * @returns {Array}
 * 递归处理得到的所有文件，处理每一个文件的依赖关系
 */
function getDepend(res, type) {
    if(type === 'html') {
        DependOfHtml(res);
    } else {
        DependOfSingle(res);
    }
    return resDepend;
}

function DependOfSingle(res) {
    res.pathname.forEach((item, index) => {
        const extname = path.extname(item);
        // 如果是静态不需要遍历的关系文件就不进行遍历
        if(ignore_dep.indexOf(extname) === -1) {
            const data = fs.readFileSync(item, 'utf-8');
            let results = [];
            while((results = reqReg.exec(data)) !== null) {
                const link = {
                    source: res.pathname[index],
                    target: results[1]
                };
                resDepend.push(link);
            }
            while((results = impReg.exec(data)) !== null) {
                const link = {
                    source: res.pathname[index],
                    target: results[1]
                };
                resDepend.push(link);
            }
        }
    });
}

function DependOfHtml(res) {
    res.pathname.forEach((item, index) => {
        const extname = path.extname(item);
        // 如果是静态不需要遍历的关系文件就不进行遍历
        if(ignore_dep.indexOf(extname) === -1) {
            const data = fs.readFileSync(item, 'utf-8');
            let results = [];
            while((results = linkReg.exec(data)) !== null) {
                const link = {
                    source: res.pathname[index],
                    target: results[1]
                };
                resDepend.push(link);
            }
        }
    });
}

module.exports = getDepend;