export type UnidadMedida = "metros" | "kilos" | "litros" | "unidades"
export type EstadoStock = "normal" | "bajo" | "agotado"

export interface Material {
  id: number
  nombre: string
  unidad: UnidadMedida
  stock: number
  stockMinimo: number
  estadoStock: EstadoStock
  proveedorId: number | null
  activo: boolean
  creadoEn: string
}

export const materiales: Material[] = [
  {
    id: 1,
    nombre: "Cuero vacuno curtido café",
    unidad: "metros",
    stock: 15.5,
    stockMinimo: 10,
    estadoStock: "normal",
    proveedorId: 1,
    activo: true,
    creadoEn: "2026-01-10T08:00:00Z",
  },
  {
    id: 2,
    nombre: "Cuero vacuno curtido negro",
    unidad: "metros",
    stock: 4.2,
    stockMinimo: 8,
    estadoStock: "bajo",
    proveedorId: 1,
    activo: true,
    creadoEn: "2026-01-10T08:00:00Z",
  },
  {
    id: 3,
    nombre: "Hilo encerado grueso",
    unidad: "metros",
    stock: 200,
    stockMinimo: 50,
    estadoStock: "normal",
    proveedorId: 2,
    activo: true,
    creadoEn: "2026-01-12T09:00:00Z",
  },
  {
    id: 4,
    nombre: "Broches metálicos dorados",
    unidad: "unidades",
    stock: 80,
    stockMinimo: 30,
    estadoStock: "normal",
    proveedorId: 2,
    activo: true,
    creadoEn: "2026-01-12T09:00:00Z",
  },
  {
    id: 5,
    nombre: "Hebillas de acero inoxidable",
    unidad: "unidades",
    stock: 15,
    stockMinimo: 20,
    estadoStock: "bajo",
    proveedorId: 2,
    activo: true,
    creadoEn: "2026-01-15T10:00:00Z",
  },
  {
    id: 6,
    nombre: "Tinte para cuero color miel",
    unidad: "litros",
    stock: 0.5,
    stockMinimo: 1,
    estadoStock: "bajo",
    proveedorId: 3,
    activo: true,
    creadoEn: "2026-01-20T11:00:00Z",
  },
  {
    id: 7,
    nombre: "Cera para acabado de cuero",
    unidad: "kilos",
    stock: 2.3,
    stockMinimo: 1,
    estadoStock: "normal",
    proveedorId: 3,
    activo: true,
    creadoEn: "2026-01-20T11:00:00Z",
  },
  {
    id: 8,
    nombre: "Cremalleras metálicas 20cm",
    unidad: "unidades",
    stock: 0,
    stockMinimo: 15,
    estadoStock: "agotado",
    proveedorId: 2,
    activo: true,
    creadoEn: "2026-02-01T08:00:00Z",
  },
  {
    id: 9,
    nombre: "Remaches de cobre",
    unidad: "unidades",
    stock: 350,
    stockMinimo: 100,
    estadoStock: "normal",
    proveedorId: 2,
    activo: true,
    creadoEn: "2026-02-05T09:00:00Z",
  },
  {
    id: 10,
    nombre: "Pegamento para cuero",
    unidad: "litros",
    stock: 1.8,
    stockMinimo: 2,
    estadoStock: "bajo",
    proveedorId: 3,
    activo: true,
    creadoEn: "2026-02-10T10:00:00Z",
  },
]