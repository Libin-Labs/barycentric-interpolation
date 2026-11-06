import { createBarycentric } from '@lp-labs/barycentric-interpolation';
if (Math.abs(createBarycentric([0, 1, 2], [0, 1, 4]).evaluate(0.5) - 0.25) > 1e-10)
  throw new Error('Interpolation');
// @ts-expect-error invalid argument must be rejected by declarations
createBarycentric(['0'], [1]);
