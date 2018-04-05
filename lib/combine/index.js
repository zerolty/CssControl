const autoGit = require('../auto-git/index');
const cssControl = require('../index');
const {IGNORE_DEP} = require('../const');
const path = require('path');
const {ObjRnToArr} = require('../utils/tools');
/**
 * 
 * @desc 合并diff和依赖关系
 * @param {Url} root 
 * @param {String} type single | html
 */
function main (root, type) {
  const relation = cssControl(root, type);
  // res -> diff
  // relation -> 依赖关系
  autoGit().then(res => {
    const ocom = combine(reverse(relation), res);
    const aRcom = ObjRnToArr(ocom);
    console.log(aRcom);
  }).catch(e => {
    console.log(e);
  });
}


/**
 * 
 * @desc 讲js->css目录进行反转
 * @param {Object} rel 
 * @returns 
 */
function reverse(rel) {
  const cssRel = {};
  for(let i in rel) {
    rel[i].map((item) => {
      let iType = path.extname(item);
      if(IGNORE_DEP.includes(iType)) {
        if(cssRel.hasOwnProperty(item)) {
          cssRel[item].push(i);
        } else {
          cssRel[item] = [];
          cssRel[item].push(i);
        }
      }
    })
  }
  return cssRel;
}
/**
 * 
 * @desc 将依赖树和diff合并
 * @param {Object} rel 
 * @param {Object} oDiff 
 * @returns 
 */
function combine(rel, oDiff) {
  const oGroupList = {};
  oDiff.map(csitem => {
    if(rel.hasOwnProperty(csitem.label)) {
      rel[csitem.label].map(jsli => {
        if(oGroupList.hasOwnProperty(jsli)) {
          oGroupList[jsli].groups.push(csitem);
        } else {
          oGroupList[jsli] = {
            label: jsli,
            groups: []
          }
          oGroupList[jsli].groups.push(csitem);
        }
      })
    }
  });
  return oGroupList;
}


module.exports = main;