export function buildTree(categories) {
    const map = {};
    categories.forEach(cat => (map[cat.id] = { ...cat, children: [] }));

    const tree = [];
    categories.forEach(cat => {
        if (cat.cat_parent === 0) {
            tree.push(map[cat.id]);
        } else {
            map[cat.cat_parent]?.children.push(map[cat.id]);
        }
    });

    return tree;
}
