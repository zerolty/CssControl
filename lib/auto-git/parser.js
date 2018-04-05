/**
 * 将diff得到的文件转为二进制流接着字符串解析为json
 */

const {
  readFile,
  writeFile
} = require('fs');
const {
  REG_HEAD
} = require('./regex'); // 辅助的正则表达式
const {
  INCLUDE_FILES
} = require('./type');
const match = require('./match/index');

function read(path) {
  return new Promise((rsv, rjt) => {
    readFile(path, (err, data) => {
      if (err) {
        console.log(err);
        console.error('======= 读取文件失败！您可能误删了临时文件 =======');
        rjt(err);
      }
      rsv(data.toString().split('\n'));
    })
  })
}
/**
 * @desc 将diff分块文件
 * @param {Array} arr 
 * @resolve {Array}
 */
function parsertoBlock(arr) {
  return new Promise((rsv, rjt) => {
    const lines = arr;

    let styleBlocks = [];
    let currentLine = [];

    for (let i = 0, len = lines.length; i < len; i++) {
      const line = lines[i];
      let values;
      // 判断head
      if (values = REG_HEAD.exec(line)) {
        // console.log(line);
        styleBlocks.push(currentLine);
        currentLine = [];
        currentLine.push(line);
        continue;
      }
      currentLine.push(line);

    }
    styleBlocks.push(currentLine);
    // writeFile('2.json', JSON.stringify(styleBlocks), err => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log('write 2.json success');
    //   }
    // })
    rsv(styleBlocks);
  })
}

/**
 * @desc 把diff数组过滤成样式对象
 * @param {Array} arr 
 * @returns 
 */
function parsertoJson(arr) {
  return new Promise((resolve, reject) => {
    let files = arr;
    // let data = [];
    let temp = {};
    for (let j = 0; j < files.length; j++) {
      let lines = files[j];
      let name;
      if (lines === '') {
        continue;
      }
      for (let i = 0, len = lines.length; i < len; i++) {
        let line = lines[i];
        // console.log(line);
        let values;
        // return;
        if (values = REG_HEAD.exec(line)) {
          const type = values[1].split('.')[1];
          // console.log(`${values[1]} type is : ${type}`);

          if (INCLUDE_FILES.indexOf(type) === -1) {
            break;
          }
          name = values[2];
          temp[name] = '';

          continue;
        }
        // 判断不加入line的情况
        if (line.indexOf('--- ') === 0 || line.indexOf('+++ ') === 0 || line.indexOf('@@ ') === 0 || line.indexOf('index ') === 0 || line.indexOf('//') === 0 || line.indexOf('\\') === 0) {
          // console.log(1);
          continue;
        }
        if (name) {
          temp[name] += line;
        }
      }
    }

    // writeFile('1.json', JSON.stringify(temp), err => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log('write 1.json success');
    //   }
    // })
    resolve(temp);
  })
}
// 引用对象链
let stylesList = {}

/**
 * @desc 将样式对象解析成AST模版
 * @param {Object} oStyList 
 */
function parToFullList(oStyList) {
  return new Promise((resolve ,reatjct) => {
    const oDiffList = [];
    for (let i in oStyList) {
      const oItem = {};
      const oMatch = match(oStyList[i]);
      oItem['label'] = i;
      attrMerge(oMatch, '');
      const trimL = trimStylesList(stylesList);
      oItem['groups'] = trimL;
      oDiffList.push(JSON.parse(JSON.stringify(oItem)));
      stylesList = {};
    }
    // console.log(JSON.stringify(oDiffList));
    resolve(oDiffList);
  })
}

/**
 * 
 * @desc 递归合并styles对象,组合成真正的样式
 * @param {Object} obj 
 * @param {String} root 
 */
function attrMerge(obj, root) {
  Object.keys(obj).map((item) => {
    if (obj[item].isChange !== '') {
      stylesList[`${root} ${item}`] = obj[item].attr;
    }
    if (obj[item].isChange === '' && obj[item].attr.length > 0) {
      stylesList[`${root} ${item}`] = obj[item].attr;
    }
    if (Object.getOwnPropertyNames(obj[item].child).length !== 0) {
      attrMerge(obj[item].child, `${root} ${item}`)
    }
  })
}

/**
 * 
 * @desc 格式化样式对象
 * @param {Object} oList 
 * @returns 
 */
function trimStylesList(oList) {
  const groups = [];
  Object.keys(oList).map((item) => {
    const ogL = {};
    ogL['label'] = item;
    ogL.groups = [];
    oList[item].map((i) => {
      ogL.groups.push({
        label: i
      })
    });
    groups.push(ogL);
  })
  return groups;
}


function Parser() {
  return new Promise((rsv, rjt) => {
    read(`${process.cwd()}/lib/auto-git/temp/diff.txt`)
      .then(res => parsertoBlock(res))
      .then(res => parsertoJson(res))
      .then(res => parToFullList(res))
      .then(result => {
        rsv(result);
        // console.log(JSON.stringify(result));
      })
      .catch(err => {
        console.log(err)
      })
  })
}

// Parser()

 module.exports = {
   Parser
 }