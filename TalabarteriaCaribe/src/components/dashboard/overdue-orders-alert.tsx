import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"
import type { Pedido } from "@/data"
import { formatDate } from "./utils"
import { BadgeEstadoPedido } from "./badge-estado-pedido"

interface OverdueOrdersAlertProps {
  pedidosVencidos: Pedido[]
}

export function OverdueOrdersAlert({ pedidosVencidos }: OverdueOrdersAlertProps) {
  if (pedidosVencidos.length === 0) return null

  return (
    <Card className="border-destructive/40 bg-destructive/5">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-destructive flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          Pedidos Vencidos ({pedidosVencidos.length})
        </CardTitle>
        <CardDescription className="text-xs text-destructive/80">
          Pedidos urgentes que superaron su fecha de entrega estimada.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {pedidosVencidos.map((pedido) => (
          <div
            key={pedido.id}
            className="flex flex-col md:flex-row md:items-center justify-between rounded-lg border border-destructive/20 bg-background p-3 gap-2"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">#{pedido.id}</span>
                <p className="text-sm font-medium text-foreground">{pedido.nombreCliente}</p>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{pedido.descripcion}</p>
              <p className="text-xs font-semibold text-destructive mt-1">
                Venció el: {formatDate(pedido.fechaEntregaEstimada)}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <BadgeEstadoPedido estado={pedido.estado} />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
