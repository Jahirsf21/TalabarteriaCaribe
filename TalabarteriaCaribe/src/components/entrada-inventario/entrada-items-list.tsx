import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash2 } from "lucide-react"
import type { Material } from "@/data/materiales"
import type { Producto } from "@/data"

interface ItemEntrada {
  tipo: "material" | "producto"
  material?: Material
  producto?: Producto
  cantidad: number
  costoUnitario: number
}

interface EntradaItemsListProps {
  itemsEntrada: ItemEntrada[]
  onActualizarCantidad: (tipo: "material" | "producto", id: number, nuevaCantidad: number) => void
  onActualizarCosto: (tipo: "material" | "producto", id: number, nuevoCosto: number) => void
  onEliminarItem: (tipo: "material" | "producto", id: number) => void
}

export function EntradaItemsList({ itemsEntrada, onActualizarCantidad, onActualizarCosto, onEliminarItem }: EntradaItemsListProps) {
  const formatStock = (stock: number): string => {
    return stock % 1 === 0 ? stock.toString() : stock.toFixed(1)
  }

  const formatCurrency = (amount: number): string => {
    return `₡${amount.toLocaleString("es-CR")}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base" style={{ color: "var(--foreground)" }}>
          3. Items de la Entrada
        </CardTitle>
        <CardDescription className="text-xs">
          {itemsEntrada.length} {itemsEntrada.length === 1 ? "item" : "items"} en la entrada
        </CardDescription>
      </CardHeader>
      <CardContent>
        {itemsEntrada.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">
            No hay {itemsEntrada.some(i => i.tipo === "producto") ? "productos" : "materiales"} en la entrada
          </div>
        ) : (
          <div className="space-y-2">
            {itemsEntrada.map((item) => {
              const id = item.tipo === "material" ? item.material?.id : item.producto?.id
              const nombre = item.tipo === "material" ? item.material?.nombre : item.producto?.nombre
              const unidad = item.tipo === "material" ? item.material?.unidad : "unidades"
              const stock = item.tipo === "material" ? item.material?.stock : item.producto?.stock
              
              return (
                <div
                  key={`${item.tipo}-${id}`}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-3 rounded-lg border p-3"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate" style={{ color: "var(--foreground)" }}>
                      {nombre}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Stock actual: {item.tipo === "material" ? formatStock(stock || 0) : stock} {unidad}
                    </p>
                    <Badge variant="outline" className="text-xs mt-1 w-fit">
                      {item.tipo === "material" ? "Material" : "Producto"}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between md:justify-center gap-4">
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-muted-foreground whitespace-nowrap">
                        Cantidad:
                      </label>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => onActualizarCantidad(item.tipo, id!, item.cantidad - 1)}
                        >
                          <Plus className="h-3 w-3 rotate-45" />
                        </Button>
                        <span className="w-12 text-center text-sm font-medium">
                          {item.cantidad}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => onActualizarCantidad(item.tipo, id!, item.cantidad + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <span className="text-xs text-muted-foreground">{unidad}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-muted-foreground whitespace-nowrap">
                        Costo:
                      </label>
                      <div className="relative">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                          ₡
                        </span>
                        <Input
                          type="number"
                          min="0"
                          step="100"
                          value={item.costoUnitario}
                          onChange={(e) => onActualizarCosto(item.tipo, id!, parseFloat(e.target.value) || 0)}
                          className="w-28 h-7 pl-6 text-sm"
                        />
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>
                        {formatCurrency(item.costoUnitario * item.cantidad)}
                      </p>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive hover:text-destructive"
                      onClick={() => onEliminarItem(item.tipo, id!)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
