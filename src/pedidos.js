// Calcula el total de un pedido con descuentos
const DESCUENTOS_CLIENTE = new Map([
  ["VIP", 0.9],
  ["FRECUENTE", 0.95]
]);
const DESCUENTO_FIJO = 5;
const UMBRAL_DESCUENTO_FIJO = 100;

function esItemValido(item) {
  return item.cantidad > 0 && item.precio > 0;
}

function calcularSubtotal(items) {
  return items
    .filter(esItemValido)
    .reduce((subtotal, item) => subtotal + item.cantidad * item.precio, 0);
}

function aplicarDescuentoCliente(total, cliente) {
  const factor = DESCUENTOS_CLIENTE.has(cliente) ? DESCUENTOS_CLIENTE.get(cliente) : 1;
  return total * factor;
}

function aplicaDescuentoFijo(total, pedido) {
  return total > UMBRAL_DESCUENTO_FIJO || Boolean(pedido.cupon);
}

function calcularTotalTienda(pedido) {
  return aplicarDescuentoCliente(calcularSubtotal(pedido.items), pedido.cliente);
}

function calcularTotal(pedido) {
  const total = calcularTotalTienda(pedido);
  return aplicaDescuentoFijo(total, pedido) ? total - DESCUENTO_FIJO : total;
}

module.exports = { calcularTotal, calcularTotalTienda };
