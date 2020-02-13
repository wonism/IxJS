import { IterableX } from '../../iterable/iterablex';
import { catchError as _catchError } from '../../iterable/catcherror';

/** @nocollapse */
IterableX.catchError = _catchError;

export declare namespace iterable {
  let catchError: typeof _catchError;
}

declare module '../../iterable/iterablex' {
  /* eslint no-shadow: "off" */
  namespace IterableX {
    export { _catchError as catchError };
  }
}
