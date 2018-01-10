const path = require('path');
const argv = require('optimist').argv;
const cssControl = require('./lib/index');
// 遍历目录
let root = process.cwd();


if(argv.h) {
    
}

if(argv.p) {
    root = path.resolve(__dirname, argv.p);
}



cssControl(root);