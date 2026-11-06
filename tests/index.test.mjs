import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('quadratic interpolation', () => {
  const p = api.createBarycentric([0, 1, 2], [0, 1, 4]);
  assert.ok(Math.abs(p.evaluate(0.5) - 0.25) < 1e-12);
});
test('exact knots', () => {
  assert.equal(api.createBarycentric([0, 1], [3, 5]).evaluate(1), 5);
});
test('snapshot ownership', () => {
  const x = [0, 1],
    y = [0, 1],
    p = api.createBarycentric(x, y);
  y[0] = 99;
  assert.equal(p.evaluate(0), 0);
});
test('no extrapolation', () => {
  assert.throws(() => api.createBarycentric([0, 1], [0, 1]).evaluate(2));
});
test('invalid nodes', () => {
  assert.throws(() => api.createBarycentric([0, 0], [1, 2]));
  assert.throws(() => api.createBarycentric([0], [NaN]));
});
test('polynomial oracle', () => {
  const x = [-2, -1, 0, 1, 2],
    f = (t) => t ** 4 - 2 * t * t + 3,
    p = api.createBarycentric(x, x.map(f));
  for (let t = -2; t <= 2; t += 0.125) assert.ok(Math.abs(p.evaluate(t) - f(t)) < 1e-11);
});
