export type TipoCliente = "minorista" | "corporativo"

export interface Cliente {
  id: number
  tipo: TipoCliente
  nombre: string
  cedula: string
  telefono: string
  correo: string | null
  direccion: string
  empresa?: string
  cedulaJuridica?: string
  condicionesCredito?: string
  totalComprado: number // colones acumulado
  activo: boolean
  creadoEn: string
}

export const clientes: Cliente[] = [
  {
    id: 1,
    tipo: "minorista",
    nombre: "Carlos Rodríguez Mora",
    cedula: "1-1234-5678",
    telefono: "8812-3456",
    correo: "carlos.rodriguez@gmail.com",
    direccion: "Limón Centro, 200m norte del parque",
    totalComprado: 68000,
    activo: true,
    creadoEn: "2026-01-15T10:00:00Z",
  },
  {
    id: 2,
    tipo: "minorista",
    nombre: "María Fernández Quesada",
    cedula: "7-0987-6543",
    telefono: "6623-4567",
    correo: null,
    direccion: "Siquirres, frente a la escuela central",
    totalComprado: 127000,
    activo: true,
    creadoEn: "2026-01-20T11:00:00Z",
  },
  {
    id: 3,
    tipo: "corporativo",
    nombre: "Jorge Sequeira Obando",
    cedula: "3-0456-7890",
    telefono: "8934-5678",
    correo: "jorge@fincaranchosol.cr",
    direccion: "Guácimo, finca Rancho Sol, km 12",
    empresa: "Finca Rancho Sol S.A.",
    cedulaJuridica: "3-101-456789",
    condicionesCredito: "30 días plazo",
    totalComprado: 385000,
    activo: true,
    creadoEn: "2026-02-01T09:00:00Z",
  },
  {
    id: 4,
    tipo: "minorista",
    nombre: "Ana Solís Brenes",
    cedula: "5-0234-5678",
    telefono: "7745-6789",
    correo: "anasoliis@hotmail.com",
    direccion: "Matina, barrio Los Almendros",
    totalComprado: 45000,
    activo: true,
    creadoEn: "2026-02-10T10:30:00Z",
  },
  {
    id: 5,
    tipo: "corporativo",
    nombre: "Roberto Núñez Vargas",
    cedula: "2-0567-8901",
    telefono: "8856-7890",
    correo: "rnunez@tallerescaribe.com",
    direccion: "Limón, zona franca, bodega 4",
    empresa: "Talleres Caribe Industrial Ltda.",
    cedulaJuridica: "3-102-678901",
    condicionesCredito: "15 días plazo",
    totalComprado: 560000,
    activo: true,
    creadoEn: "2026-02-15T08:00:00Z",
  },
  {
    id: 6,
    tipo: "minorista",
    nombre: "Sofía Castillo Ureña",
    cedula: "6-0678-9012",
    telefono: "7034-5678",
    correo: null,
    direccion: "Pococí, La Rita, 300m sur de la iglesia",
    totalComprado: 22000,
    activo: true,
    creadoEn: "2026-03-01T09:15:00Z",
  },
  {
    id: 7,
    tipo: "minorista",
    nombre: "Luis Méndez Pérez",
    cedula: "4-0789-0123",
    telefono: "8923-4567",
    correo: "luismendez88@gmail.com",
    direccion: "Bataan, Limón",
    totalComprado: 93000,
    activo: true,
    creadoEn: "2026-03-05T11:00:00Z",
  },
]