const readFile = require('./getFileName');
const getdep = require('./Filedepend');
const formatData = require('./formatData');
const connatData = require('./connatData');
const uniq = require('./uniq');

const root = process.cwd();
// console.log(root);

const res = readFile(root);
// console.log(res);

const resDep = getdep(res);

const arr = uniq(resDep);

// console.log(arr);

const links = formatData(arr, res, root);

// console.log(links);

const realtionTree = connatData(links);

console.log(realtionTree);