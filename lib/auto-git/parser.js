/**
 * 将diff得到的文件转为二进制流接着字符串解析为json
 */

const {readFile, writeFile} = require('fs');
const {REG_HEAD} = require('./regex'); // 辅助的正则表达式
const {INCLUDE_FILES} = require('./type');
const parseCss = require('../compliestyles/parse-css');

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
    let currentLine = [];

    for (let i = 0, len = lines.length; i < len; i++) {
      const line = lines[i];
      let values;
      // 判断head
      if (values = REG_HEAD.exec(line)) {
        console.log(line);
        styleBlocks.push(currentLine);
        currentLine = [];
        currentLine.push(line);
        continue;
      }
      currentLine.push(line);
      
    }
    styleBlocks.push(currentLine);
    writeFile('2.json', JSON.stringify(styleBlocks), err=> {
      if(err) {
        console.log(err);
      } else {
        console.log('write 2.json success');
      }
    })
    rsv(styleBlocks);
  })
}

function parsertoJson(arr) {
  return new Promise((resolve, reject) => {
    let files = arr;
    // let data = [];
    let temp = {};
    for(let j = 0; j < files.length; j++) {
      let lines = files[j];
      let name;
      if(lines === '') {
        continue;
      }
      for(let i = 0, len = lines.length; i < len; i++) {
        let line = lines[i];
        // console.log(line);
        let values;
        // console.log(JSON.stringify(line));
        // return;
        if (values = REG_HEAD.exec(line)) {
          const type = values[1].split('.')[1];
          console.log(`${values[1]} type is : ${type}`); 
            
          if (INCLUDE_FILES.indexOf(type) === -1) {
            break;
          }
          // console.log(JSON.stringify(values))
          name = values[2];
          temp[name] = '';
          // data.length > 0 && data.push(temp);
          // temp = {
          //   from: values[1],
          //   to: values[2]
          // };
          continue;
        }
        // 判断不加入line的情况
        if (line.indexOf('--- ') === 0 || line.indexOf('+++ ') === 0 || line.indexOf('@@ ') === 0 || line.indexOf('index ') === 0 || line.indexOf('//') === 0 || line.indexOf('\\') === 0) {
          // console.log(1);
          continue;
        }
        if(line.indexOf('-') === 0) {
          // console.log('-',line);
          // line = line.trim().replace(/^\-/, '// -');
          line = `content: '${line}';`;
          // console.log('1-',line);
        }
        if(line.indexOf('+') === 0) {
          // console.log('+',line);
          // line = line.trim().replace(/^\+/, '// +');
          line = `content: '${line}';`;
          // console.log('1+',line);
        }
        if(name) {
          temp[name] += line+'\r';
        }
      }
    }

    writeFile('1.json', JSON.stringify(temp), err=> {
      if(err) {
        console.log(err);
      } else {
        console.log('write 1.json success');
      }
    })
    resolve(temp);
  })
}

function parseStyleToCss(res) {
  return new Promise((resolve, reject) => {
    Object.keys(res).map((item) => {
      
      const StRes = JSON.stringify(res[item]);
      // console.log(parseCss(res[item]));
      const loaderCss = parseCss(res[item]);
      console.log(loaderCss.split('\n'));
      // writeFile('3.json', JSON.stringify(loaderCss.split('\n')), err=> {
      //   if(err) {
      //     console.log(err);
      //   } else {
      //     console.log('write 3.json success');
      //   }
      // })
    })
  })
}

function Parser() {
  return new Promise((rsv, rjt) => {
    read('./temp/diff.txt')
      .then(arr => parsertoBlock(arr))
      .then(arr => parsertoJson(arr))
      .then(arr => parseStyleToCss(arr))
      .then(result => {
        // console.log(result)
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