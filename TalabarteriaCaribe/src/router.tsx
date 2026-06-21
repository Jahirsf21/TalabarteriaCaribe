import { BrowserRouter, Routes, Route, Navigate } from "react-router"
import Login from "@/pages/auth/login"
import Dashboard from "@/pages/dashboard/dashboard"
import Proformas from "@/pages/proformas/proformas"
import CrearVenta from "@/pages/dashboard/crear-venta"
import GenerarPedido from "@/pages/dashboard/generar-pedido"
import GenerarProforma from "@/pages/dashboard/generar-proforma"
import EntradaInventario from "@/pages/dashboard/entrada-inventario"
import Productos from "@/pages/productos/productos"
import NuevoProducto from "@/pages/productos/nuevo-producto"
import EditarProducto from "@/pages/productos/editar-producto"
import Materiales from "@/pages/materiales/materiales"
import NuevoMaterial from "@/pages/materiales/nuevo-material"
import EditarMaterial from "@/pages/materiales/editar-material"
import Clientes from "@/pages/clientes/clientes"
import NuevoCliente from "@/pages/clientes/nuevo-cliente"
import Proveedores from "@/pages/proveedores/proveedores"
import NuevoProveedor from "@/pages/proveedores/nuevo-proveedor"
import Pedidos from "@/pages/pedidos/pedidos"
import DetallePedido from "@/pages/pedidos/detalle-pedido"
import Ventas from "@/pages/ventas/ventas"
import DetalleVenta from "@/pages/ventas/detalle-venta"
import RegistrarDevolucion from "@/pages/ventas/registrar-devolucion"
import Auditoria from "@/pages/auditoria/auditoria"


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
        {/* ── Ventas ── */}
        <Route
          path="/ventas"
          element={
            <RutaProtegida>
              <Ventas />
            </RutaProtegida>
          }
        />
        <Route
          path="/ventas/:id"
          element={
            <RutaProtegida>
              <DetalleVenta />
            </RutaProtegida>
          }
        />
        <Route
          path="/ventas/:id/devolucion"
          element={
            <RutaProtegida>
              <RegistrarDevolucion />
            </RutaProtegida>
          }
        />
        {/* ── Pedidos ── */}
        <Route
          path="/pedidos/generar"
          element={
            <RutaProtegida>
              <GenerarPedido />
            </RutaProtegida>
          }
        />
        <Route
          path="/pedidos/:id"
          element={
            <RutaProtegida>
              <DetallePedido />
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
        <Route
          path="/productos"
          element={
            <RutaProtegida>
              <Productos />
            </RutaProtegida>
          }
        />
        <Route
          path="/productos/nuevo"
          element={
            <RutaProtegida>
              <NuevoProducto />
            </RutaProtegida>
          }
        />
        <Route
          path="/productos/editar"
          element={
            <RutaProtegida>
              <EditarProducto />
            </RutaProtegida>
          }
        />
        <Route
          path="/materiales"
          element={
            <RutaProtegida>
              <Materiales />
            </RutaProtegida>
          }
        />
        <Route
          path="/materiales/nuevo"
          element={
            <RutaProtegida>
              <NuevoMaterial />
            </RutaProtegida>
          }
        />
        <Route
          path="/materiales/editar"
          element={
            <RutaProtegida>
              <EditarMaterial />
            </RutaProtegida>
          }
        />
        <Route
          path="/clientes"
          element={
            <RutaProtegida>
              <Clientes />
            </RutaProtegida>
          }
        />
        <Route
          path="/clientes/nuevo"
          element={
            <RutaProtegida>
              <NuevoCliente />
            </RutaProtegida>
          }
        />
        <Route
          path="/proveedores"
          element={
            <RutaProtegida>
              <Proveedores />
            </RutaProtegida>
          }
        />
        <Route
          path="/proveedores/nuevo"
          element={
            <RutaProtegida>
              <NuevoProveedor />
            </RutaProtegida>
          }
        />
        <Route
          path="/pedidos"
          element={
            <RutaProtegida>
              <Pedidos />
            </RutaProtegida>
          }
        />
        <Route
          path="/auditoria"
          element={
            <RutaProtegida>
              <Auditoria />
            </RutaProtegida>
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}