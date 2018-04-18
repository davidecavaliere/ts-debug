import debug from 'debug';

const logger = debug;
let namespace = 'ts-debug';

export function Log(subspace?: string) {
    return (target, propertyKey) => {
        subspace = subspace || target.constructor.name;

        target[propertyKey] = (...args: any[]) => {
            logger([namespace, subspace].join(':')).apply(target, args);
        }
    }
}


export function setNamespace(ns: string) {
    namespace = ns;
}
