const { calcularTotal, calcularTotalTienda } = require("../src/pedidos");

describe("calcularTotal", () => {
  test("aplica 10 % de descuento a clientes VIP", () => {
    const pedido = { cliente: "VIP", items: [{ cantidad: 2, precio: 10 }] };
    expect(calcularTotal(pedido)).toBe(18);
  });

  test("ignora ítems con cantidad 0", () => {
    const pedido = { cliente: "NORMAL", items: [{ cantidad: 0, precio: 50 }] };
    expect(calcularTotal(pedido)).toBe(0);
  });

  test("ignora ítems con precio negativo", () => {
    const pedido = { cliente: "NORMAL", items: [{ cantidad: 2, precio: -5 }] };
    expect(calcularTotal(pedido)).toBe(0);
  });

  test("aplica 5 % de descuento a clientes FRECUENTE", () => {
    const pedido = { cliente: "FRECUENTE", items: [{ cantidad: 2, precio: 10 }] };
    expect(calcularTotal(pedido)).toBe(19);
  });

  test("cliente NORMAL no recibe descuento", () => {
    const pedido = { cliente: "NORMAL", items: [{ cantidad: 2, precio: 10 }] };
    expect(calcularTotal(pedido)).toBe(20);
  });

  test("resta 5 con cupón", () => {
    const pedido = { cliente: "NORMAL", cupon: true, items: [{ cantidad: 2, precio: 10 }] };
    expect(calcularTotal(pedido)).toBe(15);
  });

  test("resta 5 cuando el total supera 100", () => {
    const pedido = { cliente: "NORMAL", items: [{ cantidad: 1, precio: 200 }] };
    expect(calcularTotal(pedido)).toBe(195);
  });

  test("suma varios ítems", () => {
    const pedido = {
      cliente: "NORMAL",
      items: [{ cantidad: 1, precio: 10 }, { cantidad: 3, precio: 5 }]
    };
    expect(calcularTotal(pedido)).toBe(25);
  });

  test("pedido sin ítems da 0", () => {
    expect(calcularTotal({ cliente: "VIP", items: [] })).toBe(0);
  });
});

describe("calcularTotalTienda", () => {
  test("VIP recibe 10 % y no se resta cupón", () => {
    const pedido = { cliente: "VIP", cupon: true, items: [{ cantidad: 1, precio: 200 }] };
    expect(calcularTotalTienda(pedido)).toBe(180);
  });

  test("FRECUENTE recibe 5 %", () => {
    const pedido = { cliente: "FRECUENTE", items: [{ cantidad: 2, precio: 10 }] };
    expect(calcularTotalTienda(pedido)).toBe(19);
  });

  test("cliente NORMAL sin descuento", () => {
    const pedido = { cliente: "NORMAL", items: [{ cantidad: 3, precio: 10 }] };
    expect(calcularTotalTienda(pedido)).toBe(30);
  });

  test("ignora ítems inválidos", () => {
    const pedido = { cliente: "NORMAL", items: [{ cantidad: 0, precio: 10 }, { cantidad: 2, precio: 0 }] };
    expect(calcularTotalTienda(pedido)).toBe(0);
  });
});
