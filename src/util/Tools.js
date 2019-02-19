export const makeClassName = (block, addons) => (
    addons.reduce((acc, [predicate, addon]) => {
        acc += predicate ? ` ${addon || predicate}` : '';
        return acc;
    }, block)
);