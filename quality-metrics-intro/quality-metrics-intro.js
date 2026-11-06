const METRIC_CATEGORIES = {
  PROCESO: 'Métricas de Proceso',
  PROYECTO: 'Métricas de Proyecto',
  PRODUCTO: 'Métricas de Producto'
};

const qualityMetricsOverview = {
  titulo: "Introducción a las Métricas de Calidad del Software",
  definicion: "Medidas cuantitativas y verificables que evalúan el grado en que un sistema o proceso cumple los estándares de calidad.",
  importancia: [
    "Detección y prevención temprana de defectos para mitigar costos.",
    "Toma de decisiones fundamentada en datos sobre la estabilidad del release.",
    "Reducción continua de deuda técnica y control de mantenimiento.",
    "Evaluación de la cobertura y robustez del conjunto de pruebas."
  ],
  clasificacion: [
    {
      categoria: METRIC_CATEGORIES.PROCESO,
      descripcion: "Evalúan la madurez y eficacia del ciclo de vida y testing.",
      ejemplos: ["Defect Leakage", "Tiempo medio de resolución (MTTR)"]
    },
    {
      categoria: METRIC_CATEGORIES.PROYECTO,
      descripcion: "Monitorean la gestión de cronograma, costos y asignación de recursos.",
      ejemplos: ["Desviación del cronograma", "Esfuerzo estimado vs. real"]
    },
    {
      categoria: METRIC_CATEGORIES.PRODUCTO,
      descripcion: "Evalúan las características técnicas del código y pruebas.",
      subcategorias: {
        internas: ["Complejidad ciclomática", "Densidad de defectos"],
        externas: ["Flaky Tests", "Automation Metrics"]
      }
    }
  ]
};

function clasificarMetricaProyecto(nombreMetrica) {
  const normalizado = nombreMetrica.toLowerCase();
  if (normalizado.includes('leakage') || normalizado.includes('fuga')) {
    return { metrica: nombreMetrica, categoria: METRIC_CATEGORIES.PROCESO };
  }
  if (normalizado.includes('flaky') || normalizado.includes('automation')) {
    return { metrica: nombreMetrica, categoria: METRIC_CATEGORIES.PRODUCTO };
  }
  return { metrica: nombreMetrica, categoria: METRIC_CATEGORIES.PROYECTO };
}

module.exports = {
  METRIC_CATEGORIES,
  qualityMetricsOverview,
  clasificarMetricaProyecto
};