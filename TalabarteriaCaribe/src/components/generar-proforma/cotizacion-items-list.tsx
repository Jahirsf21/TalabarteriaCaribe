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
          <div className="space-y-2">
            {itemsCotizacion.map((item) => (
              <div
                key={item.producto.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-3 rounded-lg border p-3"
                style={{ borderColor: "var(--border)" }}
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate" style={{ color: "var(--foreground)" }}>
                    {item.producto.nombre}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatCurrency(item.precioUnitario)} c/u
                  </p>
                </div>
                
                <div className="flex items-center justify-between md:justify-center gap-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => onActualizarCantidad(item.producto.id, item.cantidad - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm font-medium">
                      {item.cantidad}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => onActualizarCantidad(item.producto.id, item.cantidad + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Precio:</span>
                    <div className="relative">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                        ₡
                      </span>
                      <Input
                        type="number"
                        min="0"
                        step="100"
                        value={item.precioUnitario}
                        onChange={(e) => onActualizarPrecio(item.producto.id, parseFloat(e.target.value) || 0)}
                        className="w-24 h-7 pl-6 text-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>
                      {formatCurrency(item.precioUnitario * item.cantidad)}
                    </p>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-destructive hover:text-destructive"
                    onClick={() => onEliminarItem(item.producto.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
