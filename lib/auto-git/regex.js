const REG_HEAD = /^diff --git "?(.+)"? "?(.+)"?/;
const BEFORE_REG = /((\.|#)?.*)\s{/; 
module.exports = {
    REG_HEAD,
    BEFORE_REG
}