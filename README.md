# @lp-labs/barycentric-interpolation

Copied global polynomial barycentric interpolation.

Original, standalone MIT TypeScript implementation with **zero runtime or peer dependencies**. ESM/CommonJS exports and separate declarations; Node18+ and compatible ES2022 browsers. No service, filesystem, network, clock or browser globals accessed on import. Compiler/formatter dependencies are development-only.

## Install

```sh
npm install @lp-labs/barycentric-interpolation
```

## Working example

```js
import { createBarycentric } from '@lp-labs/barycentric-interpolation';
if (Math.abs(createBarycentric([0, 1, 2], [0, 1, 4]).evaluate(0.5) - 0.25) > 1e-10)
  throw new Error('Interpolation');
```

CommonJS: `const api = require('@lp-labs/barycentric-interpolation')`.

## Behavior, customization and limits

createBarycentric(xs,ys) requires matching dense arrays1..128, finite strictly increasing x, finite y. Computes product reciprocal weights, normalizes by max magnitude; overflow, underflow-to-zero or invalid weights reject. Returns evaluate(x); exact knot returns original y, finite queries outside knots throw (no extrapolation). O(n squared)construct,O(n)evaluate. Global polynomial may oscillate/ill-condition; not linear/spline smoothing.

Use the explicit function arguments and public types below to customize the documented behavior. There are no hidden environment settings or sibling-library requirements. Array inputs must be dense; sparse entries are invalid. Inputs are validated before a successful result is returned. Outputs do not mutate caller-owned inputs. Hostile proxies/getters and concurrent mutation are outside the contract.

## Errors and integration

Invalid data never produces an empty success-shaped substitute. TypeError reports incompatible runtime types/nonfinite numbers; RangeError reports unsupported ranges, invalid syntax, inconsistent states and exceeded budgets. Functions that explicitly return null, false or empty arrays describe those legitimate outcomes above. Errors propagate to callers; UI applications should catch at their boundary and visibly notify users. Numerical calculations use JavaScript IEEE754 unless the API explicitly uses bigint; compare approximate numerical results with application-appropriate tolerances.

## Complete public API

```ts
export interface BarycentricInterpolator {
  evaluate(x: number): number;
}
export declare function createBarycentric(
  xs: readonly number[],
  ys: readonly number[],
): BarycentricInterpolator;
```

## Performance and portability

Complexity and resource ceilings are specified above. Buffered synchronous algorithms do not create workers or timers; callers can move expensive work to their own worker. Limits are enforced, not silently truncated. No runtime imports from any other library. No compatibility or completeness claims beyond the stated scope.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
