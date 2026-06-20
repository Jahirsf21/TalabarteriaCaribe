export { productos } from "@/data/productos"
export type { Producto, EstadoStock as EstadoStockProducto } from "@/data/productos"

export { materiales } from "@/data/materiales"
export type { Material, UnidadMedida } from "@/data/materiales"

export { clientes } from "@/data/clientes"
export type { Cliente, TipoCliente } from "@/data/clientes"

export { proveedores } from "@/data/proveedores"
export type { Proveedor } from "@/data/proveedores"

export { ventas } from "@/data/ventas"
export type { Venta, ItemVenta, MetodoPago, EstadoVenta } from "@/data/ventas"

export { pedidos } from "@/data/pedidos"
export type { Pedido, PagoPedido, CambioPedido, EstadoPedido } from "@/data/pedidos"

export { dashboardStats, movimientosInventario, logAuditoria } from "@/data/dashboard"
export type { MovimientoInventario, RegistroAuditoria } from "@/data/dashboard"

export { cotizaciones } from "@/data/cotizaciones"
export type { Cotizacion, ItemCotizacion, EstadoCotizacion } from "@/data/cotizaciones"

export { devoluciones } from "@/data/devoluciones"
export type { Devolucion, ItemDevolucion, TipoDevolucion } from "@/data/devoluciones"