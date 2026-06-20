export type EstadoPedido = "pendiente" | "en_produccion" | "listo" | "entregado" | "cancelado"

export interface PagoPedido {
  monto: number
  metodoPago: "efectivo" | "sinpe"
  referenciaSinpe?: string
  fecha: string
}

export interface CambioPedido {
  estadoAnterior: EstadoPedido
  estadoNuevo: EstadoPedido
  fecha: string
}

export interface Pedido {
  id: number
  clienteId: number
  nombreCliente: string
  descripcion: string
  dimensiones?: string
  materiales?: string
  subtotal: number
  iva: number
  precioTotal: number
  pagos: PagoPedido[]
  saldoPendiente: number
  estado: EstadoPedido
  historialEstados: CambioPedido[]
  fechaEntregaEstimada: string
  fechaEntregaReal?: string
  notas?: string
  cotizacionOrigenId?: number
  creadoEn: string
}

export const pedidos: Pedido[] = [
  {
    id: 1,
    clienteId: 2,
    nombreCliente: "María Fernández Quesada",
    descripcion: "Bolso grande de cuero negro con diseño floral repujado, asa larga, cierre dorado y bolsillo interior con cremallera.",
    dimensiones: "35cm x 25cm x 12cm",
    materiales: "Cuero vacuno negro, herrajes dorados",
    subtotal: 75000,
    iva: 9750,
    precioTotal: 84750,
    pagos: [
      { monto: 30000, metodoPago: "sinpe", referenciaSinpe: "SINPE-20260520-003", fecha: "2026-05-20T10:00:00Z" },
    ],
    saldoPendiente: 54750,
    estado: "en_produccion",
    historialEstados: [
      { estadoAnterior: "pendiente", estadoNuevo: "en_produccion", fecha: "2026-05-22T09:00:00Z" },
    ],
    fechaEntregaEstimada: "2026-06-20T00:00:00Z",
    creadoEn: "2026-05-20T10:00:00Z",
  },
  {
    id: 2,
    clienteId: 3,
    nombreCliente: "Finca Rancho Sol S.A.",
    descripcion: "3 riendas para caballo de trabajo pesado, cuero curtido doble, costuras reforzadas con hilo encerado, color café oscuro.",
    dimensiones: "1.8 metros cada una",
    materiales: "Cuero vacuno doble curtido café, hilo encerado negro grueso",
    subtotal: 84000,
    iva: 10920,
    precioTotal: 94920,
    pagos: [
      { monto: 40000, metodoPago: "efectivo", fecha: "2026-05-15T08:00:00Z" },
      { monto: 44000, metodoPago: "efectivo", fecha: "2026-06-10T09:00:00Z" },
    ],
    saldoPendiente: 10920,
    estado: "entregado",
    historialEstados: [
      { estadoAnterior: "pendiente", estadoNuevo: "en_produccion", fecha: "2026-05-16T09:00:00Z" },
      { estadoAnterior: "en_produccion", estadoNuevo: "listo", fecha: "2026-06-05T14:00:00Z" },
      { estadoAnterior: "listo", estadoNuevo: "entregado", fecha: "2026-06-10T09:00:00Z" },
    ],
    fechaEntregaEstimada: "2026-06-10T00:00:00Z",
    fechaEntregaReal: "2026-06-10T09:00:00Z",
    creadoEn: "2026-05-15T08:00:00Z",
  },
  {
    id: 3,
    clienteId: 6,
    nombreCliente: "Sofía Castillo Ureña",
    descripcion: "Cartera pequeña de cuero miel con monograma bordado 'SC', cierre magnético y cadena desmontable.",
    materiales: "Cuero miel, cadena metálica dorada",
    subtotal: 42000,
    iva: 5460,
    precioTotal: 47460,
    pagos: [
      { monto: 20000, metodoPago: "sinpe", referenciaSinpe: "SINPE-20260601-004", fecha: "2026-06-01T15:00:00Z" },
    ],
    saldoPendiente: 27460,
    estado: "pendiente",
    historialEstados: [],
    fechaEntregaEstimada: "2026-07-05T00:00:00Z",
    notas: "El monograma debe ser en color dorado, letras cursivas.",
    creadoEn: "2026-06-01T15:00:00Z",
  },
  {
    id: 4,
    clienteId: 7,
    nombreCliente: "Luis Méndez Pérez",
    descripcion: "Cinturón extra ancho para trabajo, hebilla de acero doble pasador, 5cm de ancho, color negro.",
    dimensiones: "Talla 36, 120cm largo",
    materiales: "Cuero negro grueso, hebilla acero inoxidable",
    subtotal: 22000,
    iva: 2860,
    precioTotal: 24860,
    pagos: [],
    saldoPendiente: 24860,
    estado: "listo",
    historialEstados: [
      { estadoAnterior: "pendiente", estadoNuevo: "en_produccion", fecha: "2026-06-03T09:00:00Z" },
      { estadoAnterior: "en_produccion", estadoNuevo: "listo", fecha: "2026-06-12T14:00:00Z" },
    ],
    fechaEntregaEstimada: "2026-06-15T00:00:00Z",
    notas: "Cliente pagará al retirar.",
    creadoEn: "2026-06-02T10:00:00Z",
  },
  {
    id: 5,
    clienteId: 1,
    nombreCliente: "Carlos Rodríguez Mora",
    descripcion: "Billetera con espacio para fotos y nombre grabado en relieve: 'Carlos R.'",
    materiales: "Cuero café claro",
    subtotal: 18000,
    iva: 2340,
    precioTotal: 20340,
    pagos: [
      { monto: 18000, metodoPago: "efectivo", fecha: "2026-06-08T10:00:00Z" },
    ],
    saldoPendiente: 2340,
    estado: "cancelado",
    historialEstados: [
      { estadoAnterior: "pendiente", estadoNuevo: "cancelado", fecha: "2026-06-09T11:00:00Z" },
    ],
    fechaEntregaEstimada: "2026-06-25T00:00:00Z",
    notas: "Cancelado por el cliente. Reembolso pendiente.",
    creadoEn: "2026-06-08T10:00:00Z",
  },
]
