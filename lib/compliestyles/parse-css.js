const sassLoader = require('./sass-loader');

function ParseTo(styles) {
    const css = sassLoader(styles);
    return css;
    // console.log(css); 
}

module.exports = ParseTo;