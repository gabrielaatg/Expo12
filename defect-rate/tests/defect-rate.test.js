const test = require('node:test');
const assert = require('node:assert/strict');
const { detectDefects, calculate, density } = require('../defect-rate.js');

test('agrupa varias pruebas fallidas causadas por el mismo defecto', () => {
  const result = detectDefects([
    { pass: false, defect: 'precio', severity: 'high' },
    { pass: false, defect: 'precio', severity: 'high' },
    { pass: false, defect: 'compra', severity: 'critical' },
    { pass: true }
  ]);
  assert.equal(result.defects.length, 2);
  assert.deepEqual(result.bySeverity, { critical: 1, high: 1, medium: 0, low: 0 });
  assert.equal(result.defects.find(d => d.id === 'precio').failedTests, 2);
});

test('cuenta por separado los fallos sin defecto asociado', () => {
  assert.equal(detectDefects([{ pass: false }, { pass: false }]).defects.length, 2);
});

test('calcula 20 defectos por cada 100 pruebas con 4 defectos en 20 pruebas', () => {
  assert.deepEqual(calculate(4, 20), { valid: true, defectsFound: 4, testsExecuted: 20, rate: 20 });
});

test('no calcula la tasa sin pruebas ejecutadas', () => {
  assert.equal(calculate(0, 0).rate, null);
});

test('rechaza cantidades negativas o decimales', () => {
  assert.equal(calculate(-1, 10).valid, false);
  assert.equal(calculate(1.5, 10).valid, false);
  assert.equal(detectDefects([{ pass: 'no' }]).valid, false);
});

test('calcula densidad de defectos por requisito', () => {
  assert.equal(density(4, 8).value, 0.5);
  assert.equal(density(1, 0).valid, false);
});
