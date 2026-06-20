import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RefreshCw } from "lucide-react"
import type { MovimientoInventario } from "@/data"
import { formatDate } from "./utils"

interface InventoryMovementsProps {
  movimientos: MovimientoInventario[]
}

export function InventoryMovements({ movimientos }: InventoryMovementsProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base" style={{ color: "var(--foreground)" }}>
          <RefreshCw className="h-4 w-4" style={{ color: "#B8895B" }} />
          Movimientos de Inventario
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {movimientos.slice(0, 5).map((mov) => (
          <div
            key={mov.id}
            className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium" style={{ color: "var(--foreground)" }}>
                {mov.nombreItem}
              </p>
              <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                {mov.tipoItem === "materia_prima" ? "Materia prima" : "Producto"} · {formatDate(mov.fecha)}
              </p>
            </div>
            {mov.tipo === "entrada" && (
              <Badge className="shrink-0 border-green-300 bg-green-100 text-green-800">
                +{mov.cantidad}
              </Badge>
            )}
            {mov.tipo === "salida" && (
              <Badge variant="destructive" className="shrink-0">
                −{Math.abs(mov.cantidad)}
              </Badge>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
