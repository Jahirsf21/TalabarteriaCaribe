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
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Calendar, DollarSign, Package, User, CheckCircle2, Clock, Plus } from "lucide-react"
import { pedidos } from "@/data"
import type { EstadoPedido } from "@/data"

function BadgeEstadoPedido({ estado }: { estado: EstadoPedido }) {
  switch (estado) {
    case "pendiente":
      return <Badge variant="secondary">Pendiente</Badge>
    case "en_produccion":
      return (
        <Badge className="border-blue-300 bg-blue-100 text-blue-800">
          En Producción
        </Badge>
      )
    case "listo":
      return (
        <Badge className="border-green-300 bg-green-100 text-green-800">
          Listo
        </Badge>
      )
    case "entregado":
      return (
        <Badge className="border-emerald-300 bg-emerald-100 text-emerald-800">
          Entregado
        </Badge>
      )
    case "cancelado":
      return <Badge variant="destructive">Cancelado</Badge>
  }
}

export default function DetallePedido() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const pedido = pedidos.find((p) => p.id === parseInt(id || ""))

  const [nuevoPago, setNuevoPago] = useState({ monto: "", metodoPago: "efectivo" as "efectivo" | "sinpe", referenciaSinpe: "" })
  const [mostrarFormularioPago, setMostrarFormularioPago] = useState(false)
  const [estadoEditando, setEstadoEditando] = useState(false)

  if (!pedido) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Pedido no encontrado</p>
              <Button onClick={() => navigate("/pedidos")} className="mt-4">
                Volver a pedidos
              </Button>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
  }

  const formatCurrency = (amount: number) => `₡${amount.toLocaleString("es-CR")}`

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("es-CR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })

  const handleAgregarPago = () => {
    const monto = parseFloat(nuevoPago.monto)
    if (!monto || monto <= 0) {
      alert("Por favor ingrese un monto válido")
      return
    }

    if (nuevoPago.metodoPago === "sinpe" && !nuevoPago.referenciaSinpe) {
      alert("Por favor ingrese la referencia SINPE")
      return
    }

    // Aquí se implementaría la lógica para guardar el pago
    console.log("Nuevo pago:", { ...nuevoPago, monto, fecha: new Date().toISOString() })
    alert("Pago registrado exitosamente")
    setNuevoPago({ monto: "", metodoPago: "efectivo", referenciaSinpe: "" })
    setMostrarFormularioPago(false)
  }

  const handleMarcarEntregado = () => {
    // Aquí se implementaría la lógica para marcar como entregado
    alert("Pedido marcado como entregado")
  }

  const handleCambiarEstado = (nuevoEstado: EstadoPedido) => {
    // Aquí se implementaría la lógica para cambiar el estado
    console.log("Cambiando estado de", pedido.estado, "a", nuevoEstado)
    alert(`Estado cambiado a ${nuevoEstado}`)
    setEstadoEditando(false)
  }

  const totalPagado = pedido.pagos.reduce((sum, pago) => sum + pago.monto, 0)
  const pagadoEnTotalidad = pedido.saldoPendiente <= 0

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
                  href="/pedidos"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Pedidos
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage
                  style={{ color: "var(--foreground)", fontWeight: 600 }}
                >
                  Pedido #{pedido.id}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
          {/* Title */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/pedidos")}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1">
              <h1
                className="text-xl font-semibold font-serif"
                style={{ color: "var(--foreground)" }}
              >
                Pedido #{pedido.id}
              </h1>
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                Detalle completo del pedido
              </p>
            </div>
            <BadgeEstadoPedido estado={pedido.estado} />
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Columna izquierda: Información del pedido */}
            <div className="space-y-6 lg:col-span-2">
              {/* Información del cliente */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2" style={{ color: "var(--foreground)" }}>
                    <User className="h-4 w-4" />
                    Cliente Vinculado
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-medium" style={{ color: "var(--foreground)" }}>
                      {pedido.nombreCliente}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ID del cliente: {pedido.clienteId}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Descripción del producto */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2" style={{ color: "var(--foreground)" }}>
                    <Package className="h-4 w-4" />
                    Descripción del Producto Personalizado
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm" style={{ color: "var(--foreground)" }}>
                    {pedido.descripcion}
                  </p>
                  {pedido.notas && (
                    <div className="mt-3 p-3 bg-amber-50 text-amber-800 rounded border border-amber-200">
                      <p className="text-xs font-semibold">Notas:</p>
                      <p className="text-sm">{pedido.notas}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Dimensiones y materiales */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2" style={{ color: "var(--foreground)" }}>
                    <Package className="h-4 w-4" />
                    Especificaciones
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pedido.dimensiones && (
                    <div>
                      <Label className="text-xs">Dimensiones / Medidas</Label>
                      <p className="text-sm mt-1" style={{ color: "var(--foreground)" }}>
                        {pedido.dimensiones}
                      </p>
                    </div>
                  )}
                  {pedido.materiales && (
                    <div>
                      <Label className="text-xs">Materiales Solicitados</Label>
                      <p className="text-sm mt-1" style={{ color: "var(--foreground)" }}>
                        {pedido.materiales}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Fechas y estado */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2" style={{ color: "var(--foreground)" }}>
                    <Calendar className="h-4 w-4" />
                    Fechas y Estado
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs">Fecha de entrega pactada</Label>
                      <p className="text-sm mt-1" style={{ color: "var(--foreground)" }}>
                        {formatDate(pedido.fechaEntregaEstimada)}
                      </p>
                    </div>
                    <div>
                      <Label className="text-xs">Fecha de entrega real</Label>
                      <p className="text-sm mt-1" style={{ color: "var(--foreground)" }}>
                        {pedido.fechaEntregaReal ? formatDate(pedido.fechaEntregaReal) : "Pendiente"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs">Estado actual</Label>
                    <div className="mt-2">
                      {!estadoEditando ? (
                        <div className="flex items-center gap-2">
                          <BadgeEstadoPedido estado={pedido.estado} />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEstadoEditando(true)}
                            className="h-7 px-2"
                          >
                            Cambiar
                          </Button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <select
                            value={pedido.estado}
                            onChange={(e) => handleCambiarEstado(e.target.value as EstadoPedido)}
                            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          >
                            <option value="pendiente">Pendiente</option>
                            <option value="en_produccion">En Producción</option>
                            <option value="listo">Listo</option>
                            <option value="entregado">Entregado</option>
                            <option value="cancelado">Cancelado</option>
                          </select>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEstadoEditando(false)}
                            className="h-9 px-2"
                          >
                            Cancelar
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  {pedido.estado === "listo" && !pedido.fechaEntregaReal && (
                    <Button
                      onClick={handleMarcarEntregado}
                      className="w-full"
                      style={{ backgroundColor: "#B8895B" }}
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Marcar como Entregado
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Historial de estados */}
              {pedido.historialEstados.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2" style={{ color: "var(--foreground)" }}>
                      <Clock className="h-4 w-4" />
                      Historial de Estados
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {pedido.historialEstados.map((cambio, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <Badge variant="outline" className="text-xs">
                            {cambio.estadoAnterior}
                          </Badge>
                          <span className="text-muted-foreground">→</span>
                          <Badge variant="outline" className="text-xs">
                            {cambio.estadoNuevo}
                          </Badge>
                          <span className="text-muted-foreground text-xs ml-auto">
                            {formatDate(cambio.fecha)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Columna derecha: Control de pagos */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2" style={{ color: "var(--foreground)" }}>
                    <DollarSign className="h-4 w-4" />
                    Control de Pagos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Resumen financiero */}
                  <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Valor total</span>
                      <span className="font-semibold" style={{ color: "var(--foreground)" }}>
                        {formatCurrency(pedido.precioTotal)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Anticipo registrado</span>
                      <span className="font-semibold" style={{ color: "var(--foreground)" }}>
                        {formatCurrency(totalPagado)}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Saldo pendiente</span>
                      <span className="font-bold text-lg" style={{ color: pedido.saldoPendiente > 0 ? "var(--foreground)" : "green" }}>
                        {formatCurrency(pedido.saldoPendiente)}
                      </span>
                    </div>
                    {pagadoEnTotalidad && (
                      <div className="flex items-center justify-center gap-2 pt-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-600">
                          Pagado en totalidad
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Historial de pagos */}
                  <div>
                    <Label className="text-xs">Historial de pagos parciales</Label>
                    <div className="mt-2 space-y-2">
                      {pedido.pagos.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          No hay pagos registrados
                        </p>
                      ) : (
                        pedido.pagos.map((pago, index) => (
                          <div key={index} className="p-3 border rounded-lg" style={{ borderColor: "var(--border)" }}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>
                                {formatCurrency(pago.monto)}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {pago.metodoPago === "efectivo" ? "Efectivo" : "SINPE"}
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center text-xs text-muted-foreground">
                              <span>{formatDate(pago.fecha)}</span>
                              {pago.referenciaSinpe && <span>Ref: {pago.referenciaSinpe}</span>}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Botón agregar pago */}
                  {!pagadoEnTotalidad && pedido.estado !== "cancelado" && (
                    <>
                      {!mostrarFormularioPago ? (
                        <Button
                          onClick={() => setMostrarFormularioPago(true)}
                          className="w-full"
                          variant="outline"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Registrar Pago
                        </Button>
                      ) : (
                        <div className="space-y-3 p-4 border rounded-lg" style={{ borderColor: "var(--border)" }}>
                          <div className="space-y-2">
                            <Label className="text-xs">Monto</Label>
                            <Input
                              type="number"
                              placeholder="0"
                              value={nuevoPago.monto}
                              onChange={(e) => setNuevoPago({ ...nuevoPago, monto: e.target.value })}
                              className="text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs">Método de pago</Label>
                            <div className="flex gap-2">
                              <Button
                                type="button"
                                variant={nuevoPago.metodoPago === "efectivo" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setNuevoPago({ ...nuevoPago, metodoPago: "efectivo" })}
                                className="flex-1"
                              >
                                Efectivo
                              </Button>
                              <Button
                                type="button"
                                variant={nuevoPago.metodoPago === "sinpe" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setNuevoPago({ ...nuevoPago, metodoPago: "sinpe" })}
                                className="flex-1"
                              >
                                SINPE
                              </Button>
                            </div>
                          </div>
                          {nuevoPago.metodoPago === "sinpe" && (
                            <div className="space-y-2">
                              <Label className="text-xs">Referencia SINPE</Label>
                              <Input
                                placeholder="SINPE-XXXXX"
                                value={nuevoPago.referenciaSinpe}
                                onChange={(e) => setNuevoPago({ ...nuevoPago, referenciaSinpe: e.target.value })}
                                className="text-sm"
                              />
                            </div>
                          )}
                          <div className="flex gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => {
                                setMostrarFormularioPago(false)
                                setNuevoPago({ monto: "", metodoPago: "efectivo", referenciaSinpe: "" })
                              }}
                              className="flex-1"
                            >
                              Cancelar
                            </Button>
                            <Button
                              onClick={handleAgregarPago}
                              className="flex-1"
                              style={{ backgroundColor: "#B8895B" }}
                            >
                              Confirmar
                            </Button>
                          </div>
                        </div>
                      )}
                    </>
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
