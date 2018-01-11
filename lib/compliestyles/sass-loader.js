var sass = require('node-sass');

var result = sass.renderSync({
    file: '../../1.scss',
    data: 'body{background:blue; a{color:black;}}',
    outputStyle: 'compressed',
    outFile: '../../1.css',
    sourceMap: true, // or an absolute or relative (to outFile) path
    importer: function(url, prev, done) {
      // url is the path in import as is, which LibSass encountered.
      // prev is the previously resolved path.
      // done is an optional callback, either consume it or return value synchronously.
      // this.options contains this options hash
      // OR
      var result = someSyncFunction(url, prev);
      return {file: result.path, contents: result.data};
    }
  });
  
//   fs.writeFile('./1.css', data, )
  console.log(result.css.toString("utf8"));
  console.log(result.map);
  console.log(result.stats);