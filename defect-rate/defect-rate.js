(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.DefectRate = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  const SEVERITIES = ['critical', 'high', 'medium', 'low'];

  // Agrupa las pruebas fallidas por defecto: varias pruebas pueden fallar por un mismo defecto.
  function detectDefects(results) {
    if (!Array.isArray(results) || !results.every(r => r && typeof r.pass === 'boolean')) {
      return { valid: false, defects: [], bySeverity: null };
    }
    const found = new Map();
    results.forEach((r, index) => {
      if (r.pass) return;
      const id = r.defect || `sin-clasificar-${index}`;
      if (!found.has(id)) found.set(id, { id, severity: r.severity || null, failedTests: 0 });
      found.get(id).failedTests++;
    });
    const defects = [...found.values()];
    const bySeverity = Object.fromEntries(SEVERITIES.map(s => [s, defects.filter(d => d.severity === s).length]));
    return { valid: true, defects, bySeverity };
  }

  // Tasa de defectos: defectos detectados ÷ pruebas ejecutadas × 100.
  function calculate(defectsFound, testsExecuted) {
    const validCount = value => Number.isSafeInteger(value) && value >= 0;
    if (!validCount(defectsFound) || !validCount(testsExecuted)) {
      return { valid: false, defectsFound, testsExecuted, rate: null };
    }
    return { valid: true, defectsFound, testsExecuted, rate: testsExecuted === 0 ? null : (defectsFound / testsExecuted) * 100 };
  }

  // Densidad de defectos: defectos ÷ unidades de tamaño (por ejemplo, requisitos o KLOC).
  function density(defectsFound, size) {
    if (!Number.isSafeInteger(defectsFound) || defectsFound < 0 || !Number.isFinite(size) || size <= 0) {
      return { valid: false, value: null };
    }
    return { valid: true, value: defectsFound / size };
  }
  return { SEVERITIES, detectDefects, calculate, density };
});
