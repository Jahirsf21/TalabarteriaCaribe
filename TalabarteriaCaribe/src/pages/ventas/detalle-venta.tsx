import { useNavigate, useParams } from "react-router"
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
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ventas } from "@/data"
import { devoluciones } from "@/data/devoluciones"
import type { MetodoPago, EstadoVenta } from "@/data"
import {
  ArrowLeft,
  RotateCcw,
  Receipt,
  CreditCard,
  Package,
  AlertTriangle,
  ClipboardList,
  CheckCircle2,
} from "lucide-react"

function BadgeEstadoVenta({ estado }: { estado: EstadoVenta }) {
  if (estado === "con_devolucion") {
    return <Badge variant="destructive">Con Devolución</Badge>
  }
  return (
    <Badge className="border-green-300 bg-green-100 text-green-800">
      Completada
    </Badge>
  )
}

function BadgeMetodoPago({ metodo }: { metodo: MetodoPago }) {
  switch (metodo) {
    case "efectivo":
      return <Badge variant="secondary">Efectivo</Badge>
    case "sinpe":
      return (
        <Badge className="border-blue-300 bg-blue-100 text-blue-800">
          SINPE
        </Badge>
      )
    case "credito":
      return (
        <Badge className="border-amber-300 bg-amber-100 text-amber-800">
          Crédito
        </Badge>
      )
  }
}

