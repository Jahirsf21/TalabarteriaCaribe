import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Search, ChevronLeft, ChevronRight, X, UserPlus } from "lucide-react"
import { clientes } from "@/data"
import type { Cliente } from "@/data"

interface ClienteSelectorProps {
  clienteSeleccionado: Cliente | null
  onClienteSelect: (cliente: Cliente) => void
  onClienteChange: () => void
}

const ITEMS_POR_PAGINA = 10

export function ClienteSelector({ clienteSeleccionado, onClienteSelect, onClienteChange }: ClienteSelectorProps) {
  const [busqueda, setBusqueda] = useState("")
  const [pagina, setPagina] = useState(1)
  const [modoNuevoCliente, setModoNuevoCliente] = useState(false)
  const [nuevoCliente, setNuevoCliente] = useState<Partial<Cliente>>({
    tipo: "minorista",
    nombre: "",
    cedula: "",
    telefono: "",
    correo: "",
    direccion: "",
    empresa: "",
    cedulaJuridica: "",
  })

  const clientesFiltrados = clientes.filter((c) => 
    c.activo && 
    (c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
     c.cedula.includes(busqueda) ||
     (c.empresa && c.empresa.toLowerCase().includes(busqueda.toLowerCase())))
  )

  const totalPaginas = Math.ceil(clientesFiltrados.length / ITEMS_POR_PAGINA)
  const clientesPaginados = clientesFiltrados.slice(
    (pagina - 1) * ITEMS_POR_PAGINA,
    pagina * ITEMS_POR_PAGINA
  )

  const handleSearch = (value: string) => {
    setBusqueda(value)
    setPagina(1)
  }

  const handleCrearCliente = () => {
    if (!nuevoCliente.nombre || !nuevoCliente.cedula || !nuevoCliente.telefono || !nuevoCliente.direccion) {
      alert("Por favor complete los campos obligatorios: nombre, cédula, teléfono y dirección")
      return
    }

    const cliente: Cliente = {
      id: Date.now(),
      tipo: nuevoCliente.tipo || "minorista",
      nombre: nuevoCliente.nombre,
      cedula: nuevoCliente.cedula,
      telefono: nuevoCliente.telefono,
      correo: nuevoCliente.correo || null,
      direccion: nuevoCliente.direccion,
      empresa: nuevoCliente.empresa,
      cedulaJuridica: nuevoCliente.cedulaJuridica,
      totalComprado: 0,
      activo: true,
      creadoEn: new Date().toISOString(),
    }

    onClienteSelect(cliente)
  }

  if (clienteSeleccionado) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center justify-between" style={{ color: "var(--foreground)" }}>
            1. Cliente Seleccionado
            <Button variant="ghost" size="sm" onClick={onClienteChange}>
              <X className="h-4 w-4" />
            </Button>
          </CardTitle>
          <CardDescription className="text-xs">
            Cliente para este pedido
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border p-4 bg-primary/5" style={{ borderColor: "var(--primary)" }}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="font-medium text-sm" style={{ color: "var(--foreground)" }}>
                  {clienteSeleccionado.nombre}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {clienteSeleccionado.cedula}
                </p>
                <p className="text-xs text-muted-foreground">
                  {clienteSeleccionado.telefono}
                </p>
                {clienteSeleccionado.empresa && (
                  <p className="text-xs text-muted-foreground">
                    {clienteSeleccionado.empresa}
                  </p>
                )}
              </div>
              <Badge variant="default" className="text-xs shrink-0">
                Seleccionado
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base" style={{ color: "var(--foreground)" }}>
          1. Seleccionar Cliente
        </CardTitle>
        <CardDescription className="text-xs">
          Elija el cliente para este pedido
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Mode toggle */}
        <div className="flex gap-2">
          <Button
            variant={!modoNuevoCliente ? "default" : "outline"}
            size="default"
            onClick={() => setModoNuevoCliente(false)}
            className="flex-1 h-10"
          >
            <Search className="h-4 w-4 mr-2" />
            Buscar Cliente
          </Button>
          <Button
            variant={modoNuevoCliente ? "default" : "outline"}
            size="default"
            onClick={() => setModoNuevoCliente(true)}
            className="flex-1 h-10"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Cliente Nuevo
          </Button>
        </div>

        {!modoNuevoCliente ? (
          <>
            {/* Search input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, cédula o empresa..."
                value={busqueda}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-9 h-10"
              />
            </div>
        
        {/* Clients table - Responsive */}
        <div className="rounded-lg border" style={{ borderColor: "var(--border)" }}>
          {busqueda.trim() === "" ? (
            <div className="text-center py-8 text-muted-foreground text-sm">
              Ingrese un término de búsqueda para encontrar clientes
            </div>
          ) : (
            <>
              {/* Mobile: Card layout */}
              <div className="md:hidden space-y-2">
                {clientesPaginados.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    No se encontraron clientes
                  </div>
                ) : (
                  clientesPaginados.map((cliente) => (
                    <div
                      key={cliente.id}
                      className="rounded-lg border p-3 space-y-2"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate" style={{ color: "var(--foreground)" }}>
                            {cliente.nombre}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {cliente.tipo === "corporativo" ? cliente.empresa : cliente.cedula}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs shrink-0">
                          {cliente.tipo === "corporativo" ? "Corp" : "Minor"}
                        </Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onClienteSelect(cliente)}
                        className="w-full"
                      >
                        Seleccionar
                      </Button>
                    </div>
                  ))
                )}
              </div>

              {/* Desktop: Table layout */}
              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs whitespace-nowrap">Nombre</TableHead>
                      <TableHead className="text-xs whitespace-nowrap">Cédula/Empresa</TableHead>
                      <TableHead className="text-xs whitespace-nowrap">Tipo</TableHead>
                      <TableHead className="text-xs text-right whitespace-nowrap">Acción</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clientesPaginados.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-sm text-muted-foreground py-8">
                          No se encontraron clientes
                        </TableCell>
                      </TableRow>
                    ) : (
                      clientesPaginados.map((cliente) => (
                        <TableRow key={cliente.id}>
                          <TableCell className="text-sm font-medium">
                            {cliente.nombre}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {cliente.tipo === "corporativo" ? cliente.empresa : cliente.cedula}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">
                              {cliente.tipo === "corporativo" ? "Corp" : "Minor"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onClienteSelect(cliente)}
                              className="shrink-0"
                            >
                              Seleccionar
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </div>
        
            {/* Pagination */}
            {busqueda.trim() !== "" && totalPaginas > 1 && (
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  {(pagina - 1) * ITEMS_POR_PAGINA + 1} - {Math.min(pagina * ITEMS_POR_PAGINA, clientesFiltrados.length)} de {clientesFiltrados.length}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setPagina(pagina - 1)}
                    disabled={pagina === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm">
                    {pagina} de {totalPaginas}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setPagina(pagina + 1)}
                    disabled={pagina === totalPaginas}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Nuevo Cliente Form */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs">Tipo de Cliente *</Label>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={nuevoCliente.tipo === "minorista" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNuevoCliente({ ...nuevoCliente, tipo: "minorista" })}
                      className="flex-1 h-10"
                    >
                      Minorista
                    </Button>
                    <Button
                      type="button"
                      variant={nuevoCliente.tipo === "corporativo" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNuevoCliente({ ...nuevoCliente, tipo: "corporativo" })}
                      className="flex-1 h-10"
                    >
                      Corporativo
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs">Nombre Completo *</Label>
                  <Input
                    placeholder="Nombre del cliente"
                    value={nuevoCliente.nombre || ""}
                    onChange={(e) => setNuevoCliente({ ...nuevoCliente, nombre: e.target.value })}
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Cédula *</Label>
                  <Input
                    placeholder="0-0000-0000"
                    value={nuevoCliente.cedula || ""}
                    onChange={(e) => setNuevoCliente({ ...nuevoCliente, cedula: e.target.value })}
                    className="text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs">Teléfono *</Label>
                  <Input
                    placeholder="0000-0000"
                    value={nuevoCliente.telefono || ""}
                    onChange={(e) => setNuevoCliente({ ...nuevoCliente, telefono: e.target.value })}
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Correo Electrónico</Label>
                  <Input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={nuevoCliente.correo || ""}
                    onChange={(e) => setNuevoCliente({ ...nuevoCliente, correo: e.target.value })}
                    className="text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Dirección *</Label>
                <Input
                  placeholder="Dirección completa"
                  value={nuevoCliente.direccion || ""}
                  onChange={(e) => setNuevoCliente({ ...nuevoCliente, direccion: e.target.value })}
                  className="text-sm"
                />
              </div>

              {nuevoCliente.tipo === "corporativo" && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs">Empresa</Label>
                      <Input
                        placeholder="Nombre de la empresa"
                        value={nuevoCliente.empresa || ""}
                        onChange={(e) => setNuevoCliente({ ...nuevoCliente, empresa: e.target.value })}
                        className="text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Cédula Jurídica</Label>
                      <Input
                        placeholder="3-000-000000"
                        value={nuevoCliente.cedulaJuridica || ""}
                        onChange={(e) => setNuevoCliente({ ...nuevoCliente, cedulaJuridica: e.target.value })}
                        className="text-sm"
                      />
                    </div>
                  </div>
                </>
              )}

              <Button
                onClick={handleCrearCliente}
                className="w-full"
                size="lg"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Crear y Seleccionar Cliente
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
