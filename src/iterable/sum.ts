import { identity } from '../util/identity';

export function sum(source: Iterable<number>, fn?: (x: number) => number): number;
export function sum<T>(source: Iterable<T>, fn: (x: T) => number): number;
export function sum(source: Iterable<any>, fn: (x: any) => number = identity): number {
  let sumValue = 0;
  for (const item of source) {
    sumValue += fn(item);
  }

  return sumValue;
}
