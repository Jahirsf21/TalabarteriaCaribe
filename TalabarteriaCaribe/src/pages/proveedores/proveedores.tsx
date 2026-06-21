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
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { proveedores } from "@/data"
import type { Proveedor } from "@/data"
import { Truck, Plus, Search, X } from "lucide-react"

export default function Proveedores() {
  const navigate = useNavigate()
  const [proveedoresList] = useState<Proveedor[]>(proveedores)
  const [searchTerm, setSearchTerm] = useState("")

  // Filter proveedores based on search
  const filteredProveedores = useMemo(() => {
    return proveedoresList.filter((proveedor) => {
      const matchesSearch = searchTerm === "" || 
        proveedor.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proveedor.telefono.includes(searchTerm)
      return matchesSearch
    })
  }, [proveedoresList, searchTerm])

  const formatCurrency = (amount: number) => {
    return `₡${amount.toLocaleString("es-CR")}`
  }

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString("es-CR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  const handleAdd = () => {
    navigate("/proveedores/nuevo")
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
                  href="#"
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
                  Proveedores
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
              Gestión de Proveedores
            </h1>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              Administre el catálogo de proveedores
            </p>
          </div>

          {/* Search and filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative min-w-0">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre o teléfono..."
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
          </div>

          {/* Proveedores list */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Truck className="h-5 w-5" style={{ color: "#B8895B" }} />
                    Listado de Proveedores
                  </CardTitle>
                  <CardDescription>
                    {filteredProveedores.length} proveedor{filteredProveedores.length !== 1 ? "es" : ""} registrados
                  </CardDescription>
                </div>
                <Button
                  onClick={handleAdd}
                  className="hidden md:flex items-center gap-2 h-10"
                  style={{ backgroundColor: "#B8895B" }}
                >
                  <Plus className="h-4 w-4" />
                  Agregar Proveedor
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 md:p-6">
              <div className="rounded-lg border" style={{ borderColor: "var(--border)" }}>
                {/* Mobile: Card layout */}
                <div className="xl:hidden space-y-2">
                  {filteredProveedores.map((proveedor) => (
                    <div
                      key={proveedor.id}
                      className="rounded-lg border p-4 space-y-3"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate" style={{ color: "var(--foreground)" }}>
                            {proveedor.nombre}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {proveedor.telefono}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {proveedor.correo}
                          </p>
                        </div>
                        {!proveedor.activo && (
                          <Badge variant="destructive">Inactivo</Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Deuda pendiente: {formatCurrency(proveedor.deudaPendiente)}</p>
                          <p className="text-muted-foreground">Registrado: {formatDate(proveedor.creadoEn)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop: Table layout */}
                <div className="hidden xl:block overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-50">Proveedor</TableHead>
                        <TableHead className="min-w-30">Teléfono</TableHead>
                        <TableHead className="min-w-37.5">Correo</TableHead>
                        <TableHead className="min-w-30 text-right">Deuda Pendiente</TableHead>
                        <TableHead className="min-w-25 text-right">Registrado</TableHead>
                        <TableHead className="min-w-20">Estado</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProveedores.map((proveedor) => (
                        <TableRow key={proveedor.id}>
                          <TableCell className="font-medium">{proveedor.nombre}</TableCell>
                          <TableCell className="text-muted-foreground">{proveedor.telefono}</TableCell>
                          <TableCell className="text-muted-foreground">{proveedor.correo || "-"}</TableCell>
                          <TableCell className="text-right font-medium">
                            {formatCurrency(proveedor.deudaPendiente)}
                          </TableCell>
                          <TableCell className="text-right text-sm">
                            {formatDate(proveedor.creadoEn)}
                          </TableCell>
                          <TableCell>
                            {proveedor.activo ? (
                              <Badge variant="secondary">Activo</Badge>
                            ) : (
                              <Badge variant="destructive">Inactivo</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
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
