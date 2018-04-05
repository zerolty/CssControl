const fs = require('fs');

function readFile(fileurl) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileurl, (err, data) => {
            if(err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

function writeFile(fileurl, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(fileurl, data, 'utf8', (err) => {
            if(err) {
                reject(err);
            } else {
                resolve('success');
            }
        })
    })
}

function isTypeOf(object) {
    let type = Object.prototype.toString.call(object);
    type = type.replace(/\[object\s/, '').replace(']', '');
    return type.toLowerCase();
}

function ObjRnToArr(o) {
    const arr = [];
    for(let i in o) {
        arr.push(o[i]);
    }
    return arr;
}

module.exports = {
    isTypeOf,
    readFile,
    writeFile,
    ObjRnToArr
}