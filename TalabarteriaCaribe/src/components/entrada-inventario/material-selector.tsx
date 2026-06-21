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
import { productos } from "@/data"
import type { Material } from "@/data/materiales"
import type { Producto } from "@/data"
import type { UnidadMedida } from "@/data/materiales"

interface MaterialSelectorProps {
  tipoEntrada: "material" | "producto"
  proveedorSeleccionado: boolean
  materialSeleccionado: Material | null
  productoSeleccionado: Producto | null
  onMaterialSelect: (material: Material) => void
  onProductoSelect: (producto: Producto) => void
  onMaterialDeselect: () => void
  onProductoDeselect: () => void
  onAgregar: () => void
  cantidad: number
  onCantidadChange: (cantidad: number) => void
  costoUnitario: number
  onCostoUnitarioChange: (costo: number) => void
  nuevoProducto: { nombre: string; categoria: string; precio: number }
  onNuevoProductoChange: (producto: { nombre: string; categoria: string; precio: number }) => void
  nuevoMaterial: { nombre: string; unidad: UnidadMedida | "" }
  onNuevoMaterialChange: (material: { nombre: string; unidad: UnidadMedida | "" }) => void
}

const ITEMS_POR_PAGINA = 10

export function MaterialSelector({ 
  tipoEntrada,
  proveedorSeleccionado, 
  materialSeleccionado,
  productoSeleccionado,
  onMaterialSelect,
  onProductoSelect,
  onMaterialDeselect,
  onProductoDeselect,
  onAgregar,
  cantidad,
  onCantidadChange,
  costoUnitario,
  onCostoUnitarioChange,
  nuevoProducto,
  onNuevoProductoChange,
  nuevoMaterial,
  onNuevoMaterialChange,
}: MaterialSelectorProps) {
  const [busqueda, setBusqueda] = useState("")
  const [pagina, setPagina] = useState(1)
  const [creandoNuevo, setCreandoNuevo] = useState(false)

  const materialesFiltrados = materiales.filter((m) => 
    m.activo && 
    (m.nombre.toLowerCase().includes(busqueda.toLowerCase()))
  )

  const productosFiltrados = productos.filter((p) => 
    p.activo && 
    (p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
     p.categoria.toLowerCase().includes(busqueda.toLowerCase()))
  )

  const itemsFiltrados = tipoEntrada === "material" ? materialesFiltrados : productosFiltrados
  const totalPaginas = Math.ceil(itemsFiltrados.length / ITEMS_POR_PAGINA)
  const itemsPaginados = itemsFiltrados.slice(
    (pagina - 1) * ITEMS_POR_PAGINA,
    pagina * ITEMS_POR_PAGINA
  )

  const handleSearch = (value: string) => {
    setBusqueda(value)
    setPagina(1)
  }

  const formatStock = (stock: number): string => {
    return stock % 1 === 0 ? stock.toString() : stock.toFixed(1)
  }

  if (!proveedorSeleccionado) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base" style={{ color: "var(--foreground)" }}>
            2. Agregar {tipoEntrada === "material" ? "Materiales" : "Productos"}
          </CardTitle>
          <CardDescription className="text-xs">
            Seleccione {tipoEntrada === "material" ? "materiales" : "productos"} para la entrada
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground text-sm">
            {tipoEntrada === "material" ? "Seleccione un proveedor primero" : "Listo para agregar productos"}
          </div>
        </CardContent>
      </Card>
    )
  }

  const selectedItem = tipoEntrada === "material" ? materialSeleccionado : productoSeleccionado
  const deselectAction = tipoEntrada === "material" ? onMaterialDeselect : onProductoDeselect

  if (selectedItem) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center justify-between" style={{ color: "var(--foreground)" }}>
            2. {tipoEntrada === "material" ? "Material" : "Producto"} Seleccionado
            <Button variant="ghost" size="sm" onClick={deselectAction}>
              <X className="h-4 w-4" />
            </Button>
          </CardTitle>
          <CardDescription className="text-xs">
            Configure la cantidad y costo unitario
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border p-4 bg-primary/5" style={{ borderColor: "var(--primary)" }}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <p className="font-medium text-sm" style={{ color: "var(--foreground)" }}>
                  {selectedItem.nombre}
                </p>
                {tipoEntrada === "material" && materialSeleccionado && (
                  <>
                    <p className="text-xs text-muted-foreground mt-1">
                      Stock actual: {formatStock(materialSeleccionado.stock)} {materialSeleccionado.unidad}
                    </p>
                    <Badge 
                      variant={materialSeleccionado.estadoStock === "bajo" ? "destructive" : "secondary"} 
                      className="text-xs mt-1"
                    >
                      {materialSeleccionado.estadoStock}
                    </Badge>
                  </>
                )}
                {tipoEntrada === "producto" && productoSeleccionado && (
                  <>
                    <p className="text-xs text-muted-foreground mt-1">
                      Stock actual: {productoSeleccionado.stock}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {productoSeleccionado.categoria}
                    </p>
                  </>
                )}
              </div>
              <Badge variant="default" className="text-xs shrink-0">
                Seleccionado
              </Badge>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <label className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                  Cantidad:
                </label>
                <div className="flex items-center gap-2 flex-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onCantidadChange(Math.max(1, cantidad - 1))}
                  >
                    <Plus className="h-3 w-3 rotate-45" />
                  </Button>
                  <Input
                    type="number"
                    min="1"
                    step="1"
                    value={cantidad}
                    onChange={(e) => {
                      const value = e.target.value
                      onCantidadChange(value === "" ? 0 : parseInt(value) || 1)
                    }}
                    className="text-center"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onCantidadChange(cantidad + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <span className="text-xs text-muted-foreground">unidades</span>
              </div>
              <div className="flex items-center gap-3">
                <label className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                  Costo unitario:
                </label>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    ₡
                  </span>
                  <Input
                    type="number"
                    min="0"
                    step="100"
                    value={costoUnitario}
                    onChange={(e) => {
                      const value = e.target.value
                      onCostoUnitarioChange(value === "" ? 0 : parseFloat(value) || 0)
                    }}
                    className="pl-8"
                  />
                </div>
              </div>
              <Button
                onClick={onAgregar}
                disabled={cantidad <= 0 || costoUnitario <= 0}
                className="w-full"
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
          2. Agregar {tipoEntrada === "material" ? "Materiales" : "Productos"}
        </CardTitle>
        <CardDescription className="text-xs">
          Seleccione {tipoEntrada === "material" ? "materiales" : "productos"} para la entrada
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`Buscar ${tipoEntrada === "material" ? "material" : "producto"}...`}
            value={busqueda}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Create new material button - only for material mode */}
        {tipoEntrada === "material" && !creandoNuevo && (
          <Button
            variant="outline"
            onClick={() => setCreandoNuevo(true)}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Crear nuevo material
          </Button>
        )}

        {/* Create new product button - only for producto mode */}
        {tipoEntrada === "producto" && !creandoNuevo && (
          <Button
            variant="outline"
            onClick={() => setCreandoNuevo(true)}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Crear nuevo producto
          </Button>
        )}

        {/* Create new material form */}
        {creandoNuevo && tipoEntrada === "material" && (
          <div className="rounded-lg border p-4 space-y-3" style={{ borderColor: "var(--primary)" }}>
            <div className="flex items-center justify-between">
              <p className="font-medium text-sm" style={{ color: "var(--foreground)" }}>
                Crear nuevo material
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCreandoNuevo(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              <Input
                placeholder="Nombre del material"
                value={nuevoMaterial.nombre}
                onChange={(e) => onNuevoMaterialChange({ ...nuevoMaterial, nombre: e.target.value })}
                className="text-sm"
              />
              <Input
                placeholder="Unidad (metros, kilos, litros, unidades)"
                value={nuevoMaterial.unidad}
                onChange={(e) => onNuevoMaterialChange({ ...nuevoMaterial, unidad: e.target.value as UnidadMedida })}
                className="text-sm"
              />
              <Button
                onClick={() => {
                  if (nuevoMaterial.nombre && nuevoMaterial.unidad) {
                    const tempMaterial: Material = {
                      id: -1,
                      nombre: nuevoMaterial.nombre,
                      unidad: nuevoMaterial.unidad as UnidadMedida,
                      stock: 0,
                      stockMinimo: 10,
                      estadoStock: "normal",
                      proveedorId: null,
                      activo: true,
                      creadoEn: new Date().toISOString(),
                    }
                    onMaterialSelect(tempMaterial)
                    setCreandoNuevo(false)
                    onNuevoMaterialChange({ nombre: "", unidad: "" })
                  }
                }}
                disabled={!nuevoMaterial.nombre || !nuevoMaterial.unidad}
                className="w-full"
              >
                Crear y seleccionar
              </Button>
            </div>
          </div>
        )}

        {/* Create new product form */}
        {creandoNuevo && tipoEntrada === "producto" && (
          <div className="rounded-lg border p-4 space-y-3" style={{ borderColor: "var(--primary)" }}>
            <div className="flex items-center justify-between">
              <p className="font-medium text-sm" style={{ color: "var(--foreground)" }}>
                Crear nuevo producto
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCreandoNuevo(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              <Input
                placeholder="Nombre del producto"
                value={nuevoProducto.nombre}
                onChange={(e) => onNuevoProductoChange({ ...nuevoProducto, nombre: e.target.value })}
                className="text-sm"
              />
              <Input
                placeholder="Categoría"
                value={nuevoProducto.categoria}
                onChange={(e) => onNuevoProductoChange({ ...nuevoProducto, categoria: e.target.value })}
                className="text-sm"
              />
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  ₡
                </span>
                <Input
                  type="number"
                  placeholder="Precio de venta"
                  min="0"
                  step="100"
                  value={nuevoProducto.precio || ""}
                  onChange={(e) => {
                    const value = e.target.value
                    onNuevoProductoChange({ ...nuevoProducto, precio: value === "" ? 0 : parseFloat(value) || 0 })
                  }}
                  className="pl-8 text-sm"
                />
              </div>
              <Button
                onClick={() => {
                  if (nuevoProducto.nombre && nuevoProducto.categoria && nuevoProducto.precio > 0) {
                    const tempProducto: Producto = {
                      id: -1,
                      nombre: nuevoProducto.nombre,
                      categoria: nuevoProducto.categoria,
                      precio: nuevoProducto.precio,
                      descripcion: "",
                      porcentajeIva: 13,
                      imagen: "",
                      stock: 0,
                      stockMinimo: 5,
                      estadoStock: "normal",
                      activo: true,
                      creadoEn: new Date().toISOString(),
                    }
                    onProductoSelect(tempProducto)
                    setCreandoNuevo(false)
                    onNuevoProductoChange({ nombre: "", categoria: "", precio: 0 })
                  }
                }}
                disabled={!nuevoProducto.nombre || !nuevoProducto.categoria || nuevoProducto.precio <= 0}
                className="w-full"
              >
                Crear y seleccionar
              </Button>
            </div>
          </div>
        )}
        
        {/* Items table - Responsive */}
        <div className="rounded-lg border" style={{ borderColor: "var(--border)" }}>
          {/* Mobile: Card layout */}
          <div className="md:hidden space-y-2">
            {itemsPaginados.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No se encontraron {tipoEntrada === "material" ? "materiales" : "productos"}
              </div>
            ) : (
              itemsPaginados.map((item) => {
                if (tipoEntrada === "material") {
                  const material = item as Material
                  return (
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
                        onClick={() => onMaterialSelect(material)}
                        className="w-full"
                      >
                        Seleccionar
                      </Button>
                    </div>
                  )
                } else {
                  const producto = item as Producto
                  return (
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
                            Stock: {producto.stock}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {producto.categoria}
                          </p>
                        </div>
                        <Badge 
                          variant={producto.stock <= producto.stockMinimo ? "destructive" : "secondary"} 
                          className="text-xs shrink-0"
                        >
                          {producto.stock}
                        </Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onProductoSelect(producto)}
                        className="w-full"
                      >
                        Seleccionar
                      </Button>
                    </div>
                  )
                }
              })
            )}
          </div>

          {/* Desktop: Table layout */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs whitespace-nowrap">{tipoEntrada === "material" ? "Material" : "Producto"}</TableHead>
                  {tipoEntrada === "material" && (
                    <TableHead className="text-xs whitespace-nowrap">Unidad</TableHead>
                  )}
                  {tipoEntrada === "producto" && (
                    <TableHead className="text-xs whitespace-nowrap">Categoría</TableHead>
                  )}
                  <TableHead className="text-xs text-right whitespace-nowrap">Stock</TableHead>
                  {tipoEntrada === "material" && (
                    <TableHead className="text-xs text-center whitespace-nowrap">Estado</TableHead>
                  )}
                  <TableHead className="text-xs text-right whitespace-nowrap">Acción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {itemsPaginados.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={tipoEntrada === "material" ? 5 : 4} className="text-center text-sm text-muted-foreground py-8">
                      No se encontraron {tipoEntrada === "material" ? "materiales" : "productos"}
                    </TableCell>
                  </TableRow>
                ) : (
                  itemsPaginados.map((item) => {
                    if (tipoEntrada === "material") {
                      const material = item as Material
                      return (
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
                              onClick={() => onMaterialSelect(material)}
                              className="shrink-0"
                            >
                              Seleccionar
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    } else {
                      const producto = item as Producto
                      return (
                        <TableRow key={producto.id}>
                          <TableCell className="text-sm font-medium">
                            {producto.nombre}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {producto.categoria}
                          </TableCell>
                          <TableCell className="text-sm text-right font-medium whitespace-nowrap">
                            {producto.stock}
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
                      )
                    }
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        
        {/* Pagination */}
        {totalPaginas > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              {(pagina - 1) * ITEMS_POR_PAGINA + 1} - {Math.min(pagina * ITEMS_POR_PAGINA, itemsFiltrados.length)} de {itemsFiltrados.length}
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
