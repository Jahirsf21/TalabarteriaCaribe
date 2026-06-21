import { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router"
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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save } from "lucide-react"
import type { Producto } from "@/data"
import { productos } from "@/data"

export default function EditarProducto() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const editId = searchParams.get("edit")
  const producto = productos.find((p) => p.id === parseInt(editId || ""))

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    porcentajeIva: "",
    stock: "",
    stockMinimo: "",
    categoria: "",
  })

  useEffect(() => {
    if (producto) {
      setFormData({
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio.toString(),
        porcentajeIva: producto.porcentajeIva.toString(),
        stock: producto.stock.toString(),
        stockMinimo: producto.stockMinimo.toString(),
        categoria: producto.categoria,
      })
    }
  }, [producto])

  if (!producto) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Producto no encontrado</p>
              <Button onClick={() => navigate("/productos")} className="mt-4">
                Volver a productos
              </Button>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.nombre || !formData.descripcion || !formData.precio || !formData.categoria) {
      alert("Por favor complete los campos obligatorios: nombre, descripción, precio y categoría")
      return
    }

    const precio = parseFloat(formData.precio)
    const stock = parseFloat(formData.stock) || 0
    const stockMinimo = parseFloat(formData.stockMinimo) || 0
    const porcentajeIva = parseFloat(formData.porcentajeIva) || 13

    let estadoStock: "normal" | "bajo" | "agotado" = "normal"
    if (stock === 0) {
      estadoStock = "agotado"
    } else if (stock <= stockMinimo) {
      estadoStock = "bajo"
    }

    const productoActualizado: Producto = {
      ...producto,
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      precio,
      porcentajeIva,
      stock,
      stockMinimo,
      categoria: formData.categoria,
      estadoStock,
    }

    // Aquí se implementaría la lógica para actualizar el producto
    console.log("Producto actualizado:", productoActualizado)
    alert("Producto actualizado exitosamente")
    navigate("/productos")
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
                  href="/productos"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Productos
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage
                  style={{ color: "var(--foreground)", fontWeight: 600 }}
                >
                  Editar Producto #{producto.id}
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
              onClick={() => navigate("/productos")}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1
                className="text-xl font-semibold font-serif"
                style={{ color: "var(--foreground)" }}
              >
                Editar Producto
              </h1>
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                Modifique la información del producto
              </p>
            </div>
          </div>

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base" style={{ color: "var(--foreground)" }}>
                Información del Producto
              </CardTitle>
              <CardDescription className="text-xs">
                Actualice los datos del producto. Los campos marcados con * son obligatorios.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs">Nombre del producto *</Label>
                  <Input
                    name="nombre"
                    placeholder="Nombre del producto"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="text-sm"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs">Descripción *</Label>
                  <Input
                    name="descripcion"
                    placeholder="Descripción detallada del producto"
                    value={formData.descripcion}
                    onChange={handleChange}
                    className="text-sm"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs">Precio (₡) *</Label>
                    <Input
                      name="precio"
                      type="number"
                      min="0"
                      step="100"
                      placeholder="0"
                      value={formData.precio}
                      onChange={handleChange}
                      className="text-sm"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Porcentaje IVA (%)</Label>
                    <Input
                      name="porcentajeIva"
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      placeholder="13"
                      value={formData.porcentajeIva}
                      onChange={handleChange}
                      className="text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs">Stock actual</Label>
                    <Input
                      name="stock"
                      type="number"
                      min="0"
                      step="1"
                      placeholder="0"
                      value={formData.stock}
                      onChange={handleChange}
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Stock mínimo</Label>
                    <Input
                      name="stockMinimo"
                      type="number"
                      min="0"
                      step="1"
                      placeholder="0"
                      value={formData.stockMinimo}
                      onChange={handleChange}
                      className="text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs">Categoría *</Label>
                  <Input
                    name="categoria"
                    placeholder="ej: Cinturones, Billeteras, Bolsos"
                    value={formData.categoria}
                    onChange={handleChange}
                    className="text-sm"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/productos")}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                    style={{ backgroundColor: "#B8895B" }}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Guardar Cambios
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
