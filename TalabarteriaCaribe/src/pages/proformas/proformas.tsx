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
import { cotizaciones } from "@/data"
import type { Cotizacion, EstadoCotizacion } from "@/data"
import { FileText, Download, ChevronRight, Plus, Search, X } from "lucide-react"

function BadgeEstadoCotizacion({ estado }: { estado: EstadoCotizacion }) {
  switch (estado) {
    case "borrador":
      return <Badge variant="secondary">Borrador</Badge>
    case "enviada":
      return (
        <Badge className="border-blue-300 bg-blue-100 text-blue-800">
          Enviada
        </Badge>
      )
    case "aceptada":
      return (
        <Badge className="border-green-300 bg-green-100 text-green-800">
          Aceptada
        </Badge>
      )
    case "vencida":
      return <Badge variant="destructive">Vencida</Badge>
  }
}

export default function Proformas() {
  const navigate = useNavigate()
  const [selectedCotizacion, setSelectedCotizacion] = useState<Cotizacion | null>(null)
  const [exportingId, setExportingId] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchCliente, setSearchCliente] = useState("")
  const [fechaInicio, setFechaInicio] = useState("")
  const [fechaFin, setFechaFin] = useState("")
  const [selectedEstado, setSelectedEstado] = useState<string>("")

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

  const handleExportPDF = (cot: Cotizacion) => {
    setExportingId(cot.id)
    setTimeout(() => {
      setExportingId(null)
      // Simulate download
      alert(`Simulando exportación a PDF para la Proforma #${cot.id}\nCliente: ${cot.nombreCliente}\nMonto: ${formatCurrency(cot.montoTotal)}`)
    }, 1500)
  }

  // Filter and sort cotizaciones
  const filteredCotizaciones = useMemo(() => {
    const filtered = cotizaciones.filter((cot) => {
      // Filter by proforma number
      const matchesNumero = searchTerm === "" || cot.id.toString().includes(searchTerm)
      
      // Filter by client name
      const matchesCliente = searchCliente === "" || 
        cot.nombreCliente.toLowerCase().includes(searchCliente.toLowerCase())
      
      // Filter by date range
      const cotDate = new Date(cot.creadoEn)
      const matchesFechaInicio = fechaInicio === "" || cotDate >= new Date(fechaInicio)
      const matchesFechaFin = fechaFin === "" || cotDate <= new Date(fechaFin)
      
      // Filter by estado
      const matchesEstado = selectedEstado === "" || cot.estado === selectedEstado
      
      return matchesNumero && matchesCliente && matchesFechaInicio && matchesFechaFin && matchesEstado
    })
    
    return filtered
  }, [searchTerm, searchCliente, fechaInicio, fechaFin, selectedEstado])

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
                  Proformas & Cotizaciones
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
          <div>
            <h1
              className="text-2xl font-bold font-serif"
              style={{ color: "var(--foreground)" }}
            >
              Proformas y Cotizaciones
            </h1>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              Gestión, seguimiento y exportación de cotizaciones para clientes.
            </p>
          </div>

          {/* Search and filters */}
          <div className="grid grid-cols-1 gap-4">
            <div className="relative min-w-0">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por número de proforma..."
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
            <div className="relative min-w-0">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por cliente..."
                value={searchCliente}
                onChange={(e) => setSearchCliente(e.target.value)}
                className="pl-9 h-10"
              />
              {searchCliente && (
                <button
                  onClick={() => setSearchCliente("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="flex gap-2 min-w-0">
              <input
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Fecha inicio"
              />
              <input
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Fecha fin"
              />
            </div>
            <div className="flex gap-2 min-w-0">
              <select
                value={selectedEstado}
                onChange={(e) => setSelectedEstado(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Todos los estados</option>
                <option value="borrador">Borrador</option>
                <option value="enviada">Enviada</option>
                <option value="aceptada">Aceptada</option>
                <option value="vencida">Vencida</option>
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

          <div className="flex flex-col gap-6">
            {/* List Table */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                      <FileText className="h-5 w-5" style={{ color: "#B8895B" }} />
                      Listado de Proformas
                    </CardTitle>
                    <CardDescription>
                      Documentos vigentes, aceptados y vencidos.
                    </CardDescription>
                  </div>
                  <Button
                    onClick={() => navigate("/cotizaciones/generar")}
                    className="flex items-center gap-2  md:flex"
                    style={{ backgroundColor: "#B8895B" }}
                  >
                    <Plus className="h-4 w-4" />
                    Nueva Proforma
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0 md:p-6">
                <div className="rounded-lg border" style={{ borderColor: "var(--border)" }}>
                  {/* Mobile: Card layout - show on smaller screens */}
                  <div className="xl:hidden space-y-2">
                    {filteredCotizaciones.map((cot) => (
                      <div
                        key={cot.id}
                        className="rounded-lg border p-4 space-y-3 cursor-pointer hover:bg-muted/50"
                        style={{ borderColor: "var(--border)" }}
                        onClick={() => setSelectedCotizacion(cot)}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate" style={{ color: "var(--foreground)" }}>
                              #{cot.id} - {cot.nombreCliente}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatDate(cot.creadoEn)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {cot.telefonoCliente}
                            </p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                        </div>
                        <div className="flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                          <span className="text-sm font-medium">{formatCurrency(cot.montoTotal)}</span>
                          <div className="flex items-center gap-2">
                            <BadgeEstadoCotizacion estado={cot.estado} />
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2 text-xs flex items-center gap-1"
                              disabled={exportingId === cot.id}
                              onClick={() => handleExportPDF(cot)}
                            >
                              <Download className="h-3 w-3" />
                              {exportingId === cot.id ? "PDF..." : "PDF"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop: Table layout - only show on very large screens */}
                  <div className="hidden xl:block overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="min-w-15">Proforma</TableHead>
                          <TableHead className="min-w-30">Cliente</TableHead>
                          <TableHead className="min-w-25">Fecha</TableHead>
                          <TableHead className="min-w-25 text-right">Total</TableHead>
                          <TableHead className="min-w-25">Estado</TableHead>
                          <TableHead className="min-w-30 text-center">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCotizaciones.map((cot) => (
                          <TableRow
                            key={cot.id}
                            className="cursor-pointer hover:bg-muted/50"
                            onClick={() => setSelectedCotizacion(cot)}
                          >
                            <TableCell className="font-medium">#{cot.id}</TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium text-sm">{cot.nombreCliente}</p>
                                <p className="text-xs text-muted-foreground">{cot.telefonoCliente}</p>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm">
                              {formatDate(cot.creadoEn)}
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              {formatCurrency(cot.montoTotal)}
                            </TableCell>
                            <TableCell>
                              <BadgeEstadoCotizacion estado={cot.estado} />
                            </TableCell>
                            <TableCell onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center justify-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 px-2 text-xs flex items-center gap-1"
                                  disabled={exportingId === cot.id}
                                  onClick={() => handleExportPDF(cot)}
                                >
                                  <Download className="h-3 w-3" />
                                  {exportingId === cot.id ? "PDF..." : "PDF"}
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detail View */}
            {selectedCotizacion ? (
              <Card className="border-primary/20">
                <CardHeader className="bg-primary/5 pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-serif">
                      Detalle de Proforma #{selectedCotizacion.id}
                    </CardTitle>
                    <BadgeEstadoCotizacion estado={selectedCotizacion.estado} />
                  </div>
                  <CardDescription>
                    Creada el {formatDate(selectedCotizacion.creadoEn)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                    <div>
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase">Cliente</h4>
                      <p className="text-sm font-medium">{selectedCotizacion.nombreCliente}</p>
                      <p className="text-xs text-muted-foreground">{selectedCotizacion.telefonoCliente}</p>
                      {selectedCotizacion.correoCliente && (
                        <p className="text-xs text-muted-foreground">{selectedCotizacion.correoCliente}</p>
                      )}
                    </div>

                    <Separator />

                    <div>
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Artículos</h4>
                      <div className="space-y-2">
                        {selectedCotizacion.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              {item.cantidad}x {item.nombreProducto}
                            </span>
                            <span className="font-medium">{formatCurrency(item.subtotal)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center bg-muted/50 p-2.5 rounded-lg">
                      <span className="text-sm font-semibold">Monto Total</span>
                      <span className="text-base font-bold text-primary">
                        {formatCurrency(selectedCotizacion.montoTotal)}
                      </span>
                    </div>

                    {selectedCotizacion.notas && (
                      <div className="text-xs bg-amber-50 text-amber-800 p-2.5 rounded border border-amber-200">
                        <strong>Notas:</strong> {selectedCotizacion.notas}
                      </div>
                    )}

                    <div className="pt-2 flex gap-2">
                      <Button
                        className="w-full flex items-center justify-center gap-2"
                        onClick={() => handleExportPDF(selectedCotizacion)}
                        disabled={exportingId === selectedCotizacion.id}
                      >
                        <Download className="h-4 w-4" />
                        {exportingId === selectedCotizacion.id ? "Generando PDF..." : "Exportar a PDF"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="flex items-center justify-center p-12 text-center border-dashed">
                  <div className="space-y-2">
                    <FileText className="h-8 w-8 mx-auto text-muted-foreground/60" />
                    <p className="text-sm font-medium text-muted-foreground">
                      Selecciona una proforma para ver sus detalles y exportar
                    </p>
                  </div>
                </Card>
              )}
          </div>

          {/* Floating action button for mobile */}
          <Button
            onClick={() => navigate("/cotizaciones/generar")}
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
