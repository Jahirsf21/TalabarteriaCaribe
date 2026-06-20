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
import { clientes } from "@/data"
import type { Cliente, TipoCliente } from "@/data"
import { Users, Plus, Search, X } from "lucide-react"

function BadgeTipoCliente({ tipo }: { tipo: TipoCliente }) {
  if (tipo === "corporativo") {
    return (
      <Badge className="border-purple-300 bg-purple-100 text-purple-800">
        Corporativo
      </Badge>
    )
  }
  return <Badge variant="secondary">Minorista</Badge>
}

export default function Clientes() {
  const navigate = useNavigate()
  const [clientesList] = useState<Cliente[]>(clientes)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTipo, setSelectedTipo] = useState<string>("")

  // Get unique tipos
  const tipos = useMemo(() => {
    const types = new Set(clientesList.map((c) => c.tipo))
    return Array.from(types).sort()
  }, [clientesList])

  // Filter clientes based on search and tipo
  const filteredClientes = useMemo(() => {
    return clientesList.filter((cliente) => {
      const matchesSearch = searchTerm === "" || 
        cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.cedula.includes(searchTerm) ||
        cliente.telefono.includes(searchTerm)
      const matchesTipo = selectedTipo === "" || cliente.tipo === selectedTipo
      return matchesSearch && matchesTipo
    })
  }, [clientesList, searchTerm, selectedTipo])

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
    navigate("/clientes/nuevo")
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
                  Clientes
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
              Gestión de Clientes
            </h1>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              Administre el catálogo de clientes
            </p>
          </div>

          {/* Search and filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative min-w-0">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, cédula o teléfono..."
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
                value={selectedTipo}
                onChange={(e) => setSelectedTipo(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Todos los tipos</option>
                {tipos.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                  </option>
                ))}
              </select>
              {selectedTipo && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setSelectedTipo("")}
                  className="h-10 w-10 shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Clientes list */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Users className="h-5 w-5" style={{ color: "#B8895B" }} />
                    Listado de Clientes
                  </CardTitle>
                  <CardDescription>
                    {filteredClientes.length} cliente{filteredClientes.length !== 1 ? "s" : ""} registrados
                  </CardDescription>
                </div>
                <Button
                  onClick={handleAdd}
                  className="flex items-center gap-2 h-10 md:flex"
                  style={{ backgroundColor: "#B8895B" }}
                >
                  <Plus className="h-4 w-4" />
                  Agregar Cliente
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 md:p-6">
              <div className="rounded-lg border" style={{ borderColor: "var(--border)" }}>
                {/* Mobile: Card layout */}
                <div className="xl:hidden space-y-2">
                  {filteredClientes.map((cliente) => (
                    <div
                      key={cliente.id}
                      className="rounded-lg border p-4 space-y-3"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate" style={{ color: "var(--foreground)" }}>
                            {cliente.nombre}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {cliente.cedula}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {cliente.telefono}
                          </p>
                        </div>
                        <BadgeTipoCliente tipo={cliente.tipo} />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Total comprado: {formatCurrency(cliente.totalComprado)}</p>
                          <p className="text-muted-foreground">Registrado: {formatDate(cliente.creadoEn)}</p>
                        </div>
                        {!cliente.activo && (
                          <Badge variant="destructive">Inactivo</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop: Table layout */}
                <div className="hidden xl:block overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[200px]">Cliente</TableHead>
                        <TableHead className="min-w-[120px]">Cédula</TableHead>
                        <TableHead className="min-w-[100px]">Teléfono</TableHead>
                        <TableHead className="min-w-[100px]">Tipo</TableHead>
                        <TableHead className="min-w-[120px] text-right">Total Comprado</TableHead>
                        <TableHead className="min-w-[100px] text-right">Registrado</TableHead>
                        <TableHead className="min-w-[80px]">Estado</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredClientes.map((cliente) => (
                        <TableRow key={cliente.id}>
                          <TableCell className="font-medium">{cliente.nombre}</TableCell>
                          <TableCell className="text-muted-foreground">{cliente.cedula}</TableCell>
                          <TableCell className="text-muted-foreground">{cliente.telefono}</TableCell>
                          <TableCell>
                            <BadgeTipoCliente tipo={cliente.tipo} />
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {formatCurrency(cliente.totalComprado)}
                          </TableCell>
                          <TableCell className="text-right text-sm">
                            {formatDate(cliente.creadoEn)}
                          </TableCell>
                          <TableCell>
                            {cliente.activo ? (
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
