import { useState, useMemo } from "react"
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
import { Package, Plus, Search, X } from "lucide-react"

import { MaterialesList } from "@/components/materiales/materiales-list"

import type { Material } from "@/data/materiales"
import { materiales } from "@/data/materiales"

export default function Materiales() {
  const navigate = useNavigate()
  const [materialesList, setMaterialesList] = useState<Material[]>(materiales)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUnidad, setSelectedUnidad] = useState<string>("")

  // Get unique unidades
  const unidades = useMemo(() => {
    const units = new Set(materialesList.map((m) => m.unidad))
    return Array.from(units).sort()
  }, [materialesList])

  // Filter materiales based on search and unidad
  const filteredMateriales = useMemo(() => {
    return materialesList.filter((material) => {
      const matchesSearch = searchTerm === "" || 
        material.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesUnidad = selectedUnidad === "" || 
        material.unidad === selectedUnidad
      return matchesSearch && matchesUnidad
    })
  }, [materialesList, searchTerm, selectedUnidad])

  const handleAdd = () => {
    navigate("/materiales/nuevo")
  }

  const handleEdit = (material: Material) => {
    navigate(`/materiales/editar?edit=${material.id}`)
  }

  const handleDelete = (id: number) => {
    if (confirm("¿Está seguro de eliminar este material?")) {
      setMaterialesList(materialesList.filter((m) => m.id !== id))
    }
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
                  Materiales
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
          {/* Title */}
          <div>
            <h1
              className="text-2xl font-bold font-serif"
              style={{ color: "var(--foreground)" }}
            >
              Gestión de Materiales
            </h1>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              Administre el inventario de materias primas
            </p>
          </div>

          {/* Search and filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative min-w-0">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-10"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="flex gap-2 min-w-0">
              <select
                value={selectedUnidad}
                onChange={(e) => setSelectedUnidad(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Todas las unidades</option>
                {unidades.map((unidad) => (
                  <option key={unidad} value={unidad}>
                    {unidad.charAt(0).toUpperCase() + unidad.slice(1)}
                  </option>
                ))}
              </select>
              {selectedUnidad && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setSelectedUnidad("")}
                  className="h-10 w-10 shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Materiales list */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Package className="h-5 w-5" style={{ color: "#B8895B" }} />
                    Listado de Materiales
                  </CardTitle>
                  <CardDescription>
                    {filteredMateriales.length} material{filteredMateriales.length !== 1 ? "es" : ""} en el inventario
                  </CardDescription>
                </div>
                <Button
                  onClick={handleAdd}
                  className="hidden md:flex items-center gap-2 h-10"
                  style={{ backgroundColor: "#B8895B" }}
                >
                  <Plus className="h-4 w-4" />
                  Agregar Material
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 md:p-6">
              <MaterialesList
                materiales={filteredMateriales}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </CardContent>
          </Card>

          {/* Floating action button for mobile */}
          <Button
            onClick={handleAdd}
            className="md:hidden fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg flex items-center justify-center"
            style={{ backgroundColor: "#B8895B" }}
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
