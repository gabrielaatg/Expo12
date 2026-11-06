(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.DynamicMetrics = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  function summarize(attempts, errors, totalDurationMs) {
    const validCounts = Number.isSafeInteger(attempts) && attempts >= 0 &&
      Number.isSafeInteger(errors) && errors >= 0 && errors <= attempts;
    if (!validCounts || !Number.isFinite(totalDurationMs) || totalDurationMs < 0) {
      return { valid: false, attempts, errors, errorRate: null, averageResponseMs: null };
    }
    return {
      valid: true,
      attempts,
      errors,
      errorRate: attempts ? (errors / attempts) * 100 : null,
      averageResponseMs: attempts ? totalDurationMs / attempts : null
    };
  }
  function calculateThroughput(successfulTransactions, observationMs) {
    if (!Number.isSafeInteger(successfulTransactions) || successfulTransactions < 0 || !Number.isFinite(observationMs) || observationMs <= 0) {
      return { valid: false, transactionsPerMinute: null };
    }
    return { valid: true, transactionsPerMinute: (successfulTransactions / observationMs) * 60000 };
  }
  return { summarize, calculateThroughput };
});
