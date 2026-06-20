export interface Usuario {
  id: number
  nombre: string
  usuario: string
  correo: string
  password: string
  rol: "administradora"
  activo: boolean
  creadoEn: string
}

export const usuarios: Usuario[] = [
  {
    id: 1,
    nombre: "Hellen Caribe",
    usuario: "Hellen",
    correo: "hellen@talabateriacaribe.cr",
    password: "admin1234", 
    rol: "administradora",
    activo: true,
    creadoEn: "2026-01-10T08:00:00Z",
  },
]
