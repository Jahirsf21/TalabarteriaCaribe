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
import { Search, ChevronLeft, ChevronRight, Plus, X } from "lucide-react"
import { materiales } from "@/data/materiales"
import type { Material } from "@/data/materiales"

interface MaterialPedido {
  material: Material
  cantidad: number
}

interface MaterialesSelectorProps {
  materialesSeleccionados: MaterialPedido[]
  onAgregarMaterial: (material: Material, cantidad: number) => void
  onEliminarMaterial: (materialId: number) => void
  disabled: boolean
}

const ITEMS_POR_PAGINA = 10

export function MaterialesSelector({
  materialesSeleccionados,
  onAgregarMaterial,
  onEliminarMaterial,
  disabled,
}: MaterialesSelectorProps) {
  const [busqueda, setBusqueda] = useState("")
  const [pagina, setPagina] = useState(1)
  const [materialSeleccionado, setMaterialSeleccionado] = useState<Material | null>(null)
  const [cantidad, setCantidad] = useState(1)

  const materialesDisponibles = materiales.filter((m) => m.activo && m.stock > 0)
  const materialesFiltrados = materialesDisponibles.filter((m) =>
    m.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  const totalPaginas = Math.ceil(materialesFiltrados.length / ITEMS_POR_PAGINA)
  const materialesPaginados = materialesFiltrados.slice(
    (pagina - 1) * ITEMS_POR_PAGINA,
    pagina * ITEMS_POR_PAGINA
  )

  const handleSearch = (value: string) => {
    setBusqueda(value)
    setPagina(1)
  }

  const handleAgregar = () => {
    if (!materialSeleccionado || cantidad <= 0) return
    onAgregarMaterial(materialSeleccionado, cantidad)
    setMaterialSeleccionado(null)
    setCantidad(1)
  }

  const formatStock = (stock: number): string => {
    return stock % 1 === 0 ? stock.toString() : stock.toFixed(1)
  }

  if (materialSeleccionado) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center justify-between" style={{ color: "var(--foreground)" }}>
            Materiales
            <Button variant="ghost" size="sm" onClick={() => setMaterialSeleccionado(null)}>
              <X className="h-4 w-4" />
            </Button>
          </CardTitle>
          <CardDescription className="text-xs">
            Configure la cantidad para agregar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border p-4 bg-primary/5" style={{ borderColor: "var(--primary)" }}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <p className="font-medium text-sm" style={{ color: "var(--foreground)" }}>
                  {materialSeleccionado.nombre}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Stock: {formatStock(materialSeleccionado.stock)} {materialSeleccionado.unidad}
                </p>
                <Badge 
                  variant={materialSeleccionado.estadoStock === "bajo" ? "destructive" : "secondary"} 
                  className="text-xs mt-1"
                >
                  {materialSeleccionado.estadoStock}
                </Badge>
              </div>
              <Badge variant="default" className="text-xs shrink-0">
                Seleccionado
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                Cantidad:
              </label>
              <div className="flex items-center gap-2 flex-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setCantidad(Math.max(0.1, cantidad - 0.1))}
                >
                  <Plus className="h-3 w-3 rotate-45" />
                </Button>
                <Input
                  type="number"
                  min="0.1"
                  step="0.1"
                  max={materialSeleccionado.stock}
                  value={cantidad}
                  onChange={(e) => setCantidad(parseFloat(e.target.value) || 0.1)}
                  className="text-center"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setCantidad(Math.min(materialSeleccionado.stock, cantidad + 0.1))}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <Button
                onClick={handleAgregar}
                disabled={cantidad <= 0}
                className="shrink-0"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar
              </Button>
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
          Materiales
        </CardTitle>
        <CardDescription className="text-xs">
          Seleccione materiales para el pedido
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Selected materials list */}
        {materialesSeleccionados.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Materiales seleccionados:</p>
            <div className="space-y-2">
              {materialesSeleccionados.map((item) => (
                <div
                  key={item.material.id}
                  className="flex items-center justify-between rounded-lg border p-2"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate" style={{ color: "var(--foreground)" }}>
                      {item.material.nombre}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatStock(item.cantidad)} {item.material.unidad}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => onEliminarMaterial(item.material.id)}
                      disabled={disabled}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar material..."
            value={busqueda}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-9"
            disabled={disabled}
          />
        </div>
        
        {/* Materials table - Responsive */}
        <div className="rounded-lg border" style={{ borderColor: "var(--border)" }}>
          {/* Mobile: Card layout */}
          <div className="md:hidden space-y-2">
            {materialesPaginados.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No se encontraron materiales
              </div>
            ) : (
              materialesPaginados.map((material) => (
                <div
                  key={material.id}
                  className="rounded-lg border p-3 space-y-2"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate" style={{ color: "var(--foreground)" }}>
                        {material.nombre}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Stock: {formatStock(material.stock)} {material.unidad}
                      </p>
                    </div>
                    <Badge 
                      variant={material.estadoStock === "bajo" ? "destructive" : "secondary"} 
                      className="text-xs shrink-0"
                    >
                      {material.estadoStock}
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setMaterialSeleccionado(material)}
                    disabled={disabled}
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
                  <TableHead className="text-xs whitespace-nowrap">Material</TableHead>
                  <TableHead className="text-xs whitespace-nowrap">Unidad</TableHead>
                  <TableHead className="text-xs text-right whitespace-nowrap">Stock</TableHead>
                  <TableHead className="text-xs text-center whitespace-nowrap">Estado</TableHead>
                  <TableHead className="text-xs text-right whitespace-nowrap">Acción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {materialesPaginados.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-sm text-muted-foreground py-8">
                      No se encontraron materiales
                    </TableCell>
                  </TableRow>
                ) : (
                  materialesPaginados.map((material) => (
                    <TableRow key={material.id}>
                      <TableCell className="text-sm font-medium">
                        {material.nombre}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {material.unidad}
                      </TableCell>
                      <TableCell className="text-sm text-right font-medium whitespace-nowrap">
                        {formatStock(material.stock)}
                      </TableCell>
                      <TableCell className="text-sm text-center">
                        <Badge 
                          variant={material.estadoStock === "bajo" ? "destructive" : "secondary"} 
                          className="text-xs"
                        >
                          {material.estadoStock}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setMaterialSeleccionado(material)}
                          disabled={disabled}
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
              {(pagina - 1) * ITEMS_POR_PAGINA + 1} - {Math.min(pagina * ITEMS_POR_PAGINA, materialesFiltrados.length)} de {materialesFiltrados.length}
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
