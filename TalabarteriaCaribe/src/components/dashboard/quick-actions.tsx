import { Button } from "@/components/ui/button"
import { ShoppingBag, CalendarCheck, FileText, ArrowDownToLine } from "lucide-react"

interface QuickActionsProps {
  onNavigate: (path: string) => void
}

export function QuickActions({ onNavigate }: QuickActionsProps) {
  return (
    <section aria-label="Acciones rápidas">
      <h2 className="text-xs font-bold text-muted-foreground mb-3 uppercase tracking-wider">Acciones Rápidas</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Button
          variant="outline"
          className="h-16 flex flex-col items-center justify-center gap-1 rounded-xl border border-primary/10 bg-card hover:bg-primary/5 hover:border-primary/30 transition-all group"
          onClick={() => onNavigate("/ventas/crear")}
        >
          <ShoppingBag className="h-4.5 w-4.5 text-primary group-hover:scale-110 transition-transform" />
          <span className="text-xs font-medium text-foreground">Crear venta</span>
        </Button>
        <Button
          variant="outline"
          className="h-16 flex flex-col items-center justify-center gap-1 rounded-xl border border-primary/10 bg-card hover:bg-primary/5 hover:border-primary/30 transition-all group"
          onClick={() => onNavigate("/pedidos/generar")}
        >
          <CalendarCheck className="h-4.5 w-4.5 text-primary group-hover:scale-110 transition-transform" />
          <span className="text-xs font-medium text-foreground">Generar pedido</span>
        </Button>
        <Button
          variant="outline"
          className="h-16 flex flex-col items-center justify-center gap-1 rounded-xl border border-primary/10 bg-card hover:bg-primary/5 hover:border-primary/30 transition-all group"
          onClick={() => onNavigate("/cotizaciones/generar")}
        >
          <FileText className="h-4.5 w-4.5 text-primary group-hover:scale-110 transition-transform" />
          <span className="text-xs font-medium text-foreground">Generar proforma</span>
        </Button>
        <Button
          variant="outline"
          className="h-16 flex flex-col items-center justify-center gap-1 rounded-xl border border-primary/10 bg-card hover:bg-primary/5 hover:border-primary/30 transition-all group"
          onClick={() => onNavigate("/inventario/entrada")}
        >
          <ArrowDownToLine className="h-4.5 w-4.5 text-primary group-hover:scale-110 transition-transform" />
          <span className="text-xs font-medium text-foreground">Entrada inventario</span>
        </Button>
      </div>
    </section>
  )
}
