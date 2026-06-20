import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ShoppingBag, Check } from "lucide-react"
import type { Cliente } from "@/data"

interface VentaResumenProps {
  clienteSeleccionado: Cliente | null
  productosVentaCount: number
  subtotal: number
  iva: number
  total: number
  onConfirmar: () => void
}

export function VentaResumen({ 
  clienteSeleccionado, 
  productosVentaCount, 
  subtotal, 
  iva, 
  total, 
  onConfirmar 
}: VentaResumenProps) {
  const formatCurrency = (amount: number): string => {
    return `₡${amount.toLocaleString("es-CR")}`
  }

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle className="text-base" style={{ color: "var(--foreground)" }}>
          4. Resumen
        </CardTitle>
        <CardDescription className="text-xs">
          Confirme los detalles antes de crear la venta
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span style={{ color: "var(--muted-foreground)" }}>Subtotal</span>
            <span style={{ color: "var(--foreground)" }}>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span style={{ color: "var(--muted-foreground)" }}>IVA (13%)</span>
            <span style={{ color: "var(--foreground)" }}>{formatCurrency(iva)}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-base font-semibold">
            <span style={{ color: "var(--foreground)" }}>Total</span>
            <span style={{ color: "var(--foreground)" }}>{formatCurrency(total)}</span>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ShoppingBag className="h-3 w-3" />
            <span>{productosVentaCount} producto{productosVentaCount !== 1 ? "s" : ""}</span>
          </div>
          {clienteSeleccionado && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Check className="h-3 w-3" />
              <span>Cliente seleccionado</span>
            </div>
          )}
        </div>

        <Button
          onClick={onConfirmar}
          disabled={!clienteSeleccionado || productosVentaCount === 0}
          className="w-full"
          size="lg"
        >
          <Check className="h-4 w-4 mr-2" />
          Confirmar Venta
        </Button>

        {!clienteSeleccionado && (
          <p className="text-xs text-destructive text-center">
            Seleccione un cliente para continuar
          </p>
        )}
        
        {clienteSeleccionado && productosVentaCount === 0 && (
          <p className="text-xs text-destructive text-center">
            Agregue productos para continuar
          </p>
        )}
      </CardContent>
    </Card>
  )
}
