const str = " .content {     &.style {         width: 100px;-        height: 100px;     }     .content {         width: 100px;     }+    .dd {+        width: 100%;+    } }  .cc {     width: 100px; }";
var beautify = require('js-beautify').css;

const beautifyStr = beautify(str, { indent_size: 2, space_in_empty_paren: true });

const arr = beautifyStr.split('\n');

const BEFORE_REG = /((\.|#)?.*)\s{/; 


console.log(arr);    

const root = {};

function match() {
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
            // 找出
            if(className[0] === '-' || className[0] === '+') {
                isChange = className[0];
                className = className.replace('-', '').replace('+', '');
            }
            if(index === 0) {
                root[className] = {
                    attr: [],
                    child: {},
                    isChange: isChange || ''
                }
                curObj = root[className];
            } else {
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
            const line = item.trim();
            if(line[0] === '-' || line[0] === '+') {
                curObj.attr.push(line.replace('-', '').replace('+', ''));
            }
        }
        if(item.indexOf('}') > -1){
            index --;
            let i = 1;
            curObj = root[cacheClass[0]];
            while(i < index) {
                curObj = curObj['child'][cacheClass[i]];
                i++;
            }
        } 
    })
}


match();

console.log(JSON.stringify(root));