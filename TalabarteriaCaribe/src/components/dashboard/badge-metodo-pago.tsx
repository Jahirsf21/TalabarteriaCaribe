import { Badge } from "@/components/ui/badge"
import type { MetodoPago } from "@/data"

export function BadgeMetodoPago({ metodo }: { metodo: MetodoPago }) {
  switch (metodo) {
    case "efectivo":
      return <Badge variant="outline">Efectivo</Badge>
    case "sinpe":
      return <Badge variant="secondary">SINPE</Badge>
    case "credito":
      return (
        <Badge className="border-blue-300 bg-blue-100 text-blue-800">
          Crédito
        </Badge>
      )
  }
}
