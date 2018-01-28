/**
 * 将diff得到的文件转为二进制流接着字符串解析为json
 */

 const { readFile } = require('fs');
 const { REG_HEAD } = require('./regex'); // 辅助的正则表达式

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

 function parsertojson(arr) {
   return new Promise((rsv, rjt) => {
    // rsv(arr.length);
    const lines = arr;
    let data = [];
    let temp = {};

    for (let i = 0, len = lines.length; i < len; i++) {
      const line = lines[i];
      let values;
      // 判断head
      if (values = REG_HEAD.exec(line)) {
        data.length > 0 && data.push(temp);
        temp = {
          from: value[1],
          to: value[2]
        };
        continue;
      }

      // 判断 ---
      if (line.indexOf('--- ') === 0) {
        console.log(line.slice(4));
        continue;
      }

      
    }
   })
 }

 function Parser() {
   return new Promise((rsv, rjt) => {
    read('./temp/diff.txt')
      .then(arr => parsertojson(arr))
      .then(result => {
        console.log(result)
      })
   })
 }

 Parser()

//  module.exports = {
//    Parser
//  }

