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

import { ClienteSelector } from "@/components/crear-venta/cliente-selector"
import { ProductoSelector } from "@/components/crear-venta/producto-selector"
import { VentaProductosList } from "@/components/crear-venta/venta-productos-list"
import { VentaResumen } from "@/components/crear-venta/venta-resumen"

import type { Cliente, Producto } from "@/data"

interface ProductoVenta {
  producto: Producto
  cantidad: number
}

export default function CrearVenta() {
  const navigate = useNavigate()
  
  const [clienteSeleccionado, setClienteSeleccionado] = useState<Cliente | null>(null)
  const [productosVenta, setProductosVenta] = useState<ProductoVenta[]>([])
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null)

  const subtotal = productosVenta.reduce(
    (sum, item) => sum + item.producto.precio * item.cantidad,
    0
  )
  
  const iva = subtotal * 0.13
  const total = subtotal + iva

  const agregarProducto = (cantidad: number) => {
    if (!productoSeleccionado || cantidad <= 0) return
    
    const existente = productosVenta.find(
      (p) => p.producto.id === productoSeleccionado.id
    )
    
    if (existente) {
      setProductosVenta(
        productosVenta.map((p) =>
          p.producto.id === productoSeleccionado.id
            ? { ...p, cantidad: p.cantidad + cantidad }
            : p
        )
      )
    } else {
      setProductosVenta([
        ...productosVenta,
        { producto: productoSeleccionado, cantidad },
      ])
    }
    
    setProductoSeleccionado(null)
  }

  const eliminarProducto = (productoId: number) => {
    setProductosVenta(productosVenta.filter((p) => p.producto.id !== productoId))
  }

  const actualizarCantidad = (productoId: number, nuevaCantidad: number) => {
    if (nuevaCantidad <= 0) {
      eliminarProducto(productoId)
      return
    }
    
    setProductosVenta(
      productosVenta.map((p) =>
        p.producto.id === productoId ? { ...p, cantidad: nuevaCantidad } : p
      )
    )
  }

  const confirmarVenta = () => {
    if (!clienteSeleccionado || productosVenta.length === 0) return
    
    // Aquí se implementaría la lógica para guardar la venta
    console.log("Venta confirmada:", {
      cliente: clienteSeleccionado,
      productos: productosVenta,
      subtotal,
      iva,
      total,
    })
    
    alert("Venta creada exitosamente")
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
                  Crear Venta
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
                Nueva Venta
              </h1>
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                Seleccione cliente y productos para crear una venta
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
                onAgregar={agregarProducto}
              />

              <VentaProductosList
                productosVenta={productosVenta}
                onActualizarCantidad={actualizarCantidad}
                onEliminarProducto={eliminarProducto}
              />
            </div>

            {/* Columna derecha: Resumen */}
            <div className="lg:col-span-1">
              <VentaResumen
                clienteSeleccionado={clienteSeleccionado}
                productosVentaCount={productosVenta.length}
                subtotal={subtotal}
                iva={iva}
                total={total}
                onConfirmar={confirmarVenta}
              />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
