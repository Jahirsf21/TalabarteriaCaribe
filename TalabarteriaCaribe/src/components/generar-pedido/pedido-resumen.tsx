import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Check, Calendar, DollarSign } from "lucide-react"
import type { Cliente } from "@/data"
import type { PagoPedido } from "@/data/pedidos"
import type { Material } from "@/data/materiales"

interface MaterialPedido {
  material: Material
  cantidad: number
}

interface PedidoResumenProps {
  clienteSeleccionado: Cliente | null
  descripcion: string
  subtotal: number
  iva: number
  total: number
  totalPagado: number
  saldoPendiente: number
  pagos: PagoPedido[]
  materialesSeleccionados: MaterialPedido[]
  fechaEntregaEstimada: string
  onConfirmar: () => void
}

export function PedidoResumen({
  clienteSeleccionado,
  descripcion,
  subtotal,
  iva,
  total,
  totalPagado,
  saldoPendiente,
  pagos,
  materialesSeleccionados,
  fechaEntregaEstimada,
  onConfirmar,
}: PedidoResumenProps) {
  const formatCurrency = (amount: number): string => {
    return `₡${amount.toLocaleString("es-CR")}`
  }

  const isValid = clienteSeleccionado && descripcion && subtotal > 0

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle className="text-base" style={{ color: "var(--foreground)" }}>
          4. Resumen
        </CardTitle>
        <CardDescription className="text-xs">
          Confirme los detalles antes de crear el pedido
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Cliente */}
        {clienteSeleccionado && (
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Cliente</p>
            <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
              {clienteSeleccionado.nombre}
            </p>
          </div>
        )}

        {/* Descripción */}
        {descripcion && (
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Descripción</p>
            <p className="text-sm" style={{ color: "var(--foreground)" }}>
              {descripcion}
            </p>
          </div>
        )}

        {/* Materiales */}
        {materialesSeleccionados.length > 0 && (
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Materiales</p>
            <div className="space-y-1">
              {materialesSeleccionados.map((item) => (
                <p key={item.material.id} className="text-sm" style={{ color: "var(--foreground)" }}>
                  • {item.material.nombre} ({item.cantidad} {item.material.unidad})
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Fecha de entrega */}
        {fechaEntregaEstimada && (
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span style={{ color: "var(--foreground)" }}>
              Entrega: {new Date(fechaEntregaEstimada).toLocaleDateString("es-CR", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        )}

        <Separator />

        {/* Totales */}
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

        {/* Pagos */}
        {pagos.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <DollarSign className="h-3 w-3" />
              <span>{pagos.length} pago{pagos.length !== 1 ? "s" : ""} registrado{pagos.length !== 1 ? "s" : ""}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: "var(--muted-foreground)" }}>Pagado</span>
              <span style={{ color: "var(--foreground)" }}>{formatCurrency(totalPagado)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: "var(--muted-foreground)" }}>Saldo pendiente</span>
              <span className={saldoPendiente <= 0 ? "text-green-600 font-medium" : "text-destructive font-medium"}>
                {formatCurrency(saldoPendiente)}
              </span>
            </div>
          </div>
        )}

        {/* Estado */}
        <div className="space-y-2 pt-2">
          {clienteSeleccionado && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Check className="h-3 w-3" />
              <span>Cliente seleccionado</span>
            </div>
          )}
          {descripcion && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Check className="h-3 w-3" />
              <span>Descripción agregada</span>
            </div>
          )}
          {subtotal > 0 && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Check className="h-3 w-3" />
              <span>Precio definido</span>
            </div>
          )}
        </div>

        <Button
          onClick={onConfirmar}
          disabled={!isValid}
          className="w-full"
          size="lg"
        >
          <Check className="h-4 w-4 mr-2" />
          Confirmar Pedido
        </Button>

        {!clienteSeleccionado && (
          <p className="text-xs text-destructive text-center">
            Seleccione un cliente para continuar
          </p>
        )}
        
        {clienteSeleccionado && !descripcion && (
          <p className="text-xs text-destructive text-center">
            Agregue una descripción para continuar
          </p>
        )}
        
        {clienteSeleccionado && descripcion && subtotal <= 0 && (
          <p className="text-xs text-destructive text-center">
            Defina un precio para continuar
          </p>
        )}
      </CardContent>
    </Card>
  )
}
