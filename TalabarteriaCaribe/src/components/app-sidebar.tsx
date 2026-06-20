import * as React from "react"
import { useNavigate, useLocation } from "react-router"
import {
  LayoutDashboard,
  ShoppingCart,
  ClipboardList,
  Package,
  Layers,
  Users,
  Truck,
  FileText,
  LogOut,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const navItems = [
  { title: "Dashboard",      url: "/dashboard",      icon: LayoutDashboard },
  { title: "Ventas",         url: "/ventas",          icon: ShoppingCart    },
  { title: "Pedidos",        url: "/pedidos",         icon: ClipboardList   },
  { title: "Proformas / Cotizaciones", url: "/proformas", icon: FileText    },
  { title: "Productos",      url: "/productos",       icon: Package         },
  { title: "Materias Primas",url: "/materiales",     icon: Layers          },
  { title: "Clientes",       url: "/clientes",        icon: Users           },
  { title: "Proveedores",    url: "/proveedores",     icon: Truck           },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigate  = useNavigate()
  const location  = useLocation()

  const usuario = React.useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("usuario") || "{}")
    } catch {
      return {}
    }
  }, [])

  const iniciales = React.useMemo(() => {
    const nombre: string = usuario?.nombre ?? "HC"
    return nombre
      .split(" ")
      .slice(0, 2)
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
  }, [usuario])

  const handleLogout = () => {
    localStorage.removeItem("usuario")
    navigate("/login")
  }

  return (
    <Sidebar {...props}>
      {/* ── Header: logo + nombre ── */}
      <SidebarHeader
        className="border-b px-4 py-3"
        style={{ borderColor: "var(--sidebar-border)" }}
      >
        <div className="flex items-center gap-3">
          <img
            src="/talabarteriacaribe.svg"
            alt="Talabartería Caribe"
            className="h-10 w-auto shrink-0"
          />
          <div className="leading-tight">
            <p
              className="text-sm font-semibold font-serif"
              style={{ color: "var(--sidebar-foreground)" }}
            >
              Talabartería
            </p>
            <p
              className="text-sm font-semibold font-serif"
              style={{ color: "var(--sidebar-primary)" }}
            >
              Caribe
            </p>
          </div>
        </div>
      </SidebarHeader>

      {/* ── Navegación principal ── */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menú principal</SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map((item) => {
              const isActive = location.pathname === item.url
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={item.title}
                  >
                    <a
                      href={item.url}
                      onClick={(e) => {
                        e.preventDefault()
                        navigate(item.url)
                      }}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* ── Footer: usuario + logout ── */}
      <SidebarFooter
        className="border-t p-3"
        style={{ borderColor: "var(--sidebar-border)" }}
      >
        <div className="flex items-center gap-3">
          <Avatar size="default">
            <AvatarFallback
              style={{
                backgroundColor: "var(--sidebar-primary)",
                color: "var(--sidebar-primary-foreground)",
                fontSize: "0.7rem",
                fontWeight: 600,
              }}
            >
              {iniciales}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <p
              className="truncate text-sm font-medium leading-tight"
              style={{ color: "var(--sidebar-foreground)" }}
            >
              {usuario?.nombre ?? "Hellen Caribe"}
            </p>
            <p
              className="text-xs capitalize"
              style={{ color: "var(--muted-foreground)" }}
            >
              {usuario?.rol ?? "administradora"}
            </p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="h-8 w-8 shrink-0"
            style={{ color: "var(--muted-foreground)" }}
            title="Cerrar sesión"
            aria-label="Cerrar sesión"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