export default function DetalleVenta() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const venta = ventas.find((v) => v.id === Number(id))

  if (!venta) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-1 items-center justify-center p-8">
            <div className="text-center space-y-2">
              <p className="text-muted-foreground">Venta no encontrada.</p>
              <Button variant="outline" onClick={() => navigate("/ventas")}>
                Volver a Ventas
              </Button>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
  }

  const devolucion = devoluciones.find((d) => d.ventaId === venta.id)

  const formatCurrency = (amount: number) =>
    `₡${amount.toLocaleString("es-CR")}`

  const formatDateHour = (iso: string) =>
    new Date(iso).toLocaleString("es-CR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        {/* Header */}
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
                  onClick={(e) => { e.preventDefault(); navigate("/ventas") }}
                >
                  Ventas
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage
                  style={{ color: "var(--foreground)", fontWeight: 600 }}
                >
                  Venta #{venta.id}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
          {/* Back + title */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/ventas")}
              className="h-8 w-8 shrink-0"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1
                  className="text-xl font-bold font-serif"
                  style={{ color: "var(--foreground)" }}
                >
                  Venta #{venta.id}
                </h1>
                <BadgeEstadoVenta estado={venta.estado} />
              </div>
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                {formatDateHour(venta.fecha)}
              </p>
            </div>
            {/* Botón registrar devolución solo si no hay una ya */}
            {!devolucion && (
              <Button
                onClick={() => navigate(`/ventas/${venta.id}/devolucion`)}
                variant="outline"
                className="shrink-0 flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Registrar Devolución
              </Button>
            )}
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Columna principal */}
            <div className="space-y-6 lg:col-span-2">

              {/* Información general */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Receipt className="h-4 w-4" style={{ color: "#B8895B" }} />
                    Información General
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Cliente</p>
                    <p className="font-medium" style={{ color: "var(--foreground)" }}>
                      {venta.nombreCliente}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Método de Pago</p>
                    <BadgeMetodoPago metodo={venta.metodoPago} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Fecha y Hora</p>
                    <p style={{ color: "var(--foreground)" }}>{formatDateHour(venta.fecha)}</p>
                  </div>
                  {venta.pedidoOrigenId && (
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Pedido de Origen</p>
                      <div className="flex items-center gap-2">
                        <ClipboardList className="h-4 w-4 text-muted-foreground" />
                        <button
                          onClick={() => navigate(`/pedidos`)}
                          className="text-primary underline underline-offset-2 text-sm"
                        >
                          Pedido #{venta.pedidoOrigenId}
                        </button>
                      </div>
                    </div>
                  )}
                  {venta.metodoPago === "sinpe" && venta.referenciaSinpe && (
                    <div className="space-y-1 sm:col-span-2">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        N.° Confirmación SINPE
                      </p>
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <p
                          className="font-mono text-sm font-semibold"
                          style={{ color: "var(--foreground)" }}
                        >
                          {venta.referenciaSinpe}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Productos y cantidades */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Package className="h-4 w-4" style={{ color: "#B8895B" }} />
                    Productos Vendidos
                  </CardTitle>
                  <CardDescription>
                    {venta.items.length} artículo{venta.items.length !== 1 ? "s" : ""}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  {/* Mobile */}
                  <div className="md:hidden space-y-2 p-4">
                    {venta.items.map((item) => (
                      <div
                        key={item.productoId}
                        className="rounded-lg border p-3 space-y-1"
                        style={{ borderColor: "var(--border)" }}
                      >
                        <p className="font-medium text-sm" style={{ color: "var(--foreground)" }}>
                          {item.nombreProducto}
                        </p>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>
                            {item.cantidad} × {formatCurrency(item.precioUnitario)}
                          </span>
                          <span className="font-semibold" style={{ color: "var(--foreground)" }}>
                            {formatCurrency(item.subtotal)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Desktop */}
                  <div className="hidden md:block overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Producto</TableHead>
                          <TableHead className="text-right">Precio unitario</TableHead>
                          <TableHead className="text-right">Cantidad</TableHead>
                          <TableHead className="text-right">Subtotal</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {venta.items.map((item) => (
                          <TableRow key={item.productoId}>
                            <TableCell className="font-medium">{item.nombreProducto}</TableCell>
                            <TableCell className="text-right text-muted-foreground">
                              {formatCurrency(item.precioUnitario)}
                            </TableCell>
                            <TableCell className="text-right">{item.cantidad}</TableCell>
                            <TableCell className="text-right font-medium">
                              {formatCurrency(item.subtotal)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              {/* Devolución vinculada */}
              {devolucion && (
                <Card
                  className="border-destructive/30"
                  style={{ backgroundColor: "rgba(239,68,68,0.03)" }}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <CardTitle className="text-base flex items-center gap-2 text-destructive">
                        <AlertTriangle className="h-4 w-4" />
                        Devolución Registrada
                      </CardTitle>
                      <Badge
                        variant={devolucion.tipo === "total" ? "destructive" : "outline"}
                        className={
                          devolucion.tipo === "parcial"
                            ? "border-amber-400 bg-amber-50 text-amber-800"
                            : ""
                        }
                      >
                        {devolucion.tipo === "total" ? "Total" : "Parcial"}
                      </Badge>
                    </div>
                    <CardDescription>
                      Registrada el {formatDateHour(devolucion.fecha)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Motivo */}
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Motivo de Devolución
                      </p>
                      <p className="text-sm" style={{ color: "var(--foreground)" }}>
                        {devolucion.motivo}
                      </p>
                    </div>

                    {/* Productos devueltos */}
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Productos Devueltos
                      </p>
                      <div className="rounded-lg border border-destructive/20 overflow-hidden">
                        {/* Mobile */}
                        <div className="md:hidden space-y-2 p-3">
                          {devolucion.items.map((item) => (
                            <div
                              key={item.productoId}
                              className="rounded border p-2 space-y-1"
                              style={{ borderColor: "var(--border)" }}
                            >
                              <p className="font-medium text-sm" style={{ color: "var(--foreground)" }}>
                                {item.nombreProducto}
                              </p>
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>{item.cantidadDevuelta} devuelto(s)</span>
                                <span className="font-semibold text-destructive">
                                  −{formatCurrency(item.subtotalDevuelto)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                        {/* Desktop */}
                        <div className="hidden md:block overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Producto</TableHead>
                                <TableHead className="text-right">Precio unit.</TableHead>
                                <TableHead className="text-right">Cant. devuelta</TableHead>
                                <TableHead className="text-right">Subtotal devuelto</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {devolucion.items.map((item) => (
                                <TableRow key={item.productoId}>
                                  <TableCell className="font-medium">{item.nombreProducto}</TableCell>
                                  <TableCell className="text-right text-muted-foreground">
                                    {formatCurrency(item.precioUnitario)}
                                  </TableCell>
                                  <TableCell className="text-right">{item.cantidadDevuelta}</TableCell>
                                  <TableCell className="text-right font-medium text-destructive">
                                    −{formatCurrency(item.subtotalDevuelto)}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </div>

                    {/* Total devuelto */}
                    <div className="flex items-center justify-between rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3">
                      <span className="text-sm font-semibold text-destructive">Total Devuelto</span>
                      <span className="text-base font-bold text-destructive">
                        −{formatCurrency(devolucion.montoDevuelto)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Columna lateral: Resumen financiero */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" style={{ color: "#B8895B" }} />
                    Resumen de la Venta
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span style={{ color: "var(--foreground)" }}>
                      {formatCurrency(venta.subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">IVA (13%)</span>
                    <span style={{ color: "var(--foreground)" }}>
                      {formatCurrency(venta.iva)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-base font-semibold">
                    <span style={{ color: "var(--foreground)" }}>Total</span>
                    <span style={{ color: "var(--foreground)" }}>
                      {formatCurrency(venta.total)}
                    </span>
                  </div>

                  {devolucion && (
                    <>
                      <Separator />
                      <div className="flex justify-between text-destructive font-semibold">
                        <span>Devuelto</span>
                        <span>−{formatCurrency(devolucion.montoDevuelto)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-base">
                        <span style={{ color: "var(--foreground)" }}>Neto cobrado</span>
                        <span style={{ color: "var(--foreground)" }}>
                          {formatCurrency(venta.total - devolucion.montoDevuelto)}
                        </span>
                      </div>
                    </>
                  )}

                  <Separator />

                  <div className="space-y-2 pt-1">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-muted-foreground text-xs">Método de pago:</span>
                      <BadgeMetodoPago metodo={venta.metodoPago} />
                    </div>
                    {venta.metodoPago === "sinpe" && venta.referenciaSinpe && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Ref. SINPE:</span>
                        <span className="font-mono text-xs font-semibold" style={{ color: "var(--foreground)" }}>
                          {venta.referenciaSinpe}
                        </span>
                      </div>
                    )}
                    {venta.pedidoOrigenId && (
                      <div className="flex items-center gap-2">
                        <ClipboardList className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Pedido origen:</span>
                        <button
                          onClick={() => navigate(`/pedidos`)}
                          className="text-xs text-primary underline underline-offset-2"
                        >
                          #{venta.pedidoOrigenId}
                        </button>
                      </div>
                    )}
                  </div>

                  {!devolucion && (
                    <div className="pt-2">
                      <Button
                        onClick={() => navigate(`/ventas/${venta.id}/devolucion`)}
                        variant="outline"
                        className="w-full flex items-center gap-2"
                      >
                        <RotateCcw className="h-4 w-4" />
                        Registrar Devolución
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}