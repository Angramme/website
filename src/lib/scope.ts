

type deferred = () => void;
type deferer = (deferred: deferred) => void;

export async function scope<T>(run: (d:deferer) => T): Promise<T> {
    const defs: deferred[] = [];
    const defer: deferer = (def) => defs.push(def);
    const result = await run(defer);
    for(const d of defs.reverse()) d();
    return result;
}