import { useState, useMemo } from "react"
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
import { logAuditoria, movimientosInventario } from "@/data"
import { FileText, Search, X, ArrowDownCircle, ArrowUpCircle, AlertCircle } from "lucide-react"

function BadgeTipoMovimiento({ tipo }: { tipo: "entrada" | "salida" | "ajuste" }) {
  switch (tipo) {
    case "entrada":
      return (
        <Badge className="border-green-300 bg-green-100 text-green-800 flex items-center gap-1">
          <ArrowDownCircle className="h-3 w-3" />
          Entrada
        </Badge>
      )
    case "salida":
      return (
        <Badge className="border-red-300 bg-red-100 text-red-800 flex items-center gap-1">
          <ArrowUpCircle className="h-3 w-3" />
          Salida
        </Badge>
      )
    case "ajuste":
      return (
        <Badge className="border-amber-300 bg-amber-100 text-amber-800 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          Ajuste
        </Badge>
      )
  }
}

function BadgeTipoItem({ tipo }: { tipo: "producto" | "materia_prima" }) {
  if (tipo === "producto") {
    return <Badge variant="secondary">Producto</Badge>
  }
  return <Badge variant="outline">Materia Prima</Badge>
}

export default function Auditoria() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedModulo, setSelectedModulo] = useState<string>("")
  const [fechaInicio, setFechaInicio] = useState("")
  const [fechaFin, setFechaFin] = useState("")

  // Get unique modulos
  const modulos = useMemo(() => {
    const mods = new Set(logAuditoria.map((log) => log.modulo))
    return Array.from(mods).sort()
  }, [])

  // Filter log de auditoria
  const filteredLogAuditoria = useMemo(() => {
    return logAuditoria.filter((log) => {
      const matchesSearch = searchTerm === "" || 
        log.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.accion.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesModulo = selectedModulo === "" || log.modulo === selectedModulo
      
      const logDate = new Date(log.fecha)
      const matchesFechaInicio = fechaInicio === "" || logDate >= new Date(fechaInicio)
      const matchesFechaFin = fechaFin === "" || logDate <= new Date(fechaFin)
      
      return matchesSearch && matchesModulo && matchesFechaInicio && matchesFechaFin
    })
  }, [searchTerm, selectedModulo, fechaInicio, fechaFin])

  // Filter movimientos de inventario
  const filteredMovimientos = useMemo(() => {
    return movimientosInventario.filter((mov) => {
      const matchesSearch = searchTerm === "" || 
        mov.nombreItem.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mov.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mov.motivo.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesSearch
    })
  }, [searchTerm])

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString("es-CR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
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
                  Auditoría
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
              Auditoría del Sistema
            </h1>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              Registro de operaciones y movimientos de inventario
            </p>
          </div>

          {/* Search and filters */}
          <div className="grid grid-cols-1 gap-4">
            <div className="relative min-w-0">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por usuario, acción o descripción..."
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
                value={selectedModulo}
                onChange={(e) => setSelectedModulo(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Todos los módulos</option>
                {modulos.map((modulo) => (
                  <option key={modulo} value={modulo}>
                    {modulo}
                  </option>
                ))}
              </select>
              {selectedModulo && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setSelectedModulo("")}
                  className="h-10 w-10 shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Log de Auditoría */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <FileText className="h-5 w-5" style={{ color: "#B8895B" }} />
                    Log de Operaciones
                  </CardTitle>
                  <CardDescription>
                    {filteredLogAuditoria.length} registro{filteredLogAuditoria.length !== 1 ? "s" : ""} de auditoría
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 md:p-6">
              <div className="rounded-lg border" style={{ borderColor: "var(--border)" }}>
                {/* Mobile: Card layout */}
                <div className="xl:hidden space-y-2">
                  {filteredLogAuditoria.map((log) => (
                    <div
                      key={log.id}
                      className="rounded-lg border p-4 space-y-3"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm" style={{ color: "var(--foreground)" }}>
                            {log.accion} - {log.modulo}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {log.usuario}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(log.fecha)}
                          </p>
                        </div>
                        <Badge variant="secondary">{log.modulo}</Badge>
                      </div>
                      <div className="text-sm">
                        <p className="text-muted-foreground">{log.descripcion}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop: Table layout */}
                <div className="hidden xl:block overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-25">Fecha</TableHead>
                        <TableHead className="min-w-37.5">Usuario</TableHead>
                        <TableHead className="min-w-25">Módulo</TableHead>
                        <TableHead className="min-w-25">Acción</TableHead>
                        <TableHead className="min-w-75">Descripción</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLogAuditoria.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="text-sm">
                            {formatDate(log.fecha)}
                          </TableCell>
                          <TableCell className="text-muted-foreground">{log.usuario}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{log.modulo}</Badge>
                          </TableCell>
                          <TableCell className="font-medium">{log.accion}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {log.descripcion}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Movimientos de Inventario */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <FileText className="h-5 w-5" style={{ color: "#B8895B" }} />
                    Movimientos de Inventario
                  </CardTitle>
                  <CardDescription>
                    {filteredMovimientos.length} movimiento{filteredMovimientos.length !== 1 ? "s" : ""} registrados
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 md:p-6">
              <div className="rounded-lg border" style={{ borderColor: "var(--border)" }}>
                {/* Mobile: Card layout */}
                <div className="xl:hidden space-y-2">
                  {filteredMovimientos.map((mov) => (
                    <div
                      key={mov.id}
                      className="rounded-lg border p-4 space-y-3"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate" style={{ color: "var(--foreground)" }}>
                            {mov.nombreItem}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {mov.usuario}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(mov.fecha)}
                          </p>
                        </div>
                        <BadgeTipoMovimiento tipo={mov.tipo} />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Cantidad: {mov.cantidad}</p>
                          <p className="text-muted-foreground">Saldo: {mov.saldoResultante}</p>
                        </div>
                        <BadgeTipoItem tipo={mov.tipoItem} />
                      </div>
                      <p className="text-xs text-muted-foreground">{mov.motivo}</p>
                    </div>
                  ))}
                </div>

                {/* Desktop: Table layout */}
                <div className="hidden xl:block overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-25">Fecha</TableHead>
                        <TableHead className="min-w-37.5">Usuario</TableHead>
                        <TableHead className="min-w-50">Ítem</TableHead>
                        <TableHead className="min-w-25">Tipo</TableHead>
                        <TableHead className="min-w-20 text-right">Cantidad</TableHead>
                        <TableHead className="min-w-20 text-right">Saldo</TableHead>
                        <TableHead className="min-w-75">Motivo</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMovimientos.map((mov) => (
                        <TableRow key={mov.id}>
                          <TableCell className="text-sm">
                            {formatDate(mov.fecha)}
                          </TableCell>
                          <TableCell className="text-muted-foreground">{mov.usuario}</TableCell>
                          <TableCell className="font-medium">{mov.nombreItem}</TableCell>
                          <TableCell>
                            <BadgeTipoMovimiento tipo={mov.tipo} />
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {mov.cantidad}
                          </TableCell>
                          <TableCell className="text-right">
                            {mov.saldoResultante}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {mov.motivo}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
