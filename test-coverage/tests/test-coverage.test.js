const test = require('node:test');
const assert = require('node:assert/strict');
const { calculate } = require('../test-coverage.js');

const requirements = [{ id: 'compra' }, { id: 'total' }, { id: 'filtro' }, { id: 'carrito' }];

test('calcula 75 % con 3 de 4 requisitos cubiertos', () => {
  const tests = [{ covers: ['compra'] }, { covers: ['total'] }, { covers: ['filtro'] }];
  const result = calculate(requirements, tests);
  assert.equal(result.rate, 75);
  assert.equal(result.covered, 3);
  assert.deepEqual(result.uncovered, [{ id: 'carrito' }]);
});

test('varias pruebas sobre el mismo requisito no aumentan la cobertura', () => {
  const tests = [{ covers: ['total'] }, { covers: ['total'] }, { covers: ['total', 'total'] }];
  const result = calculate(requirements, tests);
  assert.equal(result.rate, 25);
  assert.equal(result.testsPerRequirement.total, 3);
});

test('devuelve 0 % si ninguna prueba cubre requisitos', () => {
  assert.equal(calculate(requirements, [{ covers: [] }]).rate, 0);
});

test('no calcula la cobertura sin requisitos', () => {
  assert.equal(calculate([], []).rate, null);
});

test('rechaza requisitos duplicados o pruebas con requisitos desconocidos', () => {
  assert.equal(calculate([{ id: 'a' }, { id: 'a' }], []).valid, false);
  assert.equal(calculate(requirements, [{ covers: ['pago'] }]).valid, false);
  assert.equal(calculate(requirements, [{}]).valid, false);
});
