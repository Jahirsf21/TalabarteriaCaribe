import { useState } from "react"
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
import { FileText, Download, Eye } from "lucide-react"

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
  const [selectedCotizacion, setSelectedCotizacion] = useState<Cotizacion | null>(null)
  const [exportingId, setExportingId] = useState<number | null>(null)

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

          <div className="grid gap-6 lg:grid-cols-3">
            {/* List Table */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <FileText className="h-5 w-5" style={{ color: "#B8895B" }} />
                  Listado de Proformas
                </CardTitle>
                <CardDescription>
                  Documentos vigentes, aceptados y vencidos.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 md:p-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-20">Proforma</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-center">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cotizaciones.map((cot) => (
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
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => setSelectedCotizacion(cot)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
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
              </CardContent>
            </Card>

            {/* Detail View */}
            <div>
              {selectedCotizacion ? (
                <Card className="sticky top-20 border-primary/20">
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
                <Card className="h-full flex items-center justify-center p-6 text-center border-dashed">
                  <div className="space-y-2">
                    <FileText className="h-8 w-8 mx-auto text-muted-foreground/60" />
                    <p className="text-sm font-medium text-muted-foreground">
                      Selecciona una proforma para ver sus detalles y exportar
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
