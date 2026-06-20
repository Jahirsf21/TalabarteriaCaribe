export type MetodoPago = "efectivo" | "sinpe" | "credito"
export type EstadoVenta = "completada" | "con_devolucion"

export interface ItemVenta {
  productoId: number
  nombreProducto: string
  cantidad: number
  precioUnitario: number
  subtotal: number
}

export interface Venta {
  id: number
  clienteId: number | null // null = venta sin cliente registrado
  nombreCliente: string
  items: ItemVenta[]
  total: number
  metodoPago: MetodoPago
  referenciaSinpe?: string
  estado: EstadoVenta
  pedidoOrigenId?: number // si la venta viene de un pedido
  fecha: string
}

export const ventas: Venta[] = [
  {
    id: 1,
    clienteId: 1,
    nombreCliente: "Carlos Rodríguez Mora",
    items: [
      { productoId: 1, nombreProducto: "Cinturón de cuero trenzado", cantidad: 2, precioUnitario: 15000, subtotal: 30000 },
      { productoId: 4, nombreProducto: "Llavero personalizado", cantidad: 2, precioUnitario: 5000, subtotal: 10000 },
    ],
    total: 40000,
    metodoPago: "sinpe",
    referenciaSinpe: "SINPE-20260510-001",
    estado: "completada",
    fecha: "2026-05-10T10:30:00Z",
  },
  {
    id: 2,
    clienteId: 2,
    nombreCliente: "María Fernández Quesada",
    items: [
      { productoId: 3, nombreProducto: "Bolso de mano artesanal", cantidad: 1, precioUnitario: 45000, subtotal: 45000 },
    ],
    total: 45000,
    metodoPago: "efectivo",
    estado: "completada",
    fecha: "2026-05-12T14:00:00Z",
  },
  {
    id: 3,
    clienteId: null,
    nombreCliente: "Cliente sin registrar",
    items: [
      { productoId: 2, nombreProducto: "Billetera de cuero liso", cantidad: 1, precioUnitario: 12000, subtotal: 12000 },
    ],
    total: 12000,
    metodoPago: "efectivo",
    estado: "completada",
    fecha: "2026-05-14T09:15:00Z",
  },
  {
    id: 4,
    clienteId: 5,
    nombreCliente: "Roberto Núñez Vargas",
    items: [
      { productoId: 5, nombreProducto: "Rienda para caballo", cantidad: 5, precioUnitario: 28000, subtotal: 140000 },
      { productoId: 8, nombreProducto: "Porta documentos ejecutivo", cantidad: 2, precioUnitario: 22000, subtotal: 44000 },
    ],
    total: 184000,
    metodoPago: "credito",
    estado: "completada",
    fecha: "2026-05-15T11:00:00Z",
  },
  {
    id: 5,
    clienteId: 4,
    nombreCliente: "Ana Solís Brenes",
    items: [
      { productoId: 6, nombreProducto: "Cartera de cuero repujado", cantidad: 1, precioUnitario: 38000, subtotal: 38000 },
    ],
    total: 38000,
    metodoPago: "sinpe",
    referenciaSinpe: "SINPE-20260516-002",
    estado: "con_devolucion",
    fecha: "2026-05-16T16:30:00Z",
  },
  {
    id: 6,
    clienteId: 7,
    nombreCliente: "Luis Méndez Pérez",
    items: [
      { productoId: 7, nombreProducto: "Mochila de cuero pequeña", cantidad: 1, precioUnitario: 65000, subtotal: 65000 },
      { productoId: 1, nombreProducto: "Cinturón de cuero trenzado", cantidad: 1, precioUnitario: 15000, subtotal: 15000 },
    ],
    total: 80000,
    metodoPago: "efectivo",
    estado: "completada",
    fecha: "2026-06-02T10:00:00Z",
  },
  {
    id: 7,
    clienteId: 3,
    nombreCliente: "Finca Rancho Sol S.A.",
    items: [
      { productoId: 5, nombreProducto: "Rienda para caballo", cantidad: 3, precioUnitario: 28000, subtotal: 84000 },
    ],
    total: 84000,
    metodoPago: "credito",
    estado: "completada",
    pedidoOrigenId: 2,
    fecha: "2026-06-10T09:00:00Z",
  },
]
