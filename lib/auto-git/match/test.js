const match = require('./index');
const str = " .content {     &.style {         width: 100px;-        height: 100px;     }     .content {         width: 100px;     }+    .dd {+        width: 100%;+    } }  .cc {     width: 100px; }";

console.log(JSON.stringify(match(str)))

const obj = {
    ".content": {
        "attr": [],
        "child": {
            "&.style": {
                "attr": [" height: 100px;"],
                "child": {},
                "isChange": ""
            },
            ".content": {
                "attr": [],
                "child": {},
                "isChange": ""
            },
            ".dd": {
                "attr": ["width: 100%;", ""],
                "child": {},
                "isChange": "+"
            }
        },
        "isChange": ""
    },
    ".cc": {
        "attr": [],
        "child": {},
        "isChange": ""
    }
};

const stylesList = {}
function attrMerge(obj, root) {
    Object.keys(obj).map((item) => {
        if(obj[item].isChange !== '') {
            stylesList[root] = obj[item].attr;
        }
        if(Object.getOwnPropertyNames(obj[item].child).length !== 0) {
            attrMerge(obj[item].child, `${root}${item}`)
        }
        // if(obj[item].isChange === '' && Object.getOwnPropertyNames(obj[item].child).length === 0) {
        //     stylesList[root] = obj[item].attr;
        // }
    })
}

console.log(JSON.stringify(stylesList));

// function loopMerge(obj) {

// }