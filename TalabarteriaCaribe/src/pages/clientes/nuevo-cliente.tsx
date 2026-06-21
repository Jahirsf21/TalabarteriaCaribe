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
import type { Cliente, TipoCliente } from "@/data"

export default function NuevoCliente() {
  const navigate = useNavigate()
  const [tipo, setTipo] = useState<TipoCliente>("minorista")
  const [formData, setFormData] = useState({
    nombre: "",
    cedula: "",
    telefono: "",
    correo: "",
    direccion: "",
    empresa: "",
    ruc: "",
    condicionesCredito: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.nombre || !formData.cedula || !formData.telefono || !formData.direccion) {
      alert("Por favor complete los campos obligatorios: nombre, cédula, teléfono y dirección")
      return
    }

    if (tipo === "corporativo" && (!formData.empresa || !formData.ruc)) {
      alert("Para clientes corporativos, empresa y RUC son obligatorios")
      return
    }

    const nuevoCliente: Cliente = {
      id: Date.now(),
      tipo,
      nombre: formData.nombre,
      cedula: formData.cedula,
      telefono: formData.telefono,
      correo: formData.correo || null,
      direccion: formData.direccion,
      empresa: tipo === "corporativo" ? formData.empresa : undefined,
      ruc: tipo === "corporativo" ? formData.ruc : undefined,
      condicionesCredito: tipo === "corporativo" ? formData.condicionesCredito : undefined,
      totalComprado: 0,
      activo: true,
      creadoEn: new Date().toISOString(),
    }

    // Aquí se implementaría la lógica para guardar el cliente
    console.log("Nuevo cliente:", nuevoCliente)
    alert("Cliente creado exitosamente")
    navigate("/clientes")
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
                  href="/clientes"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Clientes
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage
                  style={{ color: "var(--foreground)", fontWeight: 600 }}
                >
                  Nuevo Cliente
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
              onClick={() => navigate("/clientes")}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1
                className="text-xl font-semibold font-serif"
                style={{ color: "var(--foreground)" }}
              >
                Nuevo Cliente
              </h1>
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                Registre un nuevo cliente en el sistema
              </p>
            </div>
          </div>

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base" style={{ color: "var(--foreground)" }}>
                Información del Cliente
              </CardTitle>
              <CardDescription className="text-xs">
                Complete los datos del cliente. Los campos marcados con * son obligatorios.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Tipo de cliente */}
                <div className="space-y-2">
                  <Label className="text-xs">Tipo de cliente *</Label>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={tipo === "minorista" ? "default" : "outline"}
                      size="default"
                      onClick={() => setTipo("minorista")}
                      className="flex-1 h-10"
                    >
                      Minorista
                    </Button>
                    <Button
                      type="button"
                      variant={tipo === "corporativo" ? "default" : "outline"}
                      size="default"
                      onClick={() => setTipo("corporativo")}
                      className="flex-1 h-10"
                    >
                      Corporativo
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs">Nombre completo *</Label>
                    <Input
                      name="nombre"
                      placeholder="Nombre del cliente"
                      value={formData.nombre}
                      onChange={handleChange}
                      className="text-sm"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Cédula *</Label>
                    <Input
                      name="cedula"
                      placeholder="0-0000-0000"
                      value={formData.cedula}
                      onChange={handleChange}
                      className="text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                {/* Campos corporativos */}
                {tipo === "corporativo" && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs">Empresa *</Label>
                        <Input
                          name="empresa"
                          placeholder="Nombre de la empresa"
                          value={formData.empresa}
                          onChange={handleChange}
                          className="text-sm"
                          required={tipo === "corporativo"}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">RUC *</Label>
                        <Input
                          name="ruc"
                          placeholder="3-000-000000"
                          value={formData.ruc}
                          onChange={handleChange}
                          className="text-sm"
                          required={tipo === "corporativo"}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Condiciones de crédito</Label>
                      <Input
                        name="condicionesCredito"
                        placeholder="ej: 30 días plazo, 15 días plazo"
                        value={formData.condicionesCredito}
                        onChange={handleChange}
                        className="text-sm"
                      />
                    </div>
                  </>
                )}

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/clientes")}
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
                    Crear Cliente
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
