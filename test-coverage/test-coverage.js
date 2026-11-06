(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.TestCoverage = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  // Cobertura de requisitos: requisitos con al menos una prueba ÷ requisitos totales × 100.
  function calculate(requirements, tests) {
    if (!Array.isArray(requirements) || !Array.isArray(tests)) return invalid();
    const ids = requirements.map(r => r && r.id);
    if (ids.some(id => typeof id !== 'string' || !id) || new Set(ids).size !== ids.length) return invalid();
    if (!tests.every(t => t && Array.isArray(t.covers))) return invalid();
    const known = new Set(ids);
    if (tests.some(t => t.covers.some(id => !known.has(id)))) return invalid();

    const testsPerRequirement = Object.fromEntries(ids.map(id => [id, 0]));
    tests.forEach(t => new Set(t.covers).forEach(id => testsPerRequirement[id]++));
    const covered = requirements.filter(r => testsPerRequirement[r.id] > 0);
    const uncovered = requirements.filter(r => testsPerRequirement[r.id] === 0);
    return {
      valid: true,
      total: requirements.length,
      covered: covered.length,
      uncovered,
      testsPerRequirement,
      rate: requirements.length ? (covered.length / requirements.length) * 100 : null
    };
  }
  function invalid() {
    return { valid: false, total: 0, covered: 0, uncovered: [], testsPerRequirement: {}, rate: null };
  }
  return { calculate };
});
