const fs = require('fs'),
      path = require('path'),
      reqReg = /require\(['|"](.*?)['|"]\)/g,
      impReg = /import\s.*?['|"](.*?)['|"]/g,
      resDepend = [];

function getDepend(res) {
    res.pathname.forEach((item, index) => {
        const data = fs.readFileSync(item, 'utf-8');
        let results = [];
        while((results = reqReg.exec(data)) !== null) {
            const link = {
                source: res.pathname[index],
                target: results[1]
            };
            resDepend.push(link);
        }
        while((results = impReg.exec(data)) !== null) {
            const link = {
                source: res.pathname[index],
                target: results[1]
            };
            resDepend.push(link);
        }
    });
    return resDepend;
}

module.exports = getDepend;