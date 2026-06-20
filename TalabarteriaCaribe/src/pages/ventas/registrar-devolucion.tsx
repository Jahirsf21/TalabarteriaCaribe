import { useState } from "react"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ventas } from "@/data"
import { Minus, Plus, ArrowLeft, RotateCcw, CheckCircle2 } from "lucide-react"

export default function RegistrarDevolucion() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const venta = ventas.find((v) => v.id === Number(id))

  // Estado de cantidades devueltas por producto (key = productoId)
  const [cantidades, setCantidades] = useState<Record<number, number>>(
    () =>
      Object.fromEntries(
        (venta?.items ?? []).map((item) => [item.productoId, 0])
      )
  )
  const [motivo, setMotivo] = useState("")

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

  const formatCurrency = (amount: number) =>
    `₡${amount.toLocaleString("es-CR")}`

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString("es-CR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })

  const setCantidad = (productoId: number, value: number, max: number) => {
    setCantidades((prev) => ({
      ...prev,
      [productoId]: Math.max(0, Math.min(max, value)),
    }))
  }

  // Items con al menos 1 devuelto
  const itemsConDevolucion = venta.items.filter(
    (item) => cantidades[item.productoId] > 0
  )

  const montoDevuelto = venta.items.reduce(
    (sum, item) =>
      sum + (cantidades[item.productoId] ?? 0) * item.precioUnitario,
    0
  )

  const totalDevuelto = itemsConDevolucion.length
  const totalArticulos = venta.items.reduce((s, i) => s + i.cantidad, 0)
  const tipoDevolucion: "total" | "parcial" =
    totalDevuelto === venta.items.length &&
    venta.items.every(
      (item) => cantidades[item.productoId] === item.cantidad
    )
      ? "total"
      : "parcial"

  const puedeConfirmar =
    itemsConDevolucion.length > 0 && motivo.trim().length >= 5

  const confirmarDevolucion = () => {
    if (!puedeConfirmar) return

    const payload = {
      ventaId: venta.id,
      tipo: tipoDevolucion,
      motivo,
      items: itemsConDevolucion.map((item) => ({
        productoId: item.productoId,
        nombreProducto: item.nombreProducto,
        cantidadDevuelta: cantidades[item.productoId],
        precioUnitario: item.precioUnitario,
        subtotalDevuelto:
          cantidades[item.productoId] * item.precioUnitario,
      })),
      montoDevuelto,
    }

    console.log("Devolución registrada:", payload)
    alert("Devolución registrada exitosamente")
    navigate(`/ventas/${venta.id}`)
  }

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
                  onClick={(e) => { e.preventDefault(); navigate("/ventas") }}
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Ventas
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink
                  href="#"
                  onClick={(e) => { e.preventDefault(); navigate(`/ventas/${venta.id}`) }}
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Venta #{venta.id}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage
                  style={{ color: "var(--foreground)", fontWeight: 600 }}
                >
                  Registrar Devolución
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
              onClick={() => navigate(`/ventas/${venta.id}`)}
              className="h-8 w-8 shrink-0"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1
                className="text-xl font-bold font-serif"
                style={{ color: "var(--foreground)" }}
              >
                Registrar Devolución
              </h1>
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                Venta #{venta.id} — {venta.nombreCliente} — {formatDate(venta.fecha)}
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Columna principal */}
            <div className="space-y-6 lg:col-span-2">

              {/* Selección de productos a devolver */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    1. Seleccionar Productos a Devolver
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Ingrese la cantidad devuelta de cada producto. Deje en 0 los que no se devuelven.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {venta.items.map((item) => {
                    const cant = cantidades[item.productoId] ?? 0
                    return (
                      <div
                        key={item.productoId}
                        className="rounded-lg border p-4 space-y-3 transition-colors"
                        style={{
                          borderColor:
                            cant > 0
                              ? "rgba(239,68,68,0.4)"
                              : "var(--border)",
                          backgroundColor:
                            cant > 0
                              ? "rgba(239,68,68,0.03)"
                              : "transparent",
                        }}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p
                              className="font-medium text-sm"
                              style={{ color: "var(--foreground)" }}
                            >
                              {item.nombreProducto}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatCurrency(item.precioUnitario)} c/u ·{" "}
                              {item.cantidad} vendido
                              {item.cantidad !== 1 ? "s" : ""}
                            </p>
                          </div>
                          {cant > 0 && (
                            <Badge
                              variant="destructive"
                              className="shrink-0 text-xs"
                            >
                              {cant} devuelto{cant !== 1 ? "s" : ""}
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <Label className="text-xs text-muted-foreground">
                            Cantidad a devolver:
                          </Label>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() =>
                                setCantidad(
                                  item.productoId,
                                  cant - 1,
                                  item.cantidad
                                )
                              }
                              disabled={cant <= 0}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <Input
                              type="number"
                              min={0}
                              max={item.cantidad}
                              value={cant}
                              onChange={(e) =>
                                setCantidad(
                                  item.productoId,
                                  parseInt(e.target.value) || 0,
                                  item.cantidad
                                )
                              }
                              className="w-16 text-center h-7 text-sm"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() =>
                                setCantidad(
                                  item.productoId,
                                  cant + 1,
                                  item.cantidad
                                )
                              }
                              disabled={cant >= item.cantidad}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          {cant > 0 && (
                            <p className="text-xs text-destructive font-medium ml-auto">
                              −{formatCurrency(cant * item.precioUnitario)}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>

              {/* Motivo */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">2. Motivo de la Devolución</CardTitle>
                  <CardDescription className="text-xs">
                    Describa el motivo por el cual el cliente realiza la devolución.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Ej: El producto presentaba defecto en la costura al recibirlo..."
                    value={motivo}
                    onChange={(e) => setMotivo(e.target.value)}
                    rows={4}
                    className="resize-none text-sm"
                  />
                  {motivo.trim().length > 0 && motivo.trim().length < 5 && (
                    <p className="text-xs text-destructive mt-1">
                      El motivo debe tener al menos 5 caracteres.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Columna lateral: Resumen */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <RotateCcw className="h-4 w-4" style={{ color: "#B8895B" }} />
                    Resumen de Devolución
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Tipo */}
                  {itemsConDevolucion.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Tipo:</span>
                      <Badge
                        variant={tipoDevolucion === "total" ? "destructive" : "outline"}
                        className={
                          tipoDevolucion === "parcial"
                            ? "border-amber-400 bg-amber-50 text-amber-800"
                            : ""
                        }
                      >
                        {tipoDevolucion === "total" ? "Total" : "Parcial"}
                      </Badge>
                    </div>
                  )}

                  {/* Productos a devolver */}
                  {itemsConDevolucion.length > 0 ? (
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Productos a devolver
                      </p>
                      {itemsConDevolucion.map((item) => (
                        <div
                          key={item.productoId}
                          className="flex items-start justify-between gap-2 text-sm"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="truncate text-xs" style={{ color: "var(--foreground)" }}>
                              {item.nombreProducto}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {cantidades[item.productoId]} ×{" "}
                              {formatCurrency(item.precioUnitario)}
                            </p>
                          </div>
                          <span className="text-xs font-medium text-destructive shrink-0">
                            −{formatCurrency(
                              cantidades[item.productoId] * item.precioUnitario
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground text-center py-4">
                      Seleccione al menos un producto a devolver
                    </p>
                  )}

                  <Separator />

                  <div className="flex justify-between font-semibold text-sm">
                    <span style={{ color: "var(--foreground)" }}>Monto a devolver</span>
                    <span className="text-destructive">
                      {formatCurrency(montoDevuelto)}
                    </span>
                  </div>

                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Total original</span>
                    <span>{formatCurrency(venta.total)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Artículos originales</span>
                    <span>{totalArticulos}</span>
                  </div>

                  <Separator />

                  <Button
                    onClick={confirmarDevolucion}
                    disabled={!puedeConfirmar}
                    className="w-full"
                    size="lg"
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Confirmar Devolución
                  </Button>

                  {!puedeConfirmar && (
                    <p className="text-xs text-destructive text-center">
                      {itemsConDevolucion.length === 0
                        ? "Seleccione al menos un producto"
                        : "Complete el motivo de la devolución"}
                    </p>
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