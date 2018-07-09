const { runCommand } = require('./command.js');
const { Parser } = require('./parser.js');

function AutoGit() {
  // return Parser();
  return runCommand('sh', [`${__dirname}/bin/gitdiff.sh`])
    .then(r => {
      return Parser();
    })
    .catch(err => {
      console.log(err);
    })
}

// AutoGit()

module.exports = AutoGit;
