import assert from 'node:assert/strict';
import test from 'node:test';
import { getSecureRandomInt, secureShuffle } from '../src/utils/cryptoRandom.ts';

test('rejects invalid bounds', () => {
  assert.throws(() => getSecureRandomInt(0), RangeError);
  assert.throws(() => getSecureRandomInt(1.5), RangeError);
  assert.throws(() => getSecureRandomInt(0x1_0000_0001), RangeError);
});

test('rejects out-of-range uint32 values to avoid modulo bias', () => {
  const originalCrypto = Object.getOwnPropertyDescriptor(globalThis, 'crypto');
  const values = [0xffff_ffff, 7];
  let calls = 0;
  Object.defineProperty(globalThis, 'crypto', {
    configurable: true,
    value: { getRandomValues: (array: Uint32Array) => { array[0] = values[calls++]; return array; } },
  });
  try {
    assert.equal(getSecureRandomInt(10), 7);
    assert.equal(calls, 2);
  } finally {
    if (originalCrypto) Object.defineProperty(globalThis, 'crypto', originalCrypto);
  }
});

test('shuffles a copy and preserves all items', () => {
  const source = [1, 2, 3, 4];
  const result = secureShuffle(source);
  assert.deepEqual(source, [1, 2, 3, 4]);
  assert.deepEqual([...result].sort(), source);
});
