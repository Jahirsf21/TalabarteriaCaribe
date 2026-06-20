export const dashboardStats = {
  ventasHoy: {
    total: 97000,
    cantidad: 3,
  },
  ventasMesActual: {
    total: 483000,
    cantidad: 7,
    comparacionMesAnterior: +12.4, // porcentaje de cambio
  },
  pedidosActivos: 3, // pendiente + en_produccion + listo
  pedidosVencidos: 1, // con fecha estimada pasada y sin entregar
  alertasStockBajo: 5, // ítems por debajo del mínimo
  deudaProveedoresPendiente: 63500,
  promedioVenta: 69000,
}

// Mock: Movimientos de inventario recientes
export interface MovimientoInventario {
  id: number
  itemId: number
  tipoItem: "producto" | "materia_prima"
  nombreItem: string
  tipo: "entrada" | "salida" | "ajuste"
  cantidad: number
  motivo: string
  usuario: string
  saldoResultante: number
  fecha: string
}

export const movimientosInventario: MovimientoInventario[] = [
  {
    id: 1,
    itemId: 1,
    tipoItem: "materia_prima",
    nombreItem: "Cuero vacuno curtido café",
    tipo: "entrada",
    cantidad: 5,
    motivo: "Compra a proveedor Cueros del Atlántico",
    usuario: "Hellen Caribe",
    saldoResultante: 15.5,
    fecha: "2026-06-01T08:30:00Z",
  },
  {
    id: 2,
    itemId: 5,
    tipoItem: "producto",
    nombreItem: "Rienda para caballo",
    tipo: "salida",
    cantidad: 3,
    motivo: "Venta #7 - Finca Rancho Sol",
    usuario: "Hellen Caribe",
    saldoResultante: 7,
    fecha: "2026-06-10T09:05:00Z",
  },
  {
    id: 3,
    itemId: 8,
    tipoItem: "materia_prima",
    nombreItem: "Cremalleras metálicas 20cm",
    tipo: "salida",
    cantidad: 3,
    motivo: "Producción - Pedido #1 (bolso María Fernández)",
    usuario: "Hellen Caribe",
    saldoResultante: 0,
    fecha: "2026-06-11T10:00:00Z",
  },
  {
    id: 4,
    itemId: 2,
    tipoItem: "materia_prima",
    nombreItem: "Cuero vacuno curtido negro",
    tipo: "ajuste",
    cantidad: -0.8,
    motivo: "Ajuste por merma en corte de pedido #4",
    usuario: "Hellen Caribe",
    saldoResultante: 4.2,
    fecha: "2026-06-12T14:00:00Z",
  },
]

// Mock: Log de auditoría de operaciones
export interface RegistroAuditoria {
  id: number
  usuario: string
  modulo: string
  accion: string
  descripcion: string
  fecha: string
}

export const logAuditoria: RegistroAuditoria[] = [
  {
    id: 1,
    usuario: "Hellen Caribe",
    modulo: "Ventas",
    accion: "Crear",
    descripcion: "Registró venta #7 por ₡84.000 a Finca Rancho Sol S.A.",
    fecha: "2026-06-10T09:00:00Z",
  },
  {
    id: 2,
    usuario: "Hellen Caribe",
    modulo: "Inventario",
    accion: "Salida",
    descripcion: "Registró salida de 3 unidades de Rienda para caballo por venta #7",
    fecha: "2026-06-10T09:05:00Z",
  },
  {
    id: 3,
    usuario: "Hellen Caribe",
    modulo: "Pedidos",
    accion: "Cambio de estado",
    descripcion: "Pedido #4 cambió de 'En producción' a 'Listo'",
    fecha: "2026-06-12T14:00:00Z",
  },
  {
    id: 4,
    usuario: "Hellen Caribe",
    modulo: "Inventario",
    accion: "Ajuste",
    descripcion: "Ajuste de -0.8 metros en Cuero vacuno negro por merma en producción",
    fecha: "2026-06-12T14:00:00Z",
  },
  {
    id: 5,
    usuario: "Hellen Caribe",
    modulo: "Pedidos",
    accion: "Cancelar",
    descripcion: "Pedido #5 cancelado por solicitud del cliente Carlos Rodríguez",
    fecha: "2026-06-09T11:00:00Z",
  },
  {
    id: 6,
    usuario: "Hellen Caribe",
    modulo: "Clientes",
    accion: "Crear",
    descripcion: "Registró nuevo cliente: Sofía Castillo Ureña (minorista)",
    fecha: "2026-06-01T15:00:00Z",
  },
]