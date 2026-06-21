import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Minus, Trash2 } from "lucide-react"
import type { Producto } from "@/data"

interface ItemCotizacion {
  producto: Producto
  cantidad: number
  precioUnitario: number
}

interface CotizacionItemsListProps {
  itemsCotizacion: ItemCotizacion[]
  onActualizarCantidad: (productoId: number, nuevaCantidad: number) => void
  onActualizarPrecio: (productoId: number, nuevoPrecio: number) => void
  onEliminarItem: (productoId: number) => void
}

export function CotizacionItemsList({ itemsCotizacion, onActualizarCantidad, onActualizarPrecio, onEliminarItem }: CotizacionItemsListProps) {
  const formatCurrency = (amount: number): string => {
    return `₡${amount.toLocaleString("es-CR")}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base" style={{ color: "var(--foreground)" }}>
          3. Items de la Cotización
        </CardTitle>
        <CardDescription className="text-xs">
          {itemsCotizacion.length} producto{itemsCotizacion.length !== 1 ? "s" : ""} en la cotización
        </CardDescription>
      </CardHeader>
      <CardContent>
        {itemsCotizacion.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">
            No hay productos en la cotización
          </div>
        ) : (
          <div className="space-y-3">
            {itemsCotizacion.map((item) => (
              <div
                key={item.producto.id}
                className="flex flex-col gap-3 rounded-lg border p-4"
                style={{ borderColor: "var(--border)" }}
              >
                {/* Nombre y precio unitario */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate" style={{ color: "var(--foreground)" }}>
                      {item.producto.nombre}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatCurrency(item.precioUnitario)} c/u
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive shrink-0"
                    onClick={() => onEliminarItem(item.producto.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Controles de cantidad y precio */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onActualizarCantidad(item.producto.id, item.cantidad - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-10 text-center text-sm font-medium">
                      {item.cantidad}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onActualizarCantidad(item.producto.id, item.cantidad + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2 flex-1 sm:flex-none">
                    <span className="text-xs text-muted-foreground whitespace-nowrap">Precio:</span>
                    <div className="relative flex-1 sm:flex-none">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                        ₡
                      </span>
                      <Input
                        type="text"
                        inputMode="numeric"
                        min="0"
                        step="100"
                        value={item.precioUnitario === 0 ? "" : item.precioUnitario}
                        onChange={(e) => {
                          const value = e.target.value
                          onActualizarPrecio(item.producto.id, value === "" ? 0 : parseFloat(value) || 0)
                        }}
                        className="w-full sm:w-28 h-8 pl-6 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Total con explicación */}
                <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: "var(--border)" }}>
                  <span className="text-xs text-muted-foreground">
                    {item.cantidad} x {formatCurrency(item.precioUnitario)}
                  </span>
                  <p className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>
                    {formatCurrency(item.precioUnitario * item.cantidad)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
