import { useState } from "react"
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
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

import { ClienteSelector } from "@/components/generar-pedido/cliente-selector"
import { PedidoDetallesForm } from "@/components/generar-pedido/pedido-detalles-form"
import { MaterialesSelector } from "@/components/generar-pedido/materiales-selector"
import { PagosManager } from "@/components/generar-pedido/pagos-manager"
import { PedidoResumen } from "@/components/generar-pedido/pedido-resumen"

import type { Cliente } from "@/data"
import type { PagoPedido } from "@/data/pedidos"
import type { Material } from "@/data/materiales"

interface MaterialPedido {
  material: Material
  cantidad: number
}

export default function GenerarPedido() {
  const navigate = useNavigate()
  
  const [clienteSeleccionado, setClienteSeleccionado] = useState<Cliente | null>(null)
  const [descripcion, setDescripcion] = useState("")
  const [dimensiones, setDimensiones] = useState("")
  const [subtotal, setSubtotal] = useState(0)
  const [fechaEntregaEstimada, setFechaEntregaEstimada] = useState("")
  const [notas, setNotas] = useState("")
  const [pagos, setPagos] = useState<PagoPedido[]>([])
  const [materialesSeleccionados, setMaterialesSeleccionados] = useState<MaterialPedido[]>([])

  const iva = subtotal * 0.13
  const total = subtotal + iva
  const totalPagado = pagos.reduce((sum, pago) => sum + pago.monto, 0)
  const saldoPendiente = total - totalPagado

  const agregarPago = (pago: PagoPedido) => {
    setPagos([...pagos, pago])
  }

  const eliminarPago = (index: number) => {
    setPagos(pagos.filter((_, i) => i !== index))
  }

  const agregarMaterial = (material: Material, cantidad: number) => {
    const existente = materialesSeleccionados.find((m) => m.material.id === material.id)
    if (existente) {
      setMaterialesSeleccionados(
        materialesSeleccionados.map((m) =>
          m.material.id === material.id ? { ...m, cantidad: m.cantidad + cantidad } : m
        )
      )
    } else {
      setMaterialesSeleccionados([...materialesSeleccionados, { material, cantidad }])
    }
  }

  const eliminarMaterial = (materialId: number) => {
    setMaterialesSeleccionados(materialesSeleccionados.filter((m) => m.material.id !== materialId))
  }

  const confirmarPedido = () => {
    if (!clienteSeleccionado || !descripcion || subtotal <= 0) return
    
    // Aquí se implementaría la lógica para guardar el pedido
    console.log("Pedido confirmado:", {
      cliente: clienteSeleccionado,
      descripcion,
      dimensiones,
      materiales: materialesSeleccionados.map((m) => ({
        nombre: m.material.nombre,
        cantidad: m.cantidad,
        unidad: m.material.unidad,
      })),
      subtotal,
      iva,
      precioTotal: total,
      pagos,
      saldoPendiente,
      fechaEntregaEstimada,
      notas,
    })
    
    alert("Pedido creado exitosamente")
    navigate("/")
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
                  href="/"
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
                  Generar Pedido
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Contenido principal */}
        <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
          {/* Título y botón volver */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1
                className="text-xl font-semibold font-serif"
                style={{ color: "var(--foreground)" }}
              >
                Nuevo Pedido
              </h1>
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                Cree un pedido personalizado para el cliente
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Columna izquierda: Formulario */}
            <div className="space-y-6 lg:col-span-2">
              <ClienteSelector
                clienteSeleccionado={clienteSeleccionado}
                onClienteSelect={setClienteSeleccionado}
                onClienteChange={() => setClienteSeleccionado(null)}
              />
              
              <PedidoDetallesForm
                descripcion={descripcion}
                onDescripcionChange={setDescripcion}
                dimensiones={dimensiones}
                onDimensionesChange={setDimensiones}
                subtotal={subtotal}
                onSubtotalChange={setSubtotal}
                fechaEntregaEstimada={fechaEntregaEstimada}
                onFechaEntregaEstimadaChange={setFechaEntregaEstimada}
                notas={notas}
                onNotasChange={setNotas}
                disabled={!clienteSeleccionado}
              />

              <MaterialesSelector
                materialesSeleccionados={materialesSeleccionados}
                onAgregarMaterial={agregarMaterial}
                onEliminarMaterial={eliminarMaterial}
                disabled={!clienteSeleccionado}
              />

              <PagosManager
                pagos={pagos}
                onAgregarPago={agregarPago}
                onEliminarPago={eliminarPago}
                saldoPendiente={saldoPendiente}
                disabled={!clienteSeleccionado || subtotal <= 0}
              />
            </div>

            {/* Columna derecha: Resumen */}
            <div className="lg:col-span-1">
              <PedidoResumen
                clienteSeleccionado={clienteSeleccionado}
                descripcion={descripcion}
                subtotal={subtotal}
                iva={iva}
                total={total}
                totalPagado={totalPagado}
                saldoPendiente={saldoPendiente}
                pagos={pagos}
                materialesSeleccionados={materialesSeleccionados}
                fechaEntregaEstimada={fechaEntregaEstimada}
                onConfirmar={confirmarPedido}
              />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
