import { Badge } from "@/components/ui/badge"
import type { EstadoPedido } from "@/data"

export function BadgeEstadoPedido({ estado }: { estado: EstadoPedido }) {
  switch (estado) {
    case "pendiente":
      return <Badge variant="secondary">Pendiente</Badge>
    case "en_produccion":
      return (
        <Badge className="border-amber-300 bg-amber-100 text-amber-800">
          En producción
        </Badge>
      )
    case "listo":
      return (
        <Badge className="border-green-300 bg-green-100 text-green-800">
          Listo
        </Badge>
      )
    case "entregado":
      return <Badge variant="outline">Entregado</Badge>
    case "cancelado":
      return <Badge variant="destructive">Cancelado</Badge>
  }
}
