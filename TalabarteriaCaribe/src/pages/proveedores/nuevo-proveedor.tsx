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
import type { Proveedor } from "@/data"
import { materiales } from "@/data/materiales"

export default function NuevoProveedor() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    direccion: "",
    materialesSeleccionados: [] as number[],
    condicionesPago: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleMaterialToggle = (materialId: number) => {
    setFormData({
      ...formData,
      materialesSeleccionados: formData.materialesSeleccionados.includes(materialId)
        ? formData.materialesSeleccionados.filter(id => id !== materialId)
        : [...formData.materialesSeleccionados, materialId],
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.nombre || !formData.telefono || !formData.direccion) {
      alert("Por favor complete los campos obligatorios: nombre, teléfono y dirección")
      return
    }

    const materialesNombres = formData.materialesSeleccionados
      .map(id => materiales.find(m => m.id === id)?.nombre)
      .filter((nombre): nombre is string => nombre !== undefined)

    const nuevoProveedor: Proveedor = {
      id: Date.now(),
      nombre: formData.nombre,
      telefono: formData.telefono,
      correo: formData.correo || null,
      direccion: formData.direccion,
      materialesQueProvee: materialesNombres,
      condicionesPago: formData.condicionesPago || "Contado",
      deudaPendiente: 0,
      activo: true,
      creadoEn: new Date().toISOString(),
    }

    // Aquí se implementaría la lógica para guardar el proveedor
    console.log("Nuevo proveedor:", nuevoProveedor)
    alert("Proveedor creado exitosamente")
    navigate("/proveedores")
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
                  href="/proveedores"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Proveedores
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage
                  style={{ color: "var(--foreground)", fontWeight: 600 }}
                >
                  Nuevo Proveedor
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
              onClick={() => navigate("/proveedores")}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1
                className="text-xl font-semibold font-serif"
                style={{ color: "var(--foreground)" }}
              >
                Nuevo Proveedor
              </h1>
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                Registre un nuevo proveedor en el sistema
              </p>
            </div>
          </div>

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base" style={{ color: "var(--foreground)" }}>
                Información del Proveedor
              </CardTitle>
              <CardDescription className="text-xs">
                Complete los datos del proveedor. Los campos marcados con * son obligatorios.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs">Nombre del proveedor *</Label>
                    <Input
                      name="nombre"
                      placeholder="Nombre de la empresa o proveedor"
                      value={formData.nombre}
                      onChange={handleChange}
                      className="text-sm"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Teléfono *</Label>
                    <Input
                      name="telefono"
                      placeholder="0000-0000"
                      value={formData.telefono}
                      onChange={handleChange}
                      className="text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs">Correo electrónico</Label>
                    <Input
                      name="correo"
                      type="email"
                      placeholder="correo@ejemplo.com"
                      value={formData.correo}
                      onChange={handleChange}
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Dirección *</Label>
                    <Input
                      name="direccion"
                      placeholder="Dirección completa"
                      value={formData.direccion}
                      onChange={handleChange}
                      className="text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs">Materiales que provee</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-3 rounded-lg border" style={{ borderColor: "var(--border)" }}>
                    {materiales.map((material) => (
                      <div key={material.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`material-${material.id}`}
                          checked={formData.materialesSeleccionados.includes(material.id)}
                          onChange={() => handleMaterialToggle(material.id)}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <label
                          htmlFor={`material-${material.id}`}
                          className="text-sm cursor-pointer flex-1"
                        >
                          {material.nombre}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs">Condiciones de pago</Label>
                  <Input
                    name="condicionesPago"
                    placeholder="ej: Contado, 15 días plazo, 30 días plazo"
                    value={formData.condicionesPago}
                    onChange={handleChange}
                    className="text-sm"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/proveedores")}
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
                    Crear Proveedor
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
