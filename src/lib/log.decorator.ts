import debug, { IDebugger } from 'debug';
import 'reflect-metadata';

export const debuggerMetadata = Symbol('debug');
let namespace;

const d = debug;

export function Log(subspace?: string) {

  return (target, propertyKey) => {
    subspace = subspace || target.constructor.name;

    const ns = namespace ? [namespace, subspace].join(':') : subspace;

    const loggerFn: IDebugger = d(ns);
    loggerFn['useColors'] = true;

    Reflect.defineMetadata(debuggerMetadata, loggerFn, target);


    target[propertyKey] = {
      d: loggerFn
    };
  }
}


export function setNamespace(ns: string) {
  namespace = ns;
}

export function getDebugger(ns: string): IDebugger {
  const de = d(ns);
  de['useColors'] = true;
  return de;
}
