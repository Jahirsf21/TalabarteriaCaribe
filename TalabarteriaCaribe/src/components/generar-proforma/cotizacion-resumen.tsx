import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Check, ShoppingBag } from "lucide-react"
import type { Cliente } from "@/data"

interface CotizacionResumenProps {
  clienteSeleccionado: Cliente | null
  itemsCotizacionCount: number
  subtotal: number
  iva: number
  montoTotal: number
  validezDias: number
  onValidezDiasChange: (value: number) => void
  notas: string
  onNotasChange: (value: string) => void
  onConfirmar: () => void
}

export function CotizacionResumen({ 
  clienteSeleccionado, 
  itemsCotizacionCount, 
  subtotal, 
  iva, 
  montoTotal,
  validezDias,
  onValidezDiasChange,
  notas,
  onNotasChange,
  onConfirmar 
}: CotizacionResumenProps) {
  const formatCurrency = (amount: number): string => {
    return `₡${amount.toLocaleString("es-CR")}`
  }

  const fechaVencimiento = new Date()
  fechaVencimiento.setDate(fechaVencimiento.getDate() + validezDias)

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle className="text-base" style={{ color: "var(--foreground)" }}>
          4. Resumen
        </CardTitle>
        <CardDescription className="text-xs">
          Confirme los detalles antes de crear la cotización
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
            <span style={{ color: "var(--foreground)" }}>{formatCurrency(montoTotal)}</span>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ShoppingBag className="h-3 w-3" />
            <span>{itemsCotizacionCount} producto{itemsCotizacionCount !== 1 ? "s" : ""}</span>
          </div>
          {clienteSeleccionado && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Check className="h-3 w-3" />
              <span>Cliente seleccionado</span>
            </div>
          )}
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="validez" className="text-xs font-medium">
              Validez (días)
            </Label>
            <Input
              id="validez"
              type="number"
              min="1"
              value={validezDias}
              onChange={(e) => {
                const value = e.target.value
                onValidezDiasChange(value === "" ? 0 : parseInt(value) || 15)
              }}
              className="text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Vence: {fechaVencimiento.toLocaleDateString("es-CR", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="space-y-1">
            <Label htmlFor="notas" className="text-xs font-medium">
              Notas (opcional)
            </Label>
            <Textarea
              id="notas"
              placeholder="Notas adicionales..."
              value={notas}
              onChange={(e) => onNotasChange(e.target.value)}
              rows={2}
              className="text-sm resize-none"
            />
          </div>
        </div>

        <Button
          onClick={onConfirmar}
          disabled={!clienteSeleccionado || itemsCotizacionCount === 0}
          className="w-full"
          size="lg"
        >
          <Check className="h-4 w-4 mr-2" />
          Crear Cotización
        </Button>

        {!clienteSeleccionado && (
          <p className="text-xs text-destructive text-center">
            Seleccione un cliente para continuar
          </p>
        )}
        
        {clienteSeleccionado && itemsCotizacionCount === 0 && (
          <p className="text-xs text-destructive text-center">
            Agregue productos para continuar
          </p>
        )}
      </CardContent>
    </Card>
  )
}
