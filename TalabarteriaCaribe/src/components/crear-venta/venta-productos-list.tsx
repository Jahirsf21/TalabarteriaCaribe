import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Minus, Trash2 } from "lucide-react"
import type { Producto } from "@/data"

interface ProductoVenta {
  producto: Producto
  cantidad: number
}

interface VentaProductosListProps {
  productosVenta: ProductoVenta[]
  onActualizarCantidad: (productoId: number, nuevaCantidad: number) => void
  onEliminarProducto: (productoId: number) => void
}

export function VentaProductosList({ productosVenta, onActualizarCantidad, onEliminarProducto }: VentaProductosListProps) {
  const formatCurrency = (amount: number): string => {
    return `₡${amount.toLocaleString("es-CR")}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base" style={{ color: "var(--foreground)" }}>
          3. Productos en la Venta
        </CardTitle>
        <CardDescription className="text-xs">
          {productosVenta.length} producto{productosVenta.length !== 1 ? "s" : ""} seleccionado{productosVenta.length !== 1 ? "s" : ""}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {productosVenta.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">
            No hay productos en la venta
          </div>
        ) : (
          <div className="space-y-2">
            {productosVenta.map((item) => (
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
                    {formatCurrency(item.producto.precio)} c/u
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
                      disabled={item.cantidad >= item.producto.stock}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>
                      {formatCurrency(item.producto.precio * item.cantidad)}
                    </p>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-destructive hover:text-destructive"
                    onClick={() => onEliminarProducto(item.producto.id)}
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
