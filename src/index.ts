function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
export interface BarycentricInterpolator {
  evaluate(x: number): number;
}
export function createBarycentric(
  xs: readonly number[],
  ys: readonly number[],
): BarycentricInterpolator {
  if (
    !Array.isArray(xs) ||
    !Array.isArray(ys) ||
    !xs.length ||
    xs.length > 128 ||
    xs.length !== ys.length
  )
    throw new RangeError('Matching arrays1..128');
  const x = [...xs],
    y = [...ys];
  for (let i = 0; i < x.length; i++) {
    finite(x[i]!);
    finite(y[i]!);
    if (i && x[i]! <= x[i - 1]!) throw new RangeError('Increasing nodes required');
  }
  const weights = x.map((v, i) => {
    let w = 1;
    for (let j = 0; j < x.length; j++) if (i !== j) w = finite(w / finite(v - x[j]!));
    if (w === 0) throw new RangeError('Weight underflow');
    return w;
  });
  const scale = Math.max(...weights.map(Math.abs));
  for (let i = 0; i < weights.length; i++) {
    weights[i] = weights[i]! / scale;
    if (weights[i] === 0) throw new RangeError('Weight underflow');
  }
  return {
    evaluate(query: number) {
      finite(query, x[0]!, x[x.length - 1]!);
      const hit = x.indexOf(query);
      if (hit >= 0) return y[hit]!;
      const terms = x.map((v, i) => finite(weights[i]! / (query - v))),
        m = Math.max(...terms.map(Math.abs));
      let numerator = 0,
        denominator = 0;
      for (let i = 0; i < terms.length; i++) {
        const t = terms[i]! / m;
        numerator = finite(numerator + t * y[i]!);
        denominator += t;
      }
      if (denominator === 0) throw new RangeError('Singular interpolation sum');
      return finite(numerator / denominator);
    },
  };
}
