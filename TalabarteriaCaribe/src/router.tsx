import { BrowserRouter, Routes, Route, Navigate } from "react-router"
import Login from "@/pages/auth/login"
import Dashboard from "@/pages/dashboard/dashboard"

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
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
