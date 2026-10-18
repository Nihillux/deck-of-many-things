const UINT32_RANGE = 0x1_0000_0000;

export function getSecureRandomInt(maxExclusive: number): number {
  if (!Number.isSafeInteger(maxExclusive) || maxExclusive <= 0) {
    throw new RangeError('maxExclusive must be a positive safe integer.');
  }
  if (maxExclusive > UINT32_RANGE) {
    throw new RangeError('maxExclusive cannot exceed 2^32.');
  }

  const rejectionLimit = Math.floor(UINT32_RANGE / maxExclusive) * maxExclusive;
  const randomValue = new Uint32Array(1);
  do {
    crypto.getRandomValues(randomValue);
  } while (randomValue[0] >= rejectionLimit);
  return randomValue[0] % maxExclusive;
}

export function secureShuffle<T>(items: readonly T[]): T[] {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = getSecureRandomInt(index + 1);
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}
