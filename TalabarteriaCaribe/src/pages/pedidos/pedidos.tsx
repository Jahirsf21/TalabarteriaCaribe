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
import { pedidos } from "@/data"
import type { Pedido, EstadoPedido } from "@/data"
import { ClipboardList, Plus, Search, X } from "lucide-react"

function BadgeEstadoPedido({ estado }: { estado: EstadoPedido }) {
  switch (estado) {
    case "pendiente":
      return <Badge variant="secondary">Pendiente</Badge>
    case "en_produccion":
      return (
        <Badge className="border-blue-300 bg-blue-100 text-blue-800">
          En Producción
        </Badge>
      )
    case "listo":
      return (
        <Badge className="border-green-300 bg-green-100 text-green-800">
          Listo
        </Badge>
      )
    case "entregado":
      return (
        <Badge className="border-emerald-300 bg-emerald-100 text-emerald-800">
          Entregado
        </Badge>
      )
    case "cancelado":
      return <Badge variant="destructive">Cancelado</Badge>
  }
}

export default function Pedidos() {
  const navigate = useNavigate()
  const [pedidosList] = useState<Pedido[]>(pedidos)
  const [searchTerm, setSearchTerm] = useState("")
  const [fechaInicio, setFechaInicio] = useState("")
  const [fechaFin, setFechaFin] = useState("")
  const [selectedEstado, setSelectedEstado] = useState<string>("")

  // Filter pedidos based on search, date range, and estado
  const filteredPedidos = useMemo(() => {
    return pedidosList.filter((pedido) => {
      const matchesSearch = searchTerm === "" || 
        pedido.nombreCliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pedido.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
      
      const cotDate = new Date(pedido.creadoEn)
      const matchesFechaInicio = fechaInicio === "" || cotDate >= new Date(fechaInicio)
      const matchesFechaFin = fechaFin === "" || cotDate <= new Date(fechaFin)
      
      const matchesEstado = selectedEstado === "" || pedido.estado === selectedEstado
      
      return matchesSearch && matchesFechaInicio && matchesFechaFin && matchesEstado
    })
  }, [pedidosList, searchTerm, fechaInicio, fechaFin, selectedEstado])

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
    navigate("/pedidos/generar")
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
                  Pedidos
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
              Gestión de Pedidos
            </h1>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              Administre los pedidos personalizados
            </p>
          </div>

          {/* Search and filters */}
          <div className="grid grid-cols-1 gap-4">
            <div className="relative min-w-0">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por cliente o descripción..."
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 min-w-0">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-muted-foreground">Fecha inicio</label>
                <input
                  type="date"
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-muted-foreground">Fecha fin</label>
                <input
                  type="date"
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
            </div>
            <div className="flex gap-2 min-w-0">
              <select
                value={selectedEstado}
                onChange={(e) => setSelectedEstado(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Todos los estados</option>
                <option value="pendiente">Pendiente</option>
                <option value="en_produccion">En Producción</option>
                <option value="listo">Listo</option>
                <option value="entregado">Entregado</option>
                <option value="cancelado">Cancelado</option>
              </select>
              {selectedEstado && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setSelectedEstado("")}
                  className="h-10 w-10 shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Pedidos list */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <ClipboardList className="h-5 w-5" style={{ color: "#B8895B" }} />
                    Listado de Pedidos
                  </CardTitle>
                  <CardDescription>
                    {filteredPedidos.length} pedido{filteredPedidos.length !== 1 ? "s" : ""} registrados
                  </CardDescription>
                </div>
                <Button
                  onClick={handleAdd}
                  className="hidden md:flex items-center gap-2 h-10"
                  style={{ backgroundColor: "#B8895B" }}
                >
                  <Plus className="h-4 w-4" />
                  Nuevo Pedido
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 md:p-6">
              <div className="rounded-lg border" style={{ borderColor: "var(--border)" }}>
                {/* Mobile: Card layout */}
                <div className="xl:hidden space-y-2">
                  {filteredPedidos.map((pedido) => (
                    <div
                      key={pedido.id}
                      className="rounded-lg border p-4 space-y-3 cursor-pointer hover:bg-muted/50"
                      style={{ borderColor: "var(--border)" }}
                      onClick={() => navigate(`/pedidos/${pedido.id}`)}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate" style={{ color: "var(--foreground)" }}>
                            #{pedido.id} - {pedido.nombreCliente}
                          </p>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {pedido.descripcion}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Entrega estimada: {formatDate(pedido.fechaEntregaEstimada)}
                          </p>
                        </div>
                        <BadgeEstadoPedido estado={pedido.estado} />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Total: {formatCurrency(pedido.precioTotal)}</p>
                          <p className="text-muted-foreground">Saldo: {formatCurrency(pedido.saldoPendiente)}</p>
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
                        <TableHead className="min-w-[80px]">Pedido</TableHead>
                        <TableHead className="min-w-[200px]">Cliente</TableHead>
                        <TableHead className="min-w-[250px]">Descripción</TableHead>
                        <TableHead className="min-w-[120px] text-right">Total</TableHead>
                        <TableHead className="min-w-[120px] text-right">Saldo</TableHead>
                        <TableHead className="min-w-[120px]">Entrega Est.</TableHead>
                        <TableHead className="min-w-[100px]">Estado</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPedidos.map((pedido) => (
                        <TableRow 
                          key={pedido.id} 
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => navigate(`/pedidos/${pedido.id}`)}
                        >
                          <TableCell className="font-medium">#{pedido.id}</TableCell>
                          <TableCell className="text-muted-foreground">{pedido.nombreCliente}</TableCell>
                          <TableCell className="text-sm text-muted-foreground line-clamp-2">
                            {pedido.descripcion}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {formatCurrency(pedido.precioTotal)}
                          </TableCell>
                          <TableCell className="text-right">
                            {formatCurrency(pedido.saldoPendiente)}
                          </TableCell>
                          <TableCell className="text-sm">
                            {formatDate(pedido.fechaEntregaEstimada)}
                          </TableCell>
                          <TableCell>
                            <BadgeEstadoPedido estado={pedido.estado} />
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
