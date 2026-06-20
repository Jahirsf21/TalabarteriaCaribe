import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PackageX } from "lucide-react"

interface StockAlertItem {
  nombre: string
  tipo: string
  stock: string
  estado: "bajo" | "agotado"
}

interface StockAlertsProps {
  stockAlerts: StockAlertItem[]
}

export function StockAlerts({ stockAlerts }: StockAlertsProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base" style={{ color: "var(--foreground)" }}>
          <PackageX className="h-4 w-4" style={{ color: "#B8895B" }} />
          Alertas de Stock
          <Badge variant="destructive" className="ml-auto text-xs">
            {stockAlerts.length} ítems
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {stockAlerts.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between rounded-lg border px-3 py-2"
            style={{
              backgroundColor: "var(--background)",
              borderColor: "var(--border)",
            }}
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium" style={{ color: "var(--foreground)" }}>
                {item.nombre}
              </p>
              <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                {item.tipo} · {item.stock}
              </p>
            </div>
            <div className="ml-2 shrink-0">
              {item.estado === "agotado" ? (
                <Badge variant="destructive">Agotado</Badge>
              ) : (
                <Badge className="border-amber-300 bg-amber-100 text-amber-800">
                  Stock bajo
                </Badge>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
