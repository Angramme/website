

type deferred = () => any;
type deferer = (deferred: deferred) => void;

export async function scope<T>(run: (d:deferer) => T): Promise<T> {
    let defs: deferred[] = [];
    let defer: deferer = (def) => defs.push(def);
    let result = await run(defer);
    for(let d of defs.reverse()) d();
    return result;
}