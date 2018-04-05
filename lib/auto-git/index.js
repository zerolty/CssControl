const { runCommand } = require('./command.js');
const { Parser } = require('./parser.js');

function AutoGit() {
  return Parser();
  runCommand('sh', [`${__dirname}/bin/gitdiff.sh`])
    .then(r => {
      
    })
    .catch(err => {
      console.log(err);
    })
}

// AutoGit()

module.exports = AutoGit;
