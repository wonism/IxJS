import { from } from '../asynciterable/from';
import {
  toDOMStream as asyncIterableToDOMStream,
  ReadableBYOBStreamOptions,
  ReadableByteStreamOptions
} from '../asynciterable/todomstream';

export function toDOMStream<T>(
  source: Iterable<T>,
  strategy?: QueuingStrategy<T>
): ReadableStream<T>;
export function toDOMStream<T>(
  source: Iterable<T>,
  options: ReadableBYOBStreamOptions<Uint8Array>
): ReadableStream<Uint8Array>;
export function toDOMStream<T>(
  source: Iterable<T>,
  options: ReadableByteStreamOptions<Uint8Array>
): ReadableStream<Uint8Array>;
export function toDOMStream(
  source: Iterable<any>,
  options?: QueuingStrategy<any> | ReadableBYOBStreamOptions | ReadableByteStreamOptions
) {
  if (!options || !('type' in options) || options['type'] !== 'bytes') {
    return asyncIterableToDOMStream(from(source), options);
  }
  return asyncIterableToDOMStream(from(source), options);
}