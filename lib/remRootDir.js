var path = require('path');
var os = require('os');

function remRootDir(str, dir, workname) {
    var root = path.resolve(dir),
        rootReg,
        result = '';
    if(os.platform() === 'win32') {
        root = root.replace(/\\/g, '\\\\');
        rootReg = new RegExp(root, 'g');
    } else {
        rootReg = new RegExp(root + '/', 'g');
    }
    result = str.replace(rootReg, '');
    
    result = path.join(workname, result);

    result = result.replace(/\\/g, '/');
    return result;
}

module.exports = remRootDir;