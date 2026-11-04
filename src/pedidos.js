// Calcula el total de un pedido con descuentos
function esItemValido(item) {
  return item.cantidad > 0 && item.precio > 0;
}

function calcularSubtotal(items) {
  let subtotal = 0;
  for (const item of items) {
    if (esItemValido(item)) {
      subtotal += item.cantidad * item.precio;
    }
  }
  return subtotal;
}

function aplicarDescuentoCliente(total, cliente) {
  if (cliente === "VIP") {
    return total * 0.9;
  }
  if (cliente === "FRECUENTE") {
    return total * 0.95;
  }
  return total;
}

function calcularTotalTienda(pedido) {
  return aplicarDescuentoCliente(calcularSubtotal(pedido.items), pedido.cliente);
}

function calcularTotal(pedido) {
  let total = calcularTotalTienda(pedido);
  if (total > 100 || pedido.cupon) {
    total = total - 5;
  }
  return total;
}

module.exports = { calcularTotal, calcularTotalTienda };
