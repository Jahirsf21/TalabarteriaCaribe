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
import { ventas } from "@/data"
import type { Venta, EstadoVenta, MetodoPago } from "@/data"
import { DollarSign, Plus, Search, X, ChevronRight } from "lucide-react"

function BadgeEstadoVenta({ estado }: { estado: EstadoVenta }) {
  if (estado === "con_devolucion") {
    return <Badge variant="destructive">Con Devolución</Badge>
  }
  return (
    <Badge className="border-green-300 bg-green-100 text-green-800">
      Completada
    </Badge>
  )
}

function BadgeMetodoPago({ metodo }: { metodo: MetodoPago }) {
  switch (metodo) {
    case "efectivo":
      return <Badge variant="secondary">Efectivo</Badge>
    case "sinpe":
      return (
        <Badge className="border-blue-300 bg-blue-100 text-blue-800">
          SINPE
        </Badge>
      )
    case "credito":
      return (
        <Badge className="border-amber-300 bg-amber-100 text-amber-800">
          Crédito
        </Badge>
      )
  }
}

export default function Ventas() {
  const navigate = useNavigate()
  const [ventasList] = useState<Venta[]>(ventas)
  const [searchTerm, setSearchTerm] = useState("")
  const [fechaInicio, setFechaInicio] = useState("")
  const [fechaFin, setFechaFin] = useState("")
  const [selectedEstado, setSelectedEstado] = useState<string>("")
  const [selectedMetodo, setSelectedMetodo] = useState<string>("")

  const filteredVentas = useMemo(() => {
    return ventasList.filter((venta) => {
      const matchesSearch =
        searchTerm === "" ||
        venta.nombreCliente
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        venta.id.toString().includes(searchTerm) ||
        venta.items.some((item) =>
          item.nombreProducto
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )

      const ventaDate = new Date(venta.fecha)
      const matchesFechaInicio =
        fechaInicio === "" || ventaDate >= new Date(fechaInicio)
      const matchesFechaFin =
        fechaFin === "" || ventaDate <= new Date(fechaFin)

      const matchesEstado =
        selectedEstado === "" || venta.estado === selectedEstado
      const matchesMetodo =
        selectedMetodo === "" || venta.metodoPago === selectedMetodo

      return (
        matchesSearch &&
        matchesFechaInicio &&
        matchesFechaFin &&
        matchesEstado &&
        matchesMetodo
      )
    })
  }, [
    ventasList,
    searchTerm,
    fechaInicio,
    fechaFin,
    selectedEstado,
    selectedMetodo,
  ])

  const formatCurrency = (amount: number) =>
    `₡${amount.toLocaleString("es-CR")}`

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("es-CR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })

  const formatDateHour = (iso: string) =>
    new Date(iso).toLocaleString("es-CR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })

  const handleAdd = () => navigate("/ventas/crear")

  const handleRowClick = (ventaId: number) =>
    navigate(`/ventas/${ventaId}`)

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
                  Ventas
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
              Gestión de Ventas
            </h1>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              Administre el registro de ventas
            </p>
          </div>

          {/* Search and filters */}
          <div className="grid grid-cols-1 gap-4">
            <div className="relative min-w-0">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por cliente, n.° de venta o producto..."
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
                <option value="completada">Completada</option>
                <option value="con_devolucion">Con Devolución</option>
              </select>
              <select
                value={selectedMetodo}
                onChange={(e) => setSelectedMetodo(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Todos los métodos</option>
                <option value="efectivo">Efectivo</option>
                <option value="sinpe">SINPE</option>
                <option value="credito">Crédito</option>
              </select>
              {(selectedEstado || selectedMetodo) && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setSelectedEstado("")
                    setSelectedMetodo("")
                  }}
                  className="h-10 w-10 shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Ventas list */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <DollarSign
                      className="h-5 w-5"
                      style={{ color: "#B8895B" }}
                    />
                    Listado de Ventas
                  </CardTitle>
                  <CardDescription>
                    {filteredVentas.length} venta
                    {filteredVentas.length !== 1 ? "s" : ""} registradas
                    {" · "}
                    <span className="text-xs">
                      Haga clic en una fila para ver el detalle
                    </span>
                  </CardDescription>
                </div>
                <Button
                  onClick={handleAdd}
                  className="hidden md:flex items-center gap-2 h-10"
                  style={{ backgroundColor: "#B8895B" }}
                >
                  <Plus className="h-4 w-4" />
                  Nueva Venta
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 md:p-6">
              <div
                className="rounded-lg border"
                style={{ borderColor: "var(--border)" }}
              >
                {/* Mobile: Card layout */}
                <div className="xl:hidden space-y-2 p-2">
                  {filteredVentas.map((venta) => (
                    <div
                      key={venta.id}
                      className="rounded-lg border p-4 space-y-3 cursor-pointer hover:bg-muted/40 transition-colors"
                      style={{ borderColor: "var(--border)" }}
                      onClick={() => handleRowClick(venta.id)}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p
                            className="font-medium text-sm truncate"
                            style={{ color: "var(--foreground)" }}
                          >
                            #{venta.id} — {venta.nombreCliente}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDateHour(venta.fecha)}
                          </p>
                          {/* Productos vendidos */}
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                            {venta.items
                              .map(
                                (i) =>
                                  `${i.cantidad}× ${i.nombreProducto}`
                              )
                              .join(", ")}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <BadgeEstadoVenta estado={venta.estado} />
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <BadgeMetodoPago metodo={venta.metodoPago} />
                        <span
                          className="font-semibold"
                          style={{ color: "var(--foreground)" }}
                        >
                          {formatCurrency(venta.total)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop: Table layout */}
                <div className="hidden xl:block overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-17.5">Venta</TableHead>
                        <TableHead className="min-w-40">Cliente</TableHead>
                        <TableHead className="min-w-38.75">Fecha y hora</TableHead>
                        <TableHead className="min-w-55">Productos vendidos</TableHead>
                        <TableHead className="min-w-27.5 text-right">Total</TableHead>
                        <TableHead className="min-w-25">Método</TableHead>
                        <TableHead className="min-w-32.5">Estado</TableHead>
                        <TableHead className="w-10" />
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredVentas.map((venta) => (
                        <TableRow
                          key={venta.id}
                          className="cursor-pointer hover:bg-muted/40"
                          onClick={() => handleRowClick(venta.id)}
                        >
                          <TableCell className="font-medium">
                            #{venta.id}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {venta.nombreCliente}
                          </TableCell>
                          <TableCell className="text-sm">
                            {formatDate(venta.fecha)}
                            <br />
                            <span className="text-xs text-muted-foreground">
                              {new Date(venta.fecha).toLocaleTimeString(
                                "es-CR",
                                { hour: "2-digit", minute: "2-digit" }
                              )}
                            </span>
                          </TableCell>
                          {/* Productos vendidos con cantidad */}
                          <TableCell className="text-sm">
                            <div className="space-y-0.5">
                              {venta.items.map((item) => (
                                <p
                                  key={item.productoId}
                                  className="text-xs text-muted-foreground"
                                >
                                  <span className="font-medium text-foreground">
                                    {item.cantidad}×
                                  </span>{" "}
                                  {item.nombreProducto}
                                </p>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {formatCurrency(venta.total)}
                          </TableCell>
                          <TableCell>
                            <BadgeMetodoPago metodo={venta.metodoPago} />
                          </TableCell>
                          <TableCell>
                            <BadgeEstadoVenta estado={venta.estado} />
                          </TableCell>
                          <TableCell>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
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
