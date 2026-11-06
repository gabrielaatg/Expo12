const { 
  METRIC_CATEGORIES, 
  qualityMetricsOverview, 
  clasificarMetricaProyecto 
} = require('../quality-metrics-intro');

describe('Pruebas unitarias - Introducción y Clasificación', () => {
  test('Debe contener definición y los 4 puntos de importancia', () => {
    expect(qualityMetricsOverview.definicion).toBeDefined();
    expect(qualityMetricsOverview.importancia.length).toBe(4);
  });

  test('Debe clasificar Defect Leakage en Proceso', () => {
    const res = clasificarMetricaProyecto('Defect Leakage');
    expect(res.categoria).toBe(METRIC_CATEGORIES.PROCESO);
  });

  test('Debe clasificar Flaky Tests en Producto', () => {
    const res = clasificarMetricaProyecto('Flaky Tests');
    expect(res.categoria).toBe(METRIC_CATEGORIES.PRODUCTO);
  });
});