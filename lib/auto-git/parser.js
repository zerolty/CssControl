/**
 * 将diff得到的文件转为二进制流接着字符串解析为json
 */

const {readFile} = require('fs');
const {REG_HEAD} = require('./regex'); // 辅助的正则表达式
const {INCLUDE_FILES} = require('./type');

function read(path) {
  return new Promise((rsv, rjt) => {
    readFile(path, (err, data) => {
      if (err) {
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
    let currentLine = '';

    for (let i = 0, len = lines.length; i < len; i++) {
      const line = lines[i];
      let values;
      // 判断head
      if (values = REG_HEAD.exec(line)) {
        console.log(line);
        styleBlocks.push(currentLine);
        currentLine = '';
        continue;
      }
      currentLine += line;
      
    }
    styleBlocks.push(currentLine);
    rsv(styleBlocks);
  })
}

function parsertoJson(arr) {
  let files = arr;
  let data = [];
  let temp = {};
  for(let j = 0; j < files.length; j++) {
    let lines = files[j];
    if(lines === '') {
      continue;
    }
    for(let i = 0, len = lines.length; i < len; i++) {
      const line = lines[i];
      if (values = REG_HEAD.exec(line)) {
        const type = values[1].split('.')[1];
        if (INCLUDE_FILES.indexOf(type) === -1) {
          break;
        }
        data.length > 0 && data.push(temp);
        temp = {
          from: values[1],
          to: values[2]
        };
        continue;
      }
      // 判断 ---
      if (line.indexOf('--- ') === 0) {
        console.log(line.slice(4));
        continue;
      }
    }
  }
}

function Parser() {
  return new Promise((rsv, rjt) => {
    read('./temp/diff.txt')
      .then(arr => parsertoBlock(arr))
      .then(result => {
        console.log(result)
      })
      .catch(err => {
        console.log(err)
      })
  })
}

Parser()

//  module.exports = {
//    Parser
//  }