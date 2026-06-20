import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, TrendingUp, CalendarCheck, AlertTriangle } from "lucide-react"
import { dashboardStats } from "@/data"
import { formatCurrency } from "./utils"

interface DashboardStatsProps {
  pedidosVencidosCount: number
}

export function DashboardStats({ pedidosVencidosCount }: DashboardStatsProps) {
  return (
    <section aria-label="Resumen del negocio">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {/* Ventas hoy */}
        <Card>
          <CardHeader className="pb-1">
            <CardDescription className="flex items-center gap-1.5 text-xs">
              <ShoppingBag className="h-3.5 w-3.5" style={{ color: "#B8895B" }} />
              Ventas hoy
            </CardDescription>
            <CardTitle className="text-xl font-bold tabular-nums md:text-2xl" style={{ color: "var(--foreground)" }}>
              +{formatCurrency(dashboardStats.ventasHoy.total)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="outline" className="text-xs">
              {dashboardStats.ventasHoy.cantidad} ventas
            </Badge>
          </CardContent>
        </Card>

        {/* Ventas del mes */}
        <Card>
          <CardHeader className="pb-1">
            <CardDescription className="flex items-center gap-1.5 text-xs">
              <TrendingUp className="h-3.5 w-3.5" style={{ color: "#B8895B" }} />
              Ventas del mes
            </CardDescription>
            <CardTitle className="text-xl font-bold tabular-nums md:text-2xl" style={{ color: "var(--foreground)" }}>
              +{formatCurrency(dashboardStats.ventasMesActual.total)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge className="border-green-300 bg-green-100 text-green-800 text-xs">
              +{dashboardStats.ventasMesActual.comparacionMesAnterior}%
              vs mes anterior
            </Badge>
          </CardContent>
        </Card>

        {/* Pedidos activos */}
        <Card>
          <CardHeader className="pb-1">
            <CardDescription className="flex items-center gap-1.5 text-xs">
              <CalendarCheck className="h-3.5 w-3.5" style={{ color: "#B8895B" }} />
              Pedidos activos
            </CardDescription>
            <CardTitle className="text-xl font-bold tabular-nums md:text-2xl" style={{ color: "var(--foreground)" }}>
              {dashboardStats.pedidosActivos}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant={pedidosVencidosCount > 0 ? "destructive" : "secondary"} className="text-xs">
              {pedidosVencidosCount} vencido{pedidosVencidosCount !== 1 && "s"}
            </Badge>
          </CardContent>
        </Card>

        {/* Deuda proveedores */}
        <Card>
          <CardHeader className="pb-1">
            <CardDescription className="flex items-center gap-1.5 text-xs">
              <AlertTriangle className="h-3.5 w-3.5" style={{ color: "#B8895B" }} />
              Deuda proveedores
            </CardDescription>
            <CardTitle className="text-xl font-bold tabular-nums md:text-2xl" style={{ color: "var(--foreground)" }}>
              -{formatCurrency(dashboardStats.deudaProveedoresPendiente)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge className="border-amber-300 bg-amber-100 text-amber-800 text-xs">
              Pendiente de pago
            </Badge>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
