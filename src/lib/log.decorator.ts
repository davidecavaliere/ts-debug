import debug, { IDebugger } from 'debug';
import 'reflect-metadata';

export const debuggerMetadata = Symbol('debug');
let namespace = 'ts-debug';

export function Log(subspace?: string) {

  return (target, propertyKey) => {
    subspace = subspace || target.constructor.name;

    const loggerFn: IDebugger = debug([namespace, subspace].join(':'));
    loggerFn['useColors'] = true;

    Reflect.defineMetadata(debuggerMetadata, loggerFn, target);

    target[propertyKey] = loggerFn;
  }
}


export function setNamespace(ns: string) {
  namespace = ns;
}