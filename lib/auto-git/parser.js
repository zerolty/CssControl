/**
 * 将diff得到的文件转为二进制流接着字符串解析为json
 */

 const { readFile } = require('fs');

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
    let data = {};
    for (let i = 0, len = lines.length; i < len; i++) {
      const line = lines[i];
      let values;
      if (values = /^diff --git "?(.+)"? "?(.+)"?/.exec(line)) {
        console.log(values)
        // startFile();
        // file.fromName = parseFile(values[1]);
        // file.toName = parseFile(values[2]);
        // continue;
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

