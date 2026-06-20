export interface Proveedor {
  id: number
  nombre: string
  telefono: string
  correo: string | null
  direccion: string
  materialesQueProvee: string[] // ids o nombres de materias primas
  condicionesPago: string
  deudaPendiente: number // colones
  activo: boolean
  creadoEn: string
}

export const proveedores: Proveedor[] = [
  {
    id: 1,
    nombre: "Cueros del Atlántico S.A.",
    telefono: "2758-1234",
    correo: "ventas@cuerosatlantico.cr",
    direccion: "San José, La Uruca, 100m norte del puente",
    materialesQueProvee: ["Cuero vacuno curtido café", "Cuero vacuno curtido negro"],
    condicionesPago: "Contado o 15 días plazo",
    deudaPendiente: 48000,
    activo: true,
    creadoEn: "2026-01-10T08:00:00Z",
  },
  {
    id: 2,
    nombre: "Ferretería y Mercería Caribe",
    telefono: "2798-5678",
    correo: null,
    direccion: "Limón Centro, mercado central, local 12",
    materialesQueProvee: [
      "Broches metálicos dorados",
      "Hebillas de acero inoxidable",
      "Cremalleras metálicas 20cm",
      "Remaches de cobre",
      "Hilo encerado grueso",
    ],
    condicionesPago: "Solo contado",
    deudaPendiente: 0,
    activo: true,
    creadoEn: "2026-01-10T08:00:00Z",
  },
  {
    id: 3,
    nombre: "Insumos Artesanales Mora",
    telefono: "8867-9012",
    correo: "mora.insumos@gmail.com",
    direccion: "Cartago, Paraíso, taller propio",
    materialesQueProvee: [
      "Tinte para cuero color miel",
      "Cera para acabado de cuero",
      "Pegamento para cuero",
    ],
    condicionesPago: "Transferencia SINPE anticipada",
    deudaPendiente: 15500,
    activo: true,
    creadoEn: "2026-01-20T09:00:00Z",
  },
]
