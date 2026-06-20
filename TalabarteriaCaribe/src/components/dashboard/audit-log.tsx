import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Clock } from "lucide-react"
import { formatDate, formatTime } from "./utils"

interface LogAuditoria {
  id: number
  modulo: string
  accion: string
  descripcion: string
  fecha: string
}

interface AuditLogProps {
  logs: LogAuditoria[]
}

export function AuditLog({ logs }: AuditLogProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base" style={{ color: "var(--foreground)" }}>
          <Clock className="h-4 w-4" style={{ color: "#B8895B" }} />
          Registro de Auditoría
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-0 px-4">
        {logs.slice(0, 5).map((log, idx) => (
          <div key={log.id}>
            <div className="flex items-start gap-3 py-3">
              <div className="flex flex-col items-center">
                <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: "#B8895B" }} />
                {idx < 4 && (
                  <div
                    className="mt-1 w-px flex-1"
                    style={{
                      backgroundColor: "var(--border)",
                      minHeight: "1.5rem",
                    }}
                  />
                )}
              </div>

              <div className="min-w-0 flex-1 pb-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <Badge variant="secondary" className="text-xs">
                    {log.modulo}
                  </Badge>
                  <span className="text-xs font-semibold" style={{ color: "#6B3F1F" }}>
                    {log.accion}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-snug" style={{ color: "var(--foreground)" }}>
                  {log.descripcion}
                </p>
                <p className="mt-1 text-xs" style={{ color: "var(--muted-foreground)" }}>
                  {formatDate(log.fecha)} · {formatTime(log.fecha)}
                </p>
              </div>
            </div>
            {idx < 4 && <Separator style={{ marginLeft: "1.25rem" }} />}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
