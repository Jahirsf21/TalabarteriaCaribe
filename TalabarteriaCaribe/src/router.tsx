import { BrowserRouter, Routes, Route, Navigate } from "react-router"
import Login from "@/pages/auth/login"
import Dashboard from "@/pages/dashboard/dashboard"
import Proformas from "@/pages/dashboard/proformas"
import CrearVenta from "@/pages/dashboard/crear-venta"
import GenerarPedido from "@/pages/dashboard/generar-pedido"
import GenerarProforma from "@/pages/dashboard/generar-proforma"
import EntradaInventario from "@/pages/dashboard/entrada-inventario"


// Ruta protegida — redirige al login si no hay sesión activa
function RutaProtegida({ children }: { children: React.ReactNode }) {
  const usuario = localStorage.getItem("usuario")
  return usuario ? <>{children}</> : <Navigate to="/login" replace />
}

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <RutaProtegida>
              <Dashboard />
            </RutaProtegida>
          }
        />
        <Route
          path="/proformas"
          element={
            <RutaProtegida>
              <Proformas />
            </RutaProtegida>
          }
        />
        <Route
          path="/ventas/crear"
          element={
            <RutaProtegida>
              <CrearVenta />
            </RutaProtegida>
          }
        />
        <Route
          path="/pedidos/generar"
          element={
            <RutaProtegida>
              <GenerarPedido />
            </RutaProtegida>
          }
        />
        <Route
          path="/cotizaciones/generar"
          element={
            <RutaProtegida>
              <GenerarProforma />
            </RutaProtegida>
          }
        />
        <Route
          path="/inventario/entrada"
          element={
            <RutaProtegida>
              <EntradaInventario />
            </RutaProtegida>
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
