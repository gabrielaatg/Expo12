# Métricas dinámicas

La sección de métricas dinámicas está integrada en `../index.html` y observa intentos de compra de la tienda.

- Tiempo medio de procesamiento: suma del tiempo de procesamiento local de cada compra dividida entre los intentos registrados.
- Tasa de errores: compras bloqueadas o calculadas con un importe distinto al esperado divididas entre los intentos de compra.
- Throughput: compras exitosas contabilizadas durante los últimos 60 segundos.
- Un carrito vacío no se cuenta como intento de compra.

El tiempo se mide en el navegador para esta simulación local; no representa latencia de red ni tiempo de servidor. CPU/RAM no se miden en esta demo: requieren instrumentar el proceso desde el sistema operativo o un servidor.


