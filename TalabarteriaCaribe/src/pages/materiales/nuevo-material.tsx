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
import { ArrowLeft, Plus } from "lucide-react"
import type { Material, UnidadMedida } from "@/data/materiales"

export default function NuevoMaterial() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nombre: "",
    unidad: "metros" as UnidadMedida,
    stock: "",
    stockMinimo: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleUnidadChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      unidad: e.target.value as UnidadMedida,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.nombre || !formData.unidad) {
      alert("Por favor complete los campos obligatorios: nombre y unidad de medida")
      return
    }

    const stock = parseFloat(formData.stock) || 0
    const stockMinimo = parseFloat(formData.stockMinimo) || 0

    let estadoStock: "normal" | "bajo" | "agotado" = "normal"
    if (stock === 0) {
      estadoStock = "agotado"
    } else if (stock <= stockMinimo) {
      estadoStock = "bajo"
    }

    const nuevoMaterial: Material = {
      id: Date.now(),
      nombre: formData.nombre,
      unidad: formData.unidad,
      stock,
      stockMinimo,
      estadoStock,
      proveedorId: null,
      activo: true,
      creadoEn: new Date().toISOString(),
    }

    // Aquí se implementaría la lógica para guardar el material
    console.log("Nuevo material:", nuevoMaterial)
    alert("Material creado exitosamente")
    navigate("/materiales")
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
                  href="/materiales"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Materiales
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage
                  style={{ color: "var(--foreground)", fontWeight: 600 }}
                >
                  Nuevo Material
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
              onClick={() => navigate("/materiales")}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1
                className="text-xl font-semibold font-serif"
                style={{ color: "var(--foreground)" }}
              >
                Nuevo Material
              </h1>
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                Agregue un nuevo material al inventario
              </p>
            </div>
          </div>

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base" style={{ color: "var(--foreground)" }}>
                Información del Material
              </CardTitle>
              <CardDescription className="text-xs">
                Complete los datos del material. Los campos marcados con * son obligatorios.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs">Nombre del material *</Label>
                  <Input
                    name="nombre"
                    placeholder="Nombre del material"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="text-sm"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs">Unidad de medida *</Label>
                  <select
                    value={formData.unidad}
                    onChange={handleUnidadChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="metros">Metros</option>
                    <option value="kilos">Kilos</option>
                    <option value="litros">Litros</option>
                    <option value="unidades">Unidades</option>
                    <option value="centímetros">Centímetros</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs">Stock inicial</Label>
                    <Input
                      name="stock"
                      type="number"
                      min="0"
                      step="0.1"
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
                      step="0.1"
                      placeholder="0"
                      value={formData.stockMinimo}
                      onChange={handleChange}
                      className="text-sm"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/materiales")}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                    style={{ backgroundColor: "#B8895B" }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Crear Material
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
