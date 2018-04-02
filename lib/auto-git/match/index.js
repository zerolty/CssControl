// const str = " .content {     &.style {         width: 100px;-        height: 100px;     }     .content {         width: 100px;     }+    .dd {+        width: 100%;+    } }  .cc {     width: 100px; }";
const {BEFORE_REG} = require('../regex');
const beautify = require('js-beautify').css;

/**
 * @desc 将css解析成AST模版
 * @param {String} str 
 * @returns {Object}
 */
function match(str) {
    const beautifyStr = beautify(str, { indent_size: 2, space_in_empty_paren: true });
    const arr = beautifyStr.split('\n');
    const root = {};
    const matchTree = {};
    let index = 0;
    let cacheClass = [];
    let curObj = null;
    arr.map((item) => {
    	// debugger;
        const isClass = BEFORE_REG.exec(item.trim());
        // 如果找到{ 并且提取出类名, 创建一层结构
        if(isClass) {
            let className = isClass[1];
            let isChange = null;
            // 找出当前类是否git-+变化
            if(className[0] === '-' || className[0] === '+') {
                isChange = className[0];
                className = className.replace('-', '').replace('+', '');
            }
            // 如果为根节点，在根节建立
            if(index === 0) {
                root[className] = {
                    attr: [],
                    child: {},
                    isChange: isChange || ''
                }
                curObj = root[className];
            } else {
                // 否则在跟踪变量curObj建立
                curObj['child'][className] = {
                    attr: [],
                    child: {},
                    isChange: isChange || ''
                }
                curObj = curObj['child'][className];
                
            }
            cacheClass.push(className);
            index ++;
        } else {
            // 如果不用建立层级，在attr中加入变化属性
            const line = item.trim();
            if(line[0] === '-' || line[0] === '+') {
                curObj.attr.push(line);
            }
        }
        // 判断当前的索引是否要根级索引
        if(item.indexOf('}') > -1){
            index --;
            let i = 1;
            curObj = root[cacheClass[0]];
            // 循环来定位需要网上以及的位置
            while(i < index) {
                curObj = curObj['child'][cacheClass[i]];
                i++;
            }
            // 删除当前位置的缓存对象
            cacheClass.splice(index + 1,1);
        } 
    });
    return root;
}


// match();
module.exports = match
