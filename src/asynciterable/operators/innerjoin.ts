import { AsyncIterableX } from '../asynciterablex';
import { createGrouping } from './_grouping';
import { identity } from '../../util/identity';
import { OperatorAsyncFunction } from '../../interfaces';

export class JoinAsyncIterable<TOuter, TInner, TKey, TResult> extends AsyncIterableX<TResult> {
  private _outer: AsyncIterable<TOuter>;
  private _inner: AsyncIterable<TInner>;
  private _outerSelector: (value: TOuter) => TKey | Promise<TKey>;
  private _innerSelector: (value: TInner) => TKey | Promise<TKey>;
  private _resultSelector: (outer: TOuter, inner: TInner) => TResult | Promise<TResult>;

  constructor(
    outer: AsyncIterable<TOuter>,
    inner: AsyncIterable<TInner>,
    outerSelector: (value: TOuter) => TKey | Promise<TKey>,
    innerSelector: (value: TInner) => TKey | Promise<TKey>,
    resultSelector: (outer: TOuter, inner: TInner) => TResult | Promise<TResult>
  ) {
    super();
    this._outer = outer;
    this._inner = inner;
    this._outerSelector = outerSelector;
    this._innerSelector = innerSelector;
    this._resultSelector = resultSelector;
  }

  async *[Symbol.asyncIterator]() {
    const map = await createGrouping(this._inner, this._innerSelector, identity);
    for await (const outerElement of this._outer) {
      const outerKey = await this._outerSelector(outerElement);
      if (map.has(outerKey)) {
        for (const innerElement of map.get(outerKey)!) {
          yield await this._resultSelector(outerElement, innerElement);
        }
      }
    }
  }
}

export function innerJoin<TOuter, TInner, TKey, TResult>(
  inner: AsyncIterable<TInner>,
  outerSelector: (value: TOuter) => TKey | Promise<TKey>,
  innerSelector: (value: TInner) => TKey | Promise<TKey>,
  resultSelector: (outer: TOuter, inner: TInner) => TResult | Promise<TResult>
): OperatorAsyncFunction<TOuter, TResult> {
  return function innerJoinOperatorFunction(outer: AsyncIterable<TOuter>): AsyncIterableX<TResult> {
    return new JoinAsyncIterable<TOuter, TInner, TKey, TResult>(
      outer,
      inner,
      outerSelector,
      innerSelector,
      resultSelector
    );
  };
}
