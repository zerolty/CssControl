const { spawn } = require('child_process');

function runCommand(cmd = 'sh', args) {
  return new Promise((rsv, rjt) => {
    const child = spawn( cmd, args );
    let response = '';
    child.stdout.on('data', buffer => response += buffer.toString());
    child.stdout.on('end', () => rsv(response));
    child.stdout.on('error', e => rjt(e));
  })
};

module.exports = {
  runCommand
}