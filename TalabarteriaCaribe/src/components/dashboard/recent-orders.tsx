import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarCheck } from "lucide-react"
import type { Pedido } from "@/data"
import { formatCurrency } from "./utils"
import { BadgeEstadoPedido } from "./badge-estado-pedido"

interface RecentOrdersProps {
  pedidos: Pedido[]
}

export function RecentOrders({ pedidos }: RecentOrdersProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base" style={{ color: "var(--foreground)" }}>
          <CalendarCheck className="h-4 w-4" style={{ color: "#B8895B" }} />
          Pedidos Recientes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {pedidos.slice(0, 5).map((pedido) => (
          <div
            key={pedido.id}
            className="flex items-start justify-between rounded-lg border px-3 py-2"
            style={{
              backgroundColor: "var(--background)",
              borderColor: "var(--border)",
            }}
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                {pedido.nombreCliente}
              </p>
              <p className="mt-0.5 truncate text-xs" style={{ color: "var(--muted-foreground)" }}>
                {pedido.descripcion.length > 58
                  ? pedido.descripcion.slice(0, 58) + "…"
                  : pedido.descripcion}
              </p>
              {pedido.saldoPendiente > 0 && (
                <p className="mt-1 text-xs font-semibold" style={{ color: "#6B3F1F" }}>
                  Saldo: {formatCurrency(pedido.saldoPendiente)}
                </p>
              )}
            </div>
            <div className="ml-3 shrink-0">
              <BadgeEstadoPedido estado={pedido.estado} />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
