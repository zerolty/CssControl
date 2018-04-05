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
  autoGit().then(res => {
    // console.log(res);
    // console.log(relation);
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
  // console.log(cssRel);
  return cssRel;
}

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
  // console.log(JSON.stringify(oGroupList));
  return oGroupList;
}


module.exports = main;