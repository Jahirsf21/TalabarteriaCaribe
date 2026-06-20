import { useMemo } from "react"
import { useNavigate } from "react-router"

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import {
  logAuditoria,
  materiales,
  movimientosInventario,
  pedidos,
  productos,
  ventas,
} from "@/data"

import { getGreeting, getTodayString } from "@/components/dashboard/utils"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { OverdueOrdersAlert } from "@/components/dashboard/overdue-orders-alert"
import { StockAlerts } from "@/components/dashboard/stock-alerts"
import { RecentOrders } from "@/components/dashboard/recent-orders"
import { RecentSales } from "@/components/dashboard/recent-sales"
import { InventoryMovements } from "@/components/dashboard/inventory-movements"
import { AuditLog } from "@/components/dashboard/audit-log"


// ─── Dashboard ────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const navigate = useNavigate()

  const usuario = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("usuario") || "{}")
    } catch {
      return {}
    }
  }, [])

  // Pedidos vencidos: fechaEntregaEstimada < hoy y no entregado/cancelado
  const pedidosVencidos = useMemo(() => {
    const hoy = new Date("2026-06-19T20:52:26-06:00")
    return pedidos.filter((p) => {
      const fechaEstimada = new Date(p.fechaEntregaEstimada)
      return fechaEstimada < hoy && p.estado !== "entregado" && p.estado !== "cancelado"
    })
  }, [])

  // Items con stock bajo o agotado (productos + materias primas)
  const stockAlerts = useMemo(() => {
    const fromProductos = productos
      .filter((p) => p.estadoStock !== "normal")
      .map((p) => ({
        nombre: p.nombre,
        tipo: p.categoria,
        stock: `${p.stock} uds.`,
        estado: p.estadoStock as "bajo" | "agotado",
      }))

    const fromMateriales = materiales
      .filter((m) => m.estadoStock !== "normal")
      .map((m) => ({
        nombre: m.nombre,
        tipo: "Materia prima",
        stock: `${m.stock} ${m.unidad}`,
        estado: m.estadoStock as "bajo" | "agotado",
      }))

    return [...fromProductos, ...fromMateriales]
  }, [])

  // Ventas ordenadas más reciente primero
  const ventasOrdenadas = useMemo(
    () =>
      [...ventas].sort(
        (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
      ),
    []
  )

  const nombreCorto =
    (usuario?.nombre as string | undefined)?.split(" ")[0] ?? "Hellen"

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>

        {/* ── Header sticky ── */}
        <header
          className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b px-4 backdrop-blur-sm"
          style={{
            backgroundColor: "rgba(248,243,236,0.95)",
            borderColor: "var(--border)",
          }}
        >
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink
                  href="#"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Talabartería Caribe
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage
                  style={{ color: "var(--foreground)", fontWeight: 600 }}
                >
                  Dashboard
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* ── Contenido principal ── */}
        <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">

          {/* Saludo */}
          <div className="flex justify-between items-center">
            <div>
              <h1
                className="text-xl font-semibold font-serif"
                style={{ color: "var(--foreground)" }}
              >
                {getGreeting()}, {nombreCorto} 
              </h1>
              <p className="mt-0.5 text-sm" style={{ color: "var(--muted-foreground)" }}>
                {getTodayString()}
              </p>
            </div>
          </div>

          <QuickActions onNavigate={navigate} />

          <DashboardStats pedidosVencidosCount={pedidosVencidos.length} />

          <OverdueOrdersAlert pedidosVencidos={pedidosVencidos} />

          <div className="grid gap-4 md:grid-cols-2">
            <StockAlerts stockAlerts={stockAlerts} />
            <RecentOrders pedidos={pedidos} />
          </div>

          <RecentSales ventas={ventasOrdenadas} />

          <div className="grid gap-4 md:grid-cols-2">
            <InventoryMovements movimientos={movimientosInventario} />
            <AuditLog logs={logAuditoria} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
