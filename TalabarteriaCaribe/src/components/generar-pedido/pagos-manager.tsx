import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2 } from "lucide-react"
import type { PagoPedido } from "@/data/pedidos"

interface PagosManagerProps {
  pagos: PagoPedido[]
  onAgregarPago: (pago: PagoPedido) => void
  onEliminarPago: (index: number) => void
  saldoPendiente: number
  disabled: boolean
}

export function PagosManager({
  pagos,
  onAgregarPago,
  onEliminarPago,
  saldoPendiente,
  disabled,
}: PagosManagerProps) {
  const [monto, setMonto] = useState("")
  const [metodoPago, setMetodoPago] = useState<"efectivo" | "sinpe">("efectivo")
  const [referenciaSinpe, setReferenciaSinpe] = useState("")

  const formatCurrency = (amount: number): string => {
    return `₡${amount.toLocaleString("es-CR")}`
  }

  const handleAgregarPago = () => {
    const montoNum = parseFloat(monto)
    if (!montoNum || montoNum <= 0) return

    const nuevoPago: PagoPedido = {
      monto: montoNum,
      metodoPago,
      referenciaSinpe: metodoPago === "sinpe" ? referenciaSinpe : undefined,
      fecha: new Date().toISOString(),
    }

    onAgregarPago(nuevoPago)
    setMonto("")
    setReferenciaSinpe("")
  }

  const totalPagado = pagos.reduce((sum, pago) => sum + pago.monto, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base" style={{ color: "var(--foreground)" }}>
          3. Pagos
        </CardTitle>
        <CardDescription className="text-xs">
          Registre los pagos del pedido
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Resumen de pagos */}
        <div className="flex items-center justify-between p-3 rounded-lg border" style={{ borderColor: "var(--border)" }}>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Total pagado</p>
            <p className="text-lg font-semibold" style={{ color: "var(--foreground)" }}>
              {formatCurrency(totalPagado)}
            </p>
          </div>
          <div className="text-right space-y-1">
            <p className="text-xs text-muted-foreground">Saldo pendiente</p>
            <p className={`text-lg font-semibold ${saldoPendiente <= 0 ? "text-green-600" : "text-destructive"}`}>
              {formatCurrency(saldoPendiente)}
            </p>
          </div>
        </div>

        {/* Formulario de pago */}
        <div className="space-y-3 p-3 rounded-lg border" style={{ borderColor: "var(--border)" }}>
          <Label className="text-xs font-medium">Agregar pago</Label>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-1">
              <Label htmlFor="monto" className="text-xs">Monto</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  ₡
                </span>
                <Input
                  id="monto"
                  type="number"
                  min="0"
                  step="100"
                  placeholder="0"
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
                  disabled={disabled}
                  className="pl-8"
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="metodoPago" className="text-xs">Método de pago</Label>
              <select
                id="metodoPago"
                value={metodoPago}
                onChange={(e) => setMetodoPago(e.target.value as "efectivo" | "sinpe")}
                disabled={disabled}
                className="w-full h-9 px-3 rounded-md border border-input bg-background text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="efectivo">Efectivo</option>
                <option value="sinpe">SINPE</option>
              </select>
            </div>
          </div>
          {metodoPago === "sinpe" && (
            <div className="space-y-1">
              <Label htmlFor="referenciaSinpe" className="text-xs">Referencia SINPE</Label>
              <Input
                id="referenciaSinpe"
                placeholder="Ej: SINPE-20260520-003"
                value={referenciaSinpe}
                onChange={(e) => setReferenciaSinpe(e.target.value)}
                disabled={disabled}
              />
            </div>
          )}
          <Button
            onClick={handleAgregarPago}
            disabled={disabled || !monto || parseFloat(monto) <= 0}
            className="w-full"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Agregar pago
          </Button>
        </div>

        {/* Lista de pagos */}
        {pagos.length > 0 && (
          <div className="space-y-2">
            <Label className="text-xs font-medium">Historial de pagos</Label>
            <div className="space-y-2">
              {pagos.map((pago, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm" style={{ color: "var(--foreground)" }}>
                        {formatCurrency(pago.monto)}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {pago.metodoPago === "efectivo" ? "Efectivo" : "SINPE"}
                      </Badge>
                    </div>
                    {pago.referenciaSinpe && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Ref: {pago.referenciaSinpe}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {new Date(pago.fecha).toLocaleDateString("es-CR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-destructive hover:text-destructive"
                    onClick={() => onEliminarPago(index)}
                    disabled={disabled}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
