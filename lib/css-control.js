const fs = require('fs');
const join = require('path').join;
const cheerio = require('cheerio');

const diff = [{
    'name': '1.css',
    'attribute':[
        {
            name: '.content', 
            content: {
                'height': '60px',
                'width': '60px'
            }
        },
        {
            name: '.inner-content', 
            content: {
                'height': '60px',
                'width': '60px'
            }
        },
        {
            name: '.inner-button', 
            content: {
                'height': '60px',
                'width': '60px'
            }
        },
        {
            name: '.inner-span', 
            content: {
                'height': '60px',
                'width': '60px'
            }
        }
    ]
},,{
    'name': '3.css',
    'attribute':[
        {
            name: '.inner-span', 
            content: {
                'height': '60px',
                'width': '60px'
            }
        }
    ]
}]
const change = [];

function findDir(path) {
    let files=fs.readdirSync(path);
    const promiseAll = [];
    files.forEach((val,index) => {
        let fPath = join(path,val);
        let stats = fs.statSync(fPath);
        // if(stats.isDirectory()) findDir(fPath);
        if(stats.isFile()) {
            promiseAll.push(readFile(fPath));
        }
    });
    Promise.all(promiseAll).then((PromiseAllData) => {
        console.log(JSON.stringify(PromiseAllData));
        const parseJson = handleToJson(PromiseAllData);
        fs.writeFile('../dist/effect.json', JSON.stringify(parseJson), (err) => {
            if(err) {
                return;
            } else {
                console.log('effect.json');
            }
        })
    })
}

function readFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', function(err, filedata) {
            if(err) {
                reject(err);
            } else {
                $ = cheerio.load(filedata);
                const effect = {};
                path = path.replace('..\\', '').replace(/\\/g, '/');
                effect[path] = [];
                $('link').each(function() {
                    const href = $(this).attr('href');
                    diff.map((item) => {
                        if(href === item.name) {
                            const objPer = handleAttr(filedata, item.attribute);
                            if(Object.keys(objPer).length === 0) {
                                effect[path].push({
                                    href
                                })
                            } else {
                                    effect[path].push({
                                        href,
                                        objPer
                                    });
                            }
                        }
                    })
                })
                resolve(effect);
            }
        });
    })
}
/**
 * 
 * 
 * @param {String} filedata 
 * @param {Array} attribute  diff.attribute
 * @returns Object
 */
function handleAttr(filedata, attribute) {
    $ = cheerio.load(filedata);
    const perfor = {};
    attribute.forEach((item) => {
        if($(item.name)) {
            let index = 0;
            $(item.name).each(() => {
                index++;
            });
            if(index > 0) {
                perfor[item.name] = index;
            }
        }
    })
    return perfor;
}
/**
 * 
 * 
 * @param {Array} PromiseAllData
 * // 考虑性能问题 
 * [{"filename":[{"href":"value","objPer":{"attr":value}}]}] 
 */
function handleToJson(PromiseAllData) {
    const groups = [];
    PromiseAllData.forEach((item, index) => {
        
    })
    for(let k = 0; k < PromiseAllData.length; k++) {
        let item = PromiseAllData[k];
        const groupli = {};
        const groupliName = Object.keys(item)[0];
        const groupliNameData = item[groupliName];
        if(groupliNameData.length === 0) {
            continue;
        }
        groupli['label'] = groupliName;
        groupli['groups'] = [];
        groups.push(groupli);
        groupliNameData.forEach((item,index) => {
            const itemli = {}
            const objPer = item['objPer'];
            itemli['label'] = item.href;
            itemli['groups'] = [];
            groupli['groups'].push(itemli);
            for(let i in objPer) {
                itemli['groups'].push({
                    label: `${i}:${objPer[i]}`
                });
            }
        })
    }
    return groups;
}

findDir('../src/html');




