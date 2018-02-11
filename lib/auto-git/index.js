const { runCommand } = require('./command.js');
const { parser } = require('./parser.js');

function AutoGit() {
  runCommand('sh', [`${__dirname}/bin/gitdiff.sh`])
    .then(r => {
      
    })
    .catch(err => {
      console.log(err);
    })
}

AutoGit()
