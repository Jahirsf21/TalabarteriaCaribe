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

import { ClienteSelector } from "@/components/generar-proforma/cliente-selector"
import { ProductoSelector } from "@/components/generar-proforma/producto-selector"
import { CotizacionItemsList } from "@/components/generar-proforma/cotizacion-items-list"
import { CotizacionResumen } from "@/components/generar-proforma/cotizacion-resumen"

import type { Cliente, Producto } from "@/data"

interface ItemCotizacion {
  producto: Producto
  cantidad: number
  precioUnitario: number
}

export default function GenerarProforma() {
  const navigate = useNavigate()
  
  const [clienteSeleccionado, setClienteSeleccionado] = useState<Cliente | null>(null)
  const [itemsCotizacion, setItemsCotizacion] = useState<ItemCotizacion[]>([])
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null)
  const [cantidad, setCantidad] = useState(1)
  const [validezDias, setValidezDias] = useState(15)
  const [notas, setNotas] = useState("")

  const subtotal = itemsCotizacion.reduce(
    (sum, item) => sum + item.precioUnitario * item.cantidad,
    0
  )
  
  const iva = subtotal * 0.13
  const montoTotal = subtotal + iva

  const agregarItem = () => {
    if (!productoSeleccionado || cantidad <= 0) return
    
    const existente = itemsCotizacion.find(
      (i) => i.producto.id === productoSeleccionado.id
    )
    
    if (existente) {
      setItemsCotizacion(
        itemsCotizacion.map((i) =>
          i.producto.id === productoSeleccionado.id
            ? { ...i, cantidad: i.cantidad + cantidad }
            : i
        )
      )
    } else {
      setItemsCotizacion([
        ...itemsCotizacion,
        { 
          producto: productoSeleccionado, 
          cantidad, 
          precioUnitario: productoSeleccionado.precio 
        },
      ])
    }
    
    setProductoSeleccionado(null)
    setCantidad(1)
  }

  const eliminarItem = (productoId: number) => {
    setItemsCotizacion(itemsCotizacion.filter((i) => i.producto.id !== productoId))
  }

  const actualizarCantidad = (productoId: number, nuevaCantidad: number) => {
    if (nuevaCantidad <= 0) {
      eliminarItem(productoId)
      return
    }
    
    setItemsCotizacion(
      itemsCotizacion.map((i) =>
        i.producto.id === productoId ? { ...i, cantidad: nuevaCantidad } : i
      )
    )
  }

  const actualizarPrecio = (productoId: number, nuevoPrecio: number) => {
    setItemsCotizacion(
      itemsCotizacion.map((i) =>
        i.producto.id === productoId ? { ...i, precioUnitario: nuevoPrecio } : i
      )
    )
  }

  const confirmarCotizacion = () => {
    if (!clienteSeleccionado || itemsCotizacion.length === 0) return
    
    // Aquí se implementaría la lógica para guardar la cotización
    console.log("Cotización confirmada:", {
      cliente: clienteSeleccionado,
      items: itemsCotizacion.map((i) => ({
        productoId: i.producto.id,
        nombreProducto: i.producto.nombre,
        cantidad: i.cantidad,
        precioUnitario: i.precioUnitario,
        subtotal: i.precioUnitario * i.cantidad,
      })),
      subtotal,
      iva,
      montoTotal,
      validezDias,
      notas,
    })
    
    alert("Cotización creada exitosamente")
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
                  Generar Proforma
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
                Nueva Proforma
              </h1>
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                Cree una cotización para el cliente
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Columna izquierda: Selección */}
            <div className="space-y-6 lg:col-span-2">
              <ClienteSelector
                clienteSeleccionado={clienteSeleccionado}
                onClienteSelect={setClienteSeleccionado}
                onClienteChange={() => setClienteSeleccionado(null)}
              />
              
              <ProductoSelector
                clienteSeleccionado={!!clienteSeleccionado}
                productoSeleccionado={productoSeleccionado}
                onProductoSelect={setProductoSeleccionado}
                onProductoDeselect={() => setProductoSeleccionado(null)}
                onAgregar={agregarItem}
                cantidad={cantidad}
                onCantidadChange={setCantidad}
              />

              <CotizacionItemsList
                itemsCotizacion={itemsCotizacion}
                onActualizarCantidad={actualizarCantidad}
                onActualizarPrecio={actualizarPrecio}
                onEliminarItem={eliminarItem}
              />
            </div>

            {/* Columna derecha: Resumen */}
            <div className="lg:col-span-1">
              <CotizacionResumen
                clienteSeleccionado={clienteSeleccionado}
                itemsCotizacionCount={itemsCotizacion.length}
                subtotal={subtotal}
                iva={iva}
                montoTotal={montoTotal}
                validezDias={validezDias}
                onValidezDiasChange={setValidezDias}
                notas={notas}
                onNotasChange={setNotas}
                onConfirmar={confirmarCotizacion}
              />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
