
function connatData(links) {
    const realtionTree = {};
    links.forEach((item) => {
        const parent = item.source;
        const child = item.target;
        if(realtionTree[parent]) {
            realtionTree[parent].push(child);
        } else {
            realtionTree[parent] = [];
            realtionTree[parent].push(child);
        }
    });
    return realtionTree;
}

module.exports = connatData;