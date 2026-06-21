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
import { Search, ChevronLeft, ChevronRight, Plus, Minus, X } from "lucide-react"
import { productos } from "@/data"
import type { Producto } from "@/data"

interface ProductoSelectorProps {
  clienteSeleccionado: boolean
  productoSeleccionado: Producto | null
  onProductoSelect: (producto: Producto) => void
  onProductoDeselect: () => void
  onAgregar: (cantidad: number) => void
}

const ITEMS_POR_PAGINA = 10

export function ProductoSelector({ 
  clienteSeleccionado, 
  productoSeleccionado, 
  onProductoSelect,
  onProductoDeselect,
  onAgregar 
}: ProductoSelectorProps) {
  const [busqueda, setBusqueda] = useState("")
  const [pagina, setPagina] = useState(1)
  const [cantidad, setCantidad] = useState(1)

  const productosDisponibles = productos.filter((p) => p.activo && p.stock > 0)
  const productosFiltrados = productosDisponibles.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.categoria.toLowerCase().includes(busqueda.toLowerCase())
  )

  const totalPaginas = Math.ceil(productosFiltrados.length / ITEMS_POR_PAGINA)
  const productosPaginados = productosFiltrados.slice(
    (pagina - 1) * ITEMS_POR_PAGINA,
    pagina * ITEMS_POR_PAGINA
  )

  const handleSearch = (value: string) => {
    setBusqueda(value)
    setPagina(1)
  }

  const handleAgregar = () => {
    onAgregar(cantidad)
    setCantidad(1)
  }

  const formatCurrency = (amount: number): string => {
    return `₡${amount.toLocaleString("es-CR")}`
  }

  if (!clienteSeleccionado) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base" style={{ color: "var(--foreground)" }}>
            2. Agregar Productos
          </CardTitle>
          <CardDescription className="text-xs">
            Seleccione productos y cantidades para la venta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground text-sm">
            Seleccione un cliente primero
          </div>
        </CardContent>
      </Card>
    )
  }

  if (productoSeleccionado) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center justify-between" style={{ color: "var(--foreground)" }}>
            2. Producto Seleccionado
            <Button variant="ghost" size="sm" onClick={onProductoDeselect}>
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
                  {productoSeleccionado.nombre}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatCurrency(productoSeleccionado.precio)} c/u • Stock: {productoSeleccionado.stock}
                </p>
                <p className="text-xs text-muted-foreground">
                  {productoSeleccionado.categoria}
                </p>
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
                  onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <Input
                  type="text"
                  inputMode="numeric"
                  min="1"
                  max={productoSeleccionado.stock}
                  value={cantidad === 0 ? "" : cantidad}
                  onChange={(e) => {
                    const value = e.target.value
                    if (value === "") {
                      setCantidad(0)
                    } else {
                      const num = parseInt(value)
                      if (!isNaN(num) && num >= 0) {
                        setCantidad(num)
                      }
                    }
                  }}
                  className="text-center"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setCantidad(Math.min(productoSeleccionado.stock, cantidad + 1))}
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
          2. Agregar Productos
        </CardTitle>
        <CardDescription className="text-xs">
          Seleccione productos y cantidades para la venta
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o categoría..."
            value={busqueda}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        
        {/* Products table - Responsive */}
        <div className="rounded-lg border" style={{ borderColor: "var(--border)" }}>
          {/* Mobile: Card layout */}
          <div className="md:hidden space-y-2">
            {productosPaginados.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No se encontraron productos
              </div>
            ) : (
              productosPaginados.map((producto) => (
                <div
                  key={producto.id}
                  className="rounded-lg border p-3 space-y-2"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate" style={{ color: "var(--foreground)" }}>
                        {producto.nombre}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {producto.categoria}
                      </p>
                    </div>
                    <Badge variant={producto.stock <= producto.stockMinimo ? "destructive" : "secondary"} className="text-xs shrink-0">
                      {producto.stock}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                      {formatCurrency(producto.precio)}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onProductoSelect(producto)}
                      className="shrink-0"
                    >
                      Seleccionar
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Desktop: Table layout */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs whitespace-nowrap">Producto</TableHead>
                  <TableHead className="text-xs whitespace-nowrap">Categoría</TableHead>
                  <TableHead className="text-xs text-right whitespace-nowrap">Precio</TableHead>
                  <TableHead className="text-xs text-right whitespace-nowrap">Stock</TableHead>
                  <TableHead className="text-xs text-right whitespace-nowrap">Acción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productosPaginados.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-sm text-muted-foreground py-8">
                      No se encontraron productos
                    </TableCell>
                  </TableRow>
                ) : (
                  productosPaginados.map((producto) => (
                    <TableRow key={producto.id}>
                      <TableCell className="text-sm font-medium">
                        {producto.nombre}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {producto.categoria}
                      </TableCell>
                      <TableCell className="text-sm text-right font-medium whitespace-nowrap">
                        {formatCurrency(producto.precio)}
                      </TableCell>
                      <TableCell className="text-sm text-right">
                        <Badge variant={producto.stock <= producto.stockMinimo ? "destructive" : "secondary"} className="text-xs">
                          {producto.stock}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onProductoSelect(producto)}
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
              {(pagina - 1) * ITEMS_POR_PAGINA + 1} - {Math.min(pagina * ITEMS_POR_PAGINA, productosFiltrados.length)} de {productosFiltrados.length}
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
