export function getSecureRandomInt(max: number): number {
  if (max <= 0) return 0;
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return array[0] % max;
}

export function secureShuffle<T>(array: T[]): { shuffled: T[]; entropyLog: string } {
  const shuffled = [...array];
  const startTime = performance.now();

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = getSecureRandomInt(i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const endTime = performance.now();
  const duration = (endTime - startTime).toFixed(2);

  return {
    shuffled,
    entropyLog: `Generated via window.crypto.getRandomValues(). Shuffled ${shuffled.length} items in ${duration}ms with true hardware entropy.`,
  };
}
