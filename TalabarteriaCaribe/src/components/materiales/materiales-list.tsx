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

import type { Material } from "@/data/materiales"

interface MaterialesListProps {
  materiales: Material[]
  onEdit: (material: Material) => void
  onDelete: (id: number) => void
}

export function MaterialesList({ materiales, onEdit, onDelete }: MaterialesListProps) {
  const formatStock = (stock: number): string => {
    return stock % 1 === 0 ? stock.toString() : stock.toFixed(1)
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
            {materiales.map((material) => (
              <div
                key={material.id}
                className="rounded-lg border p-4 space-y-3"
                style={{ borderColor: "var(--border)" }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate" style={{ color: "var(--foreground)" }}>
                      {material.nombre}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {material.unidad}
                    </p>
                  </div>
                  {getEstadoBadge(material.estadoStock)}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Stock: {formatStock(material.stock)} {material.unidad}</p>
                    <p className="text-muted-foreground">Mínimo: {formatStock(material.stockMinimo)} {material.unidad}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => onEdit(material)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      onClick={() => onDelete(material.id)}
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
                  <TableHead className="min-w-[150px]">Material</TableHead>
                  <TableHead className="min-w-[100px]">Unidad</TableHead>
                  <TableHead className="min-w-[80px] text-right">Stock</TableHead>
                  <TableHead className="min-w-[100px] text-right hidden lg:table-cell">Stock Mínimo</TableHead>
                  <TableHead className="min-w-[100px] hidden md:table-cell">Estado</TableHead>
                  <TableHead className="min-w-[100px] text-center">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {materiales.map((material) => (
                  <TableRow key={material.id}>
                    <TableCell className="font-medium">{material.nombre}</TableCell>
                    <TableCell className="text-muted-foreground">{material.unidad}</TableCell>
                    <TableCell className="text-right">
                      {formatStock(material.stock)}
                    </TableCell>
                    <TableCell className="text-right hidden lg:table-cell">
                      {formatStock(material.stockMinimo)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{getEstadoBadge(material.estadoStock)}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => onEdit(material)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          onClick={() => onDelete(material.id)}
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
