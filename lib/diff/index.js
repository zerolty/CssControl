const root = process.cwd();

const realtionTree = {
    "\\html\\index1.html": ["\\css\\1.css", "\\css\\2.css"],
    "\\html\\index2.html": ["\\css\\3.css", "\\css\\4.css"]
};

const diffData = [{
    "name": "\\css\\1.css",
    "attribute": [{
            "name": ".content",
            "content": {
                "height": "60px",
                "width": "60px"
            }
        },
        {
            "name": ".inner-content",
            "content": {
                "height": "60px",
                "width": "60px"
            }
        },
        {
            "name": ".inner-button",
            "content": {
                "height": "60px",
                "width": "60px"
            }
        },
        {
            "name": ".inner-span",
            "content": {
                "height": "60px",
                "width": "60px"
            }
        }
    ]
}, {
    "name": "\\css\\3.css",
    "attribute": [{
        "name": ".inner-span",
        "content": {
            "height": "60px",
            "width": "60px"
        }
    }]
}];

const traverse = require("./traverse");
const exportFile = require('../exports/export');

const htmltocssTree = traverse(root, realtionTree, diffData);

console.log(htmltocssTree);
exportFile(htmltocssTree);



// console.log(JSON.stringify(exportjson));

