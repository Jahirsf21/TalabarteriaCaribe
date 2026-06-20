import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Check, Package } from "lucide-react"
import type { Proveedor } from "@/data/proveedores"

interface EntradaResumenProps {
  tipoEntrada: "material" | "producto"
  proveedorSeleccionado: Proveedor | null
  itemsEntradaCount: number
  costoTotal: number
  fecha: string
  onFechaChange: (value: string) => void
  notas: string
  onNotasChange: (value: string) => void
  onConfirmar: () => void
}

export function EntradaResumen({ 
  tipoEntrada,
  proveedorSeleccionado, 
  itemsEntradaCount, 
  costoTotal,
  fecha,
  onFechaChange,
  notas,
  onNotasChange,
  onConfirmar 
}: EntradaResumenProps) {
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
          Confirme los detalles antes de registrar la entrada
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-base font-semibold">
            <span style={{ color: "var(--foreground)" }}>Costo Total</span>
            <span style={{ color: "var(--foreground)" }}>{formatCurrency(costoTotal)}</span>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Package className="h-3 w-3" />
            <span>{itemsEntradaCount} {tipoEntrada === "material" ? "material" : "producto"}{itemsEntradaCount !== 1 ? "es" : ""}</span>
          </div>
          {tipoEntrada === "material" && proveedorSeleccionado && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Check className="h-3 w-3" />
              <span>Proveedor seleccionado</span>
            </div>
          )}
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="fecha" className="text-xs font-medium">
              Fecha de entrada
            </Label>
            <Input
              id="fecha"
              type="date"
              value={fecha}
              onChange={(e) => onFechaChange(e.target.value)}
              className="text-sm"
            />
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
          disabled={itemsEntradaCount === 0 || (tipoEntrada === "material" && !proveedorSeleccionado)}
          className="w-full"
          size="lg"
        >
          <Check className="h-4 w-4 mr-2" />
          Registrar Entrada
        </Button>

        {tipoEntrada === "material" && !proveedorSeleccionado && (
          <p className="text-xs text-destructive text-center">
            Seleccione un proveedor para continuar
          </p>
        )}
        
        {itemsEntradaCount === 0 && (
          <p className="text-xs text-destructive text-center">
            Agregue {tipoEntrada === "material" ? "materiales" : "productos"} para continuar
          </p>
        )}
      </CardContent>
    </Card>
  )
}
