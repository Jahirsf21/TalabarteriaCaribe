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

import { ProveedorSelector } from "@/components/entrada-inventario/proveedor-selector"
import { MaterialSelector } from "@/components/entrada-inventario/material-selector"
import { EntradaItemsList } from "@/components/entrada-inventario/entrada-items-list"
import { EntradaResumen } from "@/components/entrada-inventario/entrada-resumen"

import type { Material } from "@/data/materiales"
import type { Proveedor } from "@/data/proveedores"
import type { Producto } from "@/data"

interface ItemEntrada {
  tipo: "material" | "producto"
  material?: Material
  producto?: Producto
  cantidad: number
  costoUnitario: number
}

export default function EntradaInventario() {
  const navigate = useNavigate()
  
  const [tipoEntrada, setTipoEntrada] = useState<"material" | "producto">("material")
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState<Proveedor | null>(null)
  const [itemsEntrada, setItemsEntrada] = useState<ItemEntrada[]>([])
  const [materialSeleccionado, setMaterialSeleccionado] = useState<Material | null>(null)
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null)
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: "", categoria: "", precio: 0 })
  const [nuevoMaterial, setNuevoMaterial] = useState({ nombre: "", unidad: "" })
  const [cantidad, setCantidad] = useState(1)
  const [costoUnitario, setCostoUnitario] = useState(0)
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0])
  const [notas, setNotas] = useState("")

  const costoTotal = itemsEntrada.reduce(
    (sum, item) => sum + item.costoUnitario * item.cantidad,
    0
  )

  const agregarItem = () => {
    if (tipoEntrada === "material") {
      if (!materialSeleccionado || cantidad <= 0 || costoUnitario <= 0) return
      
      const existente = itemsEntrada.find(
        (i) => i.tipo === "material" && i.material?.id === materialSeleccionado.id
      )
      
      if (existente) {
        setItemsEntrada(
          itemsEntrada.map((i) =>
            i.tipo === "material" && i.material?.id === materialSeleccionado.id
              ? { ...i, cantidad: i.cantidad + cantidad }
              : i
          )
        )
      } else {
        setItemsEntrada([
          ...itemsEntrada,
          { 
            tipo: "material",
            material: materialSeleccionado, 
            cantidad, 
            costoUnitario 
          },
        ])
      }
      
      setMaterialSeleccionado(null)
    } else {
      if (!productoSeleccionado || cantidad <= 0 || costoUnitario <= 0) return
      
      const existente = itemsEntrada.find(
        (i) => i.tipo === "producto" && i.producto?.id === productoSeleccionado.id
      )
      
      if (existente) {
        setItemsEntrada(
          itemsEntrada.map((i) =>
            i.tipo === "producto" && i.producto?.id === productoSeleccionado.id
              ? { ...i, cantidad: i.cantidad + cantidad }
              : i
          )
        )
      } else {
        setItemsEntrada([
          ...itemsEntrada,
          { 
            tipo: "producto",
            producto: productoSeleccionado, 
            cantidad, 
            costoUnitario 
          },
        ])
      }
      
      setProductoSeleccionado(null)
    }
    
    setCantidad(1)
    setCostoUnitario(0)
  }

  const eliminarItem = (tipo: "material" | "producto", id: number) => {
    setItemsEntrada(itemsEntrada.filter((i) => {
      if (tipo === "material") {
        return i.tipo === "material" && i.material?.id !== id
      } else {
        return i.tipo === "producto" && i.producto?.id !== id
      }
    }))
  }

  const actualizarCantidad = (tipo: "material" | "producto", id: number, nuevaCantidad: number) => {
    if (nuevaCantidad <= 0) {
      eliminarItem(tipo, id)
      return
    }
    
    setItemsEntrada(
      itemsEntrada.map((i) => {
        if (tipo === "material") {
          return i.tipo === "material" && i.material?.id === id ? { ...i, cantidad: nuevaCantidad } : i
        } else {
          return i.tipo === "producto" && i.producto?.id === id ? { ...i, cantidad: nuevaCantidad } : i
        }
      })
    )
  }

  const actualizarCosto = (tipo: "material" | "producto", id: number, nuevoCosto: number) => {
    setItemsEntrada(
      itemsEntrada.map((i) => {
        if (tipo === "material") {
          return i.tipo === "material" && i.material?.id === id ? { ...i, costoUnitario: nuevoCosto } : i
        } else {
          return i.tipo === "producto" && i.producto?.id === id ? { ...i, costoUnitario: nuevoCosto } : i
        }
      })
    )
  }

  const confirmarEntrada = () => {
    if (itemsEntrada.length === 0) return
    if (tipoEntrada === "material" && !proveedorSeleccionado) return
    
    // Aquí se implementaría la lógica para guardar la entrada de inventario
    console.log("Entrada de inventario confirmada:", {
      tipo: tipoEntrada,
      proveedor: tipoEntrada === "material" ? proveedorSeleccionado : null,
      items: itemsEntrada.map((i) => {
        if (i.tipo === "material") {
          return {
            tipo: "material",
            materialId: i.material?.id,
            nombreMaterial: i.material?.nombre,
            cantidad: i.cantidad,
            costoUnitario: i.costoUnitario,
            subtotal: i.costoUnitario * i.cantidad,
          }
        } else {
          return {
            tipo: "producto",
            productoId: i.producto?.id,
            nombreProducto: i.producto?.nombre,
            cantidad: i.cantidad,
            costoUnitario: i.costoUnitario,
            subtotal: i.costoUnitario * i.cantidad,
          }
        }
      }),
      costoTotal,
      fecha,
      notas,
    })
    
    alert("Entrada de inventario registrada exitosamente")
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
                  Entrada de Inventario
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
                Entrada de Inventario
              </h1>
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                Registre la entrada de materiales al inventario
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Columna izquierda: Selección */}
            <div className="space-y-6 lg:col-span-2">
              {/* Toggle tipo de entrada */}
              <div className="flex gap-2">
                <Button
                  variant={tipoEntrada === "material" ? "default" : "outline"}
                  onClick={() => setTipoEntrada("material")}
                  className="flex-1"
                >
                  Materia Prima
                </Button>
                <Button
                  variant={tipoEntrada === "producto" ? "default" : "outline"}
                  onClick={() => setTipoEntrada("producto")}
                  className="flex-1"
                >
                  Productos
                </Button>
              </div>

              <div className="h-4" />

              {/* Proveedor selector - solo para materiales */}
              {tipoEntrada === "material" && (
                <ProveedorSelector
                  proveedorSeleccionado={proveedorSeleccionado}
                  onProveedorSelect={setProveedorSeleccionado}
                  onProveedorChange={() => setProveedorSeleccionado(null)}
                />
              )}
              
              <MaterialSelector
                tipoEntrada={tipoEntrada}
                proveedorSeleccionado={tipoEntrada === "material" ? !!proveedorSeleccionado : true}
                materialSeleccionado={materialSeleccionado}
                productoSeleccionado={productoSeleccionado}
                onMaterialSelect={setMaterialSeleccionado}
                onProductoSelect={setProductoSeleccionado}
                onMaterialDeselect={() => setMaterialSeleccionado(null)}
                onProductoDeselect={() => setProductoSeleccionado(null)}
                onAgregar={agregarItem}
                cantidad={cantidad}
                onCantidadChange={setCantidad}
                costoUnitario={costoUnitario}
                onCostoUnitarioChange={setCostoUnitario}
                nuevoProducto={nuevoProducto}
                onNuevoProductoChange={setNuevoProducto}
                nuevoMaterial={nuevoMaterial}
                onNuevoMaterialChange={setNuevoMaterial}
              />

              <EntradaItemsList
                itemsEntrada={itemsEntrada}
                onActualizarCantidad={actualizarCantidad}
                onActualizarCosto={actualizarCosto}
                onEliminarItem={eliminarItem}
              />
            </div>

            {/* Columna derecha: Resumen */}
            <div className="lg:col-span-1">
              <EntradaResumen
                tipoEntrada={tipoEntrada}
                proveedorSeleccionado={proveedorSeleccionado}
                itemsEntradaCount={itemsEntrada.length}
                costoTotal={costoTotal}
                fecha={fecha}
                onFechaChange={setFecha}
                notas={notas}
                onNotasChange={setNotas}
                onConfirmar={confirmarEntrada}
              />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
