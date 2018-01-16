const path = require('path');
const argv = require('optimist')
        .alias('p', 'path')
        .describe('p', 'write a path')
        .alias('h', 'html')
        .describe('h', 'use type of html')
        .alias('s', 'single')
        .describe('s', 'use type of single')
        .argv;
const cssControl = require('./lib/index');
// 遍历目录
let root = process.cwd();
// 遍历类型
let type = 'single';

if(argv.h) {
    type = 'html';
} else if (argv.s) {
    type = 'single';
}

if(argv.p) {
    root = path.resolve(__dirname, argv.p);
}

cssControl(root, type);


