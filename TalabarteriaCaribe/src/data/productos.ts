export type EstadoStock = "normal" | "bajo" | "agotado"

export interface Producto {
  id: number
  nombre: string
  descripcion: string
  precio: number // colones
  stock: number
  stockMinimo: number
  categoria: string
  imagen: string | null
  activo: boolean
  estadoStock: EstadoStock
  creadoEn: string
}

export const productos: Producto[] = [
  {
    id: 1,
    nombre: "Cinturón de cuero trenzado",
    descripcion: "Cinturón artesanal de cuero vacuno trenzado a mano, disponible en tallas S, M, L, XL.",
    precio: 15000,
    stock: 12,
    stockMinimo: 5,
    categoria: "Cinturones",
    imagen: null,
    activo: true,
    estadoStock: "normal",
    creadoEn: "2026-01-15T09:00:00Z",
  },
  {
    id: 2,
    nombre: "Billetera de cuero liso",
    descripcion: "Billetera delgada de cuero liso con 6 compartimentos para tarjetas y bolsillo central.",
    precio: 12000,
    stock: 3,
    stockMinimo: 5,
    categoria: "Billeteras",
    imagen: null,
    activo: true,
    estadoStock: "bajo",
    creadoEn: "2026-01-20T10:00:00Z",
  },
  {
    id: 3,
    nombre: "Bolso de mano artesanal",
    descripcion: "Bolso de cuero con costura a mano, asa corta y cierre metálico dorado.",
    precio: 45000,
    stock: 5,
    stockMinimo: 3,
    categoria: "Bolsos",
    imagen: null,
    activo: true,
    estadoStock: "normal",
    creadoEn: "2026-02-01T08:30:00Z",
  },
  {
    id: 4,
    nombre: "Llavero personalizado",
    descripcion: "Llavero de cuero con grabado de iniciales o nombre, colores disponibles: café, negro y miel.",
    precio: 5000,
    stock: 0,
    stockMinimo: 10,
    categoria: "Accesorios",
    imagen: null,
    activo: true,
    estadoStock: "agotado",
    creadoEn: "2026-02-10T11:00:00Z",
  },
  {
    id: 5,
    nombre: "Rienda para caballo",
    descripcion: "Rienda de cuero trenzado reforzado, longitud estándar 1.8m, resistente a la humedad.",
    precio: 28000,
    stock: 7,
    stockMinimo: 4,
    categoria: "Equitación",
    imagen: null,
    activo: true,
    estadoStock: "normal",
    creadoEn: "2026-02-15T09:45:00Z",
  },
  {
    id: 6,
    nombre: "Cartera de cuero repujado",
    descripcion: "Cartera con diseño repujado de flores tropicales, cierre con broche magnético.",
    precio: 38000,
    stock: 2,
    stockMinimo: 3,
    categoria: "Carteras",
    imagen: null,
    activo: true,
    estadoStock: "bajo",
    creadoEn: "2026-03-01T08:00:00Z",
  },
  {
    id: 7,
    nombre: "Mochila de cuero pequeña",
    descripcion: "Mochila artesanal de cuero genuino con dos compartimentos y correas ajustables.",
    precio: 65000,
    stock: 4,
    stockMinimo: 2,
    categoria: "Bolsos",
    imagen: null,
    activo: true,
    estadoStock: "normal",
    creadoEn: "2026-03-10T10:30:00Z",
  },
  {
    id: 8,
    nombre: "Porta documentos ejecutivo",
    descripcion: "Porta documentos de cuero liso en color negro, tamaño A4, con cierre cremallera.",
    precio: 22000,
    stock: 6,
    stockMinimo: 3,
    categoria: "Accesorios",
    imagen: null,
    activo: true,
    estadoStock: "normal",
    creadoEn: "2026-03-20T09:00:00Z",
  },
]