// 将css为属性，转化为html-css结构
// [ { name: '\\css\\1.css',
// attribute: [ [Object], [Object], [Object], [Object] ],
// influ: [ '\\html\\index1.html' ] },
// { name: '\\css\\3.css',
// attribute: [ [Object] ],
// influ: [ '\\html\\index2.html' ] } ]
const filterattr = require('./filterattr');
/**
 * 
 * 
 * @param {String} root 执行目录
 * @param {Array} influence 加上影响文件的数组
 * @returns 
 */
function dephtmltocss(root, influence) {
    const htmlToCss = {};
    influence.forEach((item, index) => {
        // 只对有影响的css做处理
        const name = item.name;
        let attr = item.attribute;
        if(item.hasOwnProperty('influ')) {
            item.influ.map((l, k) => {
                // 判断是否存在对应的html/js
                if(!htmlToCss[l]) {
                    htmlToCss[l] = [];
                }
                // 加入模版过滤
                attr = filterattr(attr, l, root);
                // 如果过滤后attr
                if(attr.length > 0) {
                    htmlToCss[l].push({
                        name,
                        attr
                    })
                }
            })
        }
    })
    return htmlToCss;
}




module.exports = dephtmltocss;