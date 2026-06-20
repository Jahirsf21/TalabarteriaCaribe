export type TipoDevolucion = "parcial" | "total"

export interface ItemDevolucion {
  productoId: number
  nombreProducto: string
  cantidadDevuelta: number
  precioUnitario: number
  subtotalDevuelto: number
}

export interface Devolucion {
  id: number
  ventaId: number
  tipo: TipoDevolucion
  motivo: string
  items: ItemDevolucion[]
  montoDevuelto: number
  fecha: string
}

export const devoluciones: Devolucion[] = [
  {
    id: 1,
    ventaId: 5,
    tipo: "parcial",
    motivo: "La cartera de cuero repujado presentaba defecto en el cierre magnético. El cliente conservó el producto dañado y se le reembolsó el importe.",
    items: [
      {
        productoId: 6,
        nombreProducto: "Cartera de cuero repujado",
        cantidadDevuelta: 1,
        precioUnitario: 38000,
        subtotalDevuelto: 38000,
      },
    ],
    montoDevuelto: 38000,
    fecha: "2026-05-18T10:30:00Z",
  },
]