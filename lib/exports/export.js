// 导出可视化数据
const {writeFile} = require('../utils/tools');
function exportFile(htmltocssTree) {
    const map = [];
    for(var i in htmltocssTree) {
        const firstobj = {};
        map.push(firstobj);
        firstobj.label = i;
        firstobj.groups = [];
        htmltocssTree[i].map((item, index)=> {
            const secondobj = {};
            firstobj.groups.push(secondobj);
            secondobj.label = item.name;
            secondobj.groups = [];
            item.attr.map((l, k) => {
                const thirdobj = {};
                secondobj.groups.push(thirdobj);
                thirdobj.label = l.name;
            })
        })
    }
    writeFile('./lib/data/export.json', JSON.stringify(map))
    .then(res => {
        if(res === 'success') {
            console.log('export!');
        }
    }).catch(err => {
        console.log(err);
    })
    // return map;
}   

module.exports = exportFile;