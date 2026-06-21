import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface PedidoDetallesFormProps {
  descripcion: string
  onDescripcionChange: (value: string) => void
  dimensiones: string
  onDimensionesChange: (value: string) => void
  subtotal: number
  onSubtotalChange: (value: number) => void
  fechaEntregaEstimada: string
  onFechaEntregaEstimadaChange: (value: string) => void
  notas: string
  onNotasChange: (value: string) => void
  disabled: boolean
}

export function PedidoDetallesForm({
  descripcion,
  onDescripcionChange,
  dimensiones,
  onDimensionesChange,
  subtotal,
  onSubtotalChange,
  fechaEntregaEstimada,
  onFechaEntregaEstimadaChange,
  notas,
  onNotasChange,
  disabled,
}: PedidoDetallesFormProps) {
  const formatCurrency = (amount: number): string => {
    return `₡${amount.toLocaleString("es-CR")}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base" style={{ color: "var(--foreground)" }}>
          2. Detalles del Pedido
        </CardTitle>
        <CardDescription className="text-xs">
          Describa el pedido personalizado
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="descripcion" className="text-xs font-medium">
            Descripción <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="descripcion"
            placeholder="Describa el producto a fabricar..."
            value={descripcion}
            onChange={(e) => onDescripcionChange(e.target.value)}
            disabled={disabled}
            rows={4}
            className="resize-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dimensiones" className="text-xs font-medium">
            Dimensiones (opcional)
          </Label>
          <Input
            id="dimensiones"
            placeholder="Ej: 35cm x 25cm x 12cm"
            value={dimensiones}
            onChange={(e) => onDimensionesChange(e.target.value)}
            disabled={disabled}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subtotal" className="text-xs font-medium">
            Subtotal <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              ₡
            </span>
            <Input
              id="subtotal"
              type="number"
              min="0"
              step="100"
              placeholder="0"
              value={subtotal || ""}
              onChange={(e) => {
                const value = e.target.value
                onSubtotalChange(value === "" ? 0 : parseFloat(value) || 0)
              }}
              disabled={disabled}
              className="pl-8"
            />
          </div>
          {subtotal > 0 && (
            <p className="text-xs text-muted-foreground">
              IVA (13%): {formatCurrency(subtotal * 0.13)} | Total: {formatCurrency(subtotal * 1.13)}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="fechaEntrega" className="text-xs font-medium">
            Fecha de entrega estimada
          </Label>
          <Input
            id="fechaEntrega"
            type="date"
            value={fechaEntregaEstimada}
            onChange={(e) => onFechaEntregaEstimadaChange(e.target.value)}
            disabled={disabled}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notas" className="text-xs font-medium">
            Notas adicionales (opcional)
          </Label>
          <Textarea
            id="notas"
            placeholder="Cualquier nota o instrucción especial..."
            value={notas}
            onChange={(e) => onNotasChange(e.target.value)}
            disabled={disabled}
            rows={2}
            className="resize-none"
          />
        </div>
      </CardContent>
    </Card>
  )
}
