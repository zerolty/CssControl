const path = require('path');
const remRootDir = require('./remRootDir');

function formatData(links, res, dir) {
    const realLinks = [];
    links.forEach((item) => {
        item.target = path.resolve(item.source, '..', item.target);
        item.source = remRootDir(item.source, dir);

        for(let i = 0; i < res.pathname.length; i++) {
            if(res.pathname[i].indexOf(item.target) !== -1) {
                item.target = remRootDir(res.pathname[i], dir);
                realLinks.push(item);
                break;
            }
        }
    })
    return realLinks;
}

module.exports = formatData;
