import '../asynciterablehelpers';
import { empty, from, toSet } from 'ix/asynciterable';
import { sequenceEqual } from 'ix/iterable';

test('AsyncIterable#toSet non-empty', async () => {
  const xs = [1, 2, 3, 4, 5];
  const ys = from(xs);
  const res = await toSet(ys);
  expect(sequenceEqual(res, xs)).toBeTruthy();
});

test('AsyncIterable#toSet empty', async () => {
  const xs = empty<number>();
  const res = await toSet(xs);
  expect(res.size).toBe(0);
});

test('AsyncIterable#toSet trims', async () => {
  const xs = from([1, 2, 3, 3, 2, 1]);
  const ys = [1, 2, 3];
  const res = await toSet(xs);
  expect(sequenceEqual(res, ys)).toBeTruthy();
});
