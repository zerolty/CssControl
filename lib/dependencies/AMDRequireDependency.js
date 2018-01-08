const fs = require('fs');
const path = require('path');
const RequireUrl = './../../examples/index.js';
const url = path.join(process.cwd(),RequireUrl);
let BaseUrl = path.join(process.cwd(), './../../examples');;
// console.log(url);
const parseTree = {};
const ToolParseDone = true;

(function init() {
    const entryData = readFileSync(RequireUrl);
    const resultData = repalceTemplate(entryData);
    const cssList = returnCssList(entryData);
    if(cssList) {
        parseTree[RequireUrl] = cssList;
    }
    eval(resultData);
    console.log(parseTree)
})();

function returnCssList(resultData) {
    const reg = /require\('.*\.(css|scss|less|styl|stylus)'\)/gi;
    return resultData.match(reg);
}

function repalceTemplate(tempaledata) {
    return tempaledata.replace(/require/g, '__css_control__');
}

function readFileSync(url) {
    return fs.readFileSync(url, 'utf-8');
}

function __css_control__(url) {
    
    url = path.join(BaseUrl, url);
    // BaseUrl = url;

    const entryData = readFileSync(url);
    const resultData = repalceTemplate(entryData);
    const cssList = returnCssList(entryData);
    if(cssList) {
        parseTree[RequireUrl] = cssList;
    }
    // 处理js递归
    const fileUrlLast = url.split('/');
    const fileUrlLastName = fileUrlLast[fileUrlLast.length - 1];

    if(fileUrlLastName.indexOf('.js') > -1) {
        eval(resultData);
    }
}