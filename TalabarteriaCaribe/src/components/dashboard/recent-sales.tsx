import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Venta } from "@/data"
import { formatCurrency, formatDate } from "./utils"
import { BadgeMetodoPago } from "./badge-metodo-pago"

interface RecentSalesProps {
  ventas: Venta[]
}

export function RecentSales({ ventas }: RecentSalesProps) {
  return (
    <section aria-label="Historial de ventas">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base" style={{ color: "var(--foreground)" }}>
            Últimas Ventas
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Tabla tradicional SOLO en Desktop / Tablets */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">Venta</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="text-right">Monto</TableHead>
                  <TableHead>Método</TableHead>
                  <TableHead className="w-25 text-right">Ref. SINPE</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ventas.slice(0, 5).map((venta) => (
                  <TableRow key={venta.id}>
                    <TableCell className="font-semibold">#{venta.id}</TableCell>
                    <TableCell className="text-xs">{formatDate(venta.fecha)}</TableCell>
                    <TableCell className="text-sm font-medium">{venta.nombreCliente}</TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(venta.total)}</TableCell>
                    <TableCell>
                      <BadgeMetodoPago metodo={venta.metodoPago} />
                    </TableCell>
                    <TableCell className="text-right font-mono text-xs">{venta.referenciaSinpe ?? "—"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Tarjetas (Cards) SOLO en Móviles (Mobile-First) */}
          <div className="md:hidden space-y-3 p-4">
            {ventas.slice(0, 5).map((venta) => (
              <div
                key={venta.id}
                className="rounded-xl border p-3 space-y-2"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--background)" }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>
                      #{venta.id} - {venta.nombreCliente}
                    </p>
                    <p className="text-xs text-muted-foreground">{formatDate(venta.fecha)}</p>
                  </div>
                  <span className="font-bold text-sm text-green-700">+{formatCurrency(venta.total)}</span>
                </div>
                <div className="flex justify-between items-center pt-1 border-t" style={{ borderColor: "var(--border)" }}>
                  <BadgeMetodoPago metodo={venta.metodoPago} />
                  {venta.referenciaSinpe && (
                    <span className="font-mono text-xs text-muted-foreground">Ref: {venta.referenciaSinpe}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
