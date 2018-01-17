const uniq = require('../lib/uniq');

test('two plus two is four', () => {
    const arr = [{source: 'c', 'target': 'b'},
    {source: 'c', 'target': 'b'}];
    const toarr = [{source: 'c', 'target': 'b'}]
    expect(uniq(arr)).toEqual(toarr);
});
