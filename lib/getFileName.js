
const fs = require('fs'),
      path = require('path');

const {INCLUDE_FILE:include_list} = require('./const.js');
const {IGNORE_FILE:ignore_list} = require('./const');

const res = {
    pathname: [],
}

function getFileName(dir) {
    // console.log(dir);
    const files = fs.readdirSync(dir);

    files.forEach((item) => {

        const extname = path.extname(item),
              currentPath = path.join(dir, item),
              isFile = fs.statSync(currentPath).isFile(),
              isDir = fs.statSync(currentPath).isDirectory();
        
        if(ignore_list.indexOf(item) !==-1) {
            return;
        } else {
            if(isFile && include_list.indexOf(extname) !== -1) {
                res.pathname.push(currentPath);
            } else if(isDir) {
                getFileName(currentPath);
            }
        }
    })
    return res; 
}

module.exports = getFileName;