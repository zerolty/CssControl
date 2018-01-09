function isTypeOf(object) {
    let type = Object.prototype.toString.call(object);
    type = type.replace(/\[object\s/, '').replace(']', '');
    return type.toLowerCase();
}

module.exports = {
    isTypeOf
}