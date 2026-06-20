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
  subtotal: number
  iva: number
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
    subtotal: 40000,
    iva: 5200,
    total: 45200,
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
    subtotal: 45000,
    iva: 5850,
    total: 50850,
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
    subtotal: 12000,
    iva: 1560,
    total: 13560,
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
    subtotal: 184000,
    iva: 23920,
    total: 207920,
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
    subtotal: 38000,
    iva: 4940,
    total: 42940,
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
    subtotal: 80000,
    iva: 10400,
    total: 90400,
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
    subtotal: 84000,
    iva: 10920,
    total: 94920,
    metodoPago: "credito",
    estado: "completada",
    pedidoOrigenId: 2,
    fecha: "2026-06-10T09:00:00Z",
  },
]
