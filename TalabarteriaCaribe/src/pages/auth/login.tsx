import { useState } from "react"
import { useNavigate } from "react-router"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircle, Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

import { usuarios } from "@/data/usuarios"

const loginSchema = z.object({
  usuario: z.string().min(1, "El usuario es requerido."),
  password: z.string().min(1, "La contraseña es requerida."),
})

type LoginForm = z.infer<typeof loginSchema>

export default function Login() {
  const navigate = useNavigate()

  const [mostrarPassword, setMostrarPassword] = useState(false)
  const [errorGeneral, setErrorGeneral] = useState("")
  const [cargando, setCargando] = useState(false)

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      usuario: "",
      password: "",
    },
  })

  const onSubmit = (valores: LoginForm) => {
    setErrorGeneral("")
    setCargando(true)

    setTimeout(() => {
      const encontrado = usuarios.find(
        (u) =>
          u.usuario === valores.usuario &&
          u.password === valores.password &&
          u.activo
      )

      if (encontrado) {
        localStorage.setItem("usuario", JSON.stringify(encontrado))
        navigate("/dashboard")
      } else {
        setErrorGeneral("Usuario o contraseña incorrectos.")
      }

      setCargando(false)
    }, 600)
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #F8F3EC 0%, #F5EFE6 45%, #E9DCCB 100%)",
      }}
    >
      <div
        className="absolute w-150 h-150 rounded-full blur-3xl opacity-20"
        style={{
          backgroundColor: "#B8895B",
          top: "-150px",
          right: "-150px",
        }}
      />

      <div
        className="absolute w-125 h-125 rounded-full blur-3xl opacity-10"
        style={{
          backgroundColor: "#6B3F1F",
          bottom: "-200px",
          left: "-150px",
        }}
      />

      <div
        className="relative z-10 w-full max-w-md rounded-3xl border p-8 shadow-2xl backdrop-blur-sm"
        style={{
          backgroundColor: "rgba(252, 248, 244, 0.96)",
          borderColor: "#D9C3A5",
        }}
      >
        <div className="mb-5 flex justify-center">
          <img
            src="/talabarteriacaribe.svg"
            alt="Talabartería Caribe"
            className="h-36 w-auto"
          />
        </div>

        <h1
          className="mb-2 text-center text-3xl font-semibold font-serif"
          style={{ color: "#3B1F0E" }}
        >
          Talabartería Caribe
        </h1>

        <p
          className="mb-8 text-center text-base"
          style={{ color: "#8B6347" }}
        >
          Ingresa tus credenciales para continuar
        </p>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="usuario"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel style={{ color: "#3B1F0E" }}>
                    Usuario
                  </FieldLabel>

                  <Input
                    {...field}
                    placeholder="Tu nombre de usuario"
                    aria-invalid={fieldState.invalid}
                    style={{
                      backgroundColor: "#FDF8F2",
                      borderColor: "#C9A87C",
                      color: "#3B1F0E",
                      height: "2.9rem",
                    }}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel style={{ color: "#3B1F0E" }}>
                    Contraseña
                  </FieldLabel>

                  <div className="relative">
                    <Input
                      {...field}
                      type={mostrarPassword ? "text" : "password"}
                      placeholder="••••••••"
                      aria-invalid={fieldState.invalid}
                      style={{
                        backgroundColor: "#FDF8F2",
                        borderColor: "#C9A87C",
                        color: "#3B1F0E",
                        height: "2.9rem",
                        paddingRight: "3rem",
                      }}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setMostrarPassword(!mostrarPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                      style={{ color: "#8B6347" }}
                      aria-label={
                        mostrarPassword
                          ? "Ocultar contraseña"
                          : "Mostrar contraseña"
                      }
                    >
                      {mostrarPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          {errorGeneral && (
            <Alert className="mt-5 border-red-300 bg-red-50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-red-700">
                {errorGeneral}
              </AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            disabled={cargando}
            className="mt-5 w-full"
            style={{
              backgroundColor: "#6B3F1F",
              color: "#F5EFE6",
              height: "2.9rem",
              fontSize: "1rem",
            }}
          >
            {cargando ? "Ingresando..." : "Ingresar"}
          </Button>
        </form>
      </div>
    </div>
  )
}
