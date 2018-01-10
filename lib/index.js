const readFile = require('./getFileName');
const getdep = require('./Filedepend');
const formatData = require('./formatData');
const connatData = require('./connatData');
const root = process.cwd();
// console.log(root);

const res = readFile(root);
// console.log(res);

const resDep = getdep(res);

// console.log(resDep);

const links = formatData(resDep, res, root);

// console.log(links);

const realtionTree = connatData(links);

console.log(realtionTree);