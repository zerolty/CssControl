const sass = require('node-sass');

function sassLoader(path) {
  const result = sass.renderSync({
    file: path,
    // data: 'body{background:blue; a{color:black;}}',
    // outputStyle: 'compressed',
    // outFile: '../../1.css',
    // sourceMap: true, // or an absolute or relative (to outFile) path
    importer: function(url, prev, done) {
      // url is the path in import as is, which LibSass encountered.
      // prev is the previously resolved path.
      // done is an optional callback, either consume it or return value synchronously.
      // this.options contains this options hash
    }
  });
  if(result.css) {
    return result.css.toString("utf8");
  }
  return {};
}



module.exports = sassLoader;