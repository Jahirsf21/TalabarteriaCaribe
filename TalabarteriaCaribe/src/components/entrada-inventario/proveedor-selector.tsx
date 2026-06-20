import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Search, ChevronLeft, ChevronRight, X } from "lucide-react"
import { proveedores } from "@/data/proveedores"
import type { Proveedor } from "@/data/proveedores"

interface ProveedorSelectorProps {
  proveedorSeleccionado: Proveedor | null
  onProveedorSelect: (proveedor: Proveedor) => void
  onProveedorChange: () => void
}

const ITEMS_POR_PAGINA = 10

export function ProveedorSelector({ proveedorSeleccionado, onProveedorSelect, onProveedorChange }: ProveedorSelectorProps) {
  const [busqueda, setBusqueda] = useState("")
  const [pagina, setPagina] = useState(1)

  const proveedoresFiltrados = proveedores.filter((p) => 
    p.activo && 
    (p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
     p.telefono.includes(busqueda))
  )

  const totalPaginas = Math.ceil(proveedoresFiltrados.length / ITEMS_POR_PAGINA)
  const proveedoresPaginados = proveedoresFiltrados.slice(
    (pagina - 1) * ITEMS_POR_PAGINA,
    pagina * ITEMS_POR_PAGINA
  )

  const handleSearch = (value: string) => {
    setBusqueda(value)
    setPagina(1)
  }

  const formatCurrency = (amount: number): string => {
    return `₡${amount.toLocaleString("es-CR")}`
  }

  if (proveedorSeleccionado) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center justify-between" style={{ color: "var(--foreground)" }}>
            1. Proveedor Seleccionado
            <Button variant="ghost" size="sm" onClick={onProveedorChange}>
              <X className="h-4 w-4" />
            </Button>
          </CardTitle>
          <CardDescription className="text-xs">
            Proveedor para esta entrada
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border p-4 bg-primary/5" style={{ borderColor: "var(--primary)" }}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="font-medium text-sm" style={{ color: "var(--foreground)" }}>
                  {proveedorSeleccionado.nombre}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {proveedorSeleccionado.telefono}
                </p>
                <p className="text-xs text-muted-foreground">
                  {proveedorSeleccionado.direccion}
                </p>
                <p className="text-xs text-muted-foreground">
                  {proveedorSeleccionado.condicionesPago}
                </p>
                {proveedorSeleccionado.deudaPendiente > 0 && (
                  <p className="text-xs text-destructive mt-1">
                    Deuda pendiente: {formatCurrency(proveedorSeleccionado.deudaPendiente)}
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
          1. Seleccionar Proveedor
        </CardTitle>
        <CardDescription className="text-xs">
          Elija el proveedor para esta entrada
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o teléfono..."
            value={busqueda}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        
        {/* Suppliers table - Responsive */}
        <div className="rounded-lg border" style={{ borderColor: "var(--border)" }}>
          {/* Mobile: Card layout */}
          <div className="md:hidden space-y-2">
            {proveedoresPaginados.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No se encontraron proveedores
              </div>
            ) : (
              proveedoresPaginados.map((proveedor) => (
                <div
                  key={proveedor.id}
                  className="rounded-lg border p-3 space-y-2"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate" style={{ color: "var(--foreground)" }}>
                        {proveedor.nombre}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {proveedor.telefono}
                      </p>
                    </div>
                    {proveedor.deudaPendiente > 0 && (
                      <Badge variant="destructive" className="text-xs shrink-0">
                        Deuda
                      </Badge>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onProveedorSelect(proveedor)}
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
                  <TableHead className="text-xs whitespace-nowrap">Teléfono</TableHead>
                  <TableHead className="text-xs whitespace-nowrap">Dirección</TableHead>
                  <TableHead className="text-xs whitespace-nowrap">Condiciones</TableHead>
                  <TableHead className="text-xs text-right whitespace-nowrap">Deuda</TableHead>
                  <TableHead className="text-xs text-right whitespace-nowrap">Acción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {proveedoresPaginados.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-sm text-muted-foreground py-8">
                      No se encontraron proveedores
                    </TableCell>
                  </TableRow>
                ) : (
                  proveedoresPaginados.map((proveedor) => (
                    <TableRow key={proveedor.id}>
                      <TableCell className="text-sm font-medium">
                        {proveedor.nombre}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {proveedor.telefono}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {proveedor.direccion}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {proveedor.condicionesPago}
                      </TableCell>
                      <TableCell className="text-sm text-right">
                        {proveedor.deudaPendiente > 0 ? (
                          <span className="text-destructive">{formatCurrency(proveedor.deudaPendiente)}</span>
                        ) : (
                          <span className="text-muted-foreground">₡0</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onProveedorSelect(proveedor)}
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
        </div>
        
        {/* Pagination */}
        {totalPaginas > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              {(pagina - 1) * ITEMS_POR_PAGINA + 1} - {Math.min(pagina * ITEMS_POR_PAGINA, proveedoresFiltrados.length)} de {proveedoresFiltrados.length}
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
      </CardContent>
    </Card>
  )
}
