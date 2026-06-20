export type EstadoCotizacion = "borrador" | "enviada" | "aceptada" | "vencida"

export interface ItemCotizacion {
  productoId: number
  nombreProducto: string
  cantidad: number
  precioUnitario: number
  subtotal: number
}

export interface Cotizacion {
  id: number
  clienteId: number
  nombreCliente: string
  telefonoCliente: string
  correoCliente: string | null
  items: ItemCotizacion[]
  subtotal: number
  iva: number
  montoTotal: number
  validezDias: number
  estado: EstadoCotizacion
  creadoEn: string
  notas?: string
}

export const cotizaciones: Cotizacion[] = [
  {
    id: 1,
    clienteId: 3,
    nombreCliente: "Finca Rancho Sol S.A.",
    telefonoCliente: "8934-5678",
    correoCliente: "jorge@fincaranchosol.cr",
    items: [
      { productoId: 5, nombreProducto: "Montura de trabajo clásica", cantidad: 2, precioUnitario: 120000, subtotal: 240000 },
      { productoId: 6, nombreProducto: "Riendas de cuero reforzadas", cantidad: 4, precioUnitario: 15000, subtotal: 60000 },
    ],
    subtotal: 300000,
    iva: 39000,
    montoTotal: 339000,
    validezDias: 15,
    estado: "aceptada",
    creadoEn: "2026-06-05T09:00:00Z",
    notas: "Aceptado el 10 de junio. Pendiente de programar producción.",
  },
  {
    id: 2,
    clienteId: 5,
    nombreCliente: "Asociación de Ganaderos de Limón",
    telefonoCliente: "2798-1234",
    correoCliente: "ganaderoslimon@gmail.com",
    items: [
      { productoId: 1, nombreProducto: "Cinturón de cuero trenzado", cantidad: 20, precioUnitario: 13500, subtotal: 270000 },
    ],
    subtotal: 270000,
    iva: 35100,
    montoTotal: 305100,
    validezDias: 30,
    estado: "enviada",
    creadoEn: "2026-06-12T14:30:00Z",
    notas: "Enviado por correo electrónico y WhatsApp al presidente de la asociación.",
  },
  {
    id: 3,
    clienteId: 1,
    nombreCliente: "Carlos Rodríguez Mora",
    telefonoCliente: "8812-3456",
    correoCliente: "carlos.rodriguez@gmail.com",
    items: [
      { productoId: 3, nombreProducto: "Bolso de mano artesanal", cantidad: 1, precioUnitario: 45000, subtotal: 45000 },
      { productoId: 2, nombreProducto: "Billetera de cuero liso", cantidad: 1, precioUnitario: 12000, subtotal: 12000 },
    ],
    subtotal: 57000,
    iva: 7410,
    montoTotal: 64410,
    validezDias: 15,
    estado: "borrador",
    creadoEn: "2026-06-18T10:00:00Z",
    notas: "Cliente cotizando regalos de fin de año.",
  },
  {
    id: 4,
    clienteId: 2,
    nombreCliente: "María Fernández Quesada",
    telefonoCliente: "6623-4567",
    correoCliente: null,
    items: [
      { productoId: 7, nombreProducto: "Pechera de gala repujada", cantidad: 1, precioUnitario: 95000, subtotal: 95000 },
    ],
    subtotal: 95000,
    iva: 12350,
    montoTotal: 107350,
    validezDias: 7,
    estado: "vencida",
    creadoEn: "2026-05-10T11:00:00Z",
    notas: "Venció el 17 de mayo de 2026 sin confirmación.",
  },
]
