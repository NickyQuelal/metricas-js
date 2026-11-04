// Calcula el total de un pedido con descuentos
function calcularTotal(pedido) {
  let total = 0;
  for (const item of pedido.items) {
    if (item.cantidad > 0 && item.precio > 0) {
      total += item.cantidad * item.precio;
    }
  }
  if (pedido.cliente === "VIP") {
    total = total * 0.9;
  } else if (pedido.cliente === "FRECUENTE") {
    total = total * 0.95;
  }
  if (total > 100 || pedido.cupon) {
    total = total - 5;
  }
  return total;
}

function calcularTotalTienda(pedido) {
  let total = 0;
  for (const item of pedido.items) {
    if (item.cantidad > 0 && item.precio > 0) {
      total += item.cantidad * item.precio;
    }
  }
  if (pedido.cliente === "VIP") {
    total = total * 0.9;
  } else if (pedido.cliente === "FRECUENTE") {
    total = total * 0.95;
  }
  return total;
}

module.exports = { calcularTotal, calcularTotalTienda };
