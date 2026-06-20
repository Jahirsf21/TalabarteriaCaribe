import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Edit, Trash2 } from "lucide-react"

import type { Producto } from "@/data"

interface ProductosListProps {
  productos: Producto[]
  onEdit: (producto: Producto) => void
  onDelete: (id: number) => void
}

export function ProductosList({ productos, onEdit, onDelete }: ProductosListProps) {
  const formatCurrency = (amount: number) => {
    return `₡${amount.toLocaleString("es-CR")}`
  }

  const getEstadoBadge = (estado: string) => {
    if (estado === "agotado") {
      return <Badge variant="destructive">Agotado</Badge>
    }
    if (estado === "bajo") {
      return <Badge className="border-amber-300 bg-amber-100 text-amber-800">Bajo</Badge>
    }
    return <Badge variant="secondary">Normal</Badge>
  }

  return (
    <div className="rounded-lg border" style={{ borderColor: "var(--border)" }}>
          {/* Mobile: Card layout */}
          <div className="xl:hidden space-y-2">
            {productos.map((producto) => (
              <div
                key={producto.id}
                className="rounded-lg border p-4 space-y-3"
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
                  {getEstadoBadge(producto.estadoStock)}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Stock: {producto.stock}</p>
                    <p className="font-medium">{formatCurrency(producto.precio)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => onEdit(producto)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      onClick={() => onDelete(producto.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Table layout */}
          <div className="hidden xl:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-37.5">Producto</TableHead>
                  <TableHead className="min-w-30 hidden lg:table-cell">Categoría</TableHead>
                  <TableHead className="min-w-25 text-right">Precio</TableHead>
                  <TableHead className="min-w-20 text-right">Stock</TableHead>
                  <TableHead className="min-w-25 hidden md:table-cell">Estado</TableHead>
                  <TableHead className="min-w-25 text-center">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productos.map((producto) => (
                  <TableRow key={producto.id}>
                    <TableCell className="font-medium">{producto.nombre}</TableCell>
                    <TableCell className="text-muted-foreground hidden lg:table-cell">{producto.categoria}</TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(producto.precio)}
                    </TableCell>
                    <TableCell className="text-right">{producto.stock}</TableCell>
                    <TableCell className="hidden md:table-cell">{getEstadoBadge(producto.estadoStock)}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => onEdit(producto)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          onClick={() => onDelete(producto.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
    </div>
  )
}
