"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { loginUser } from "@/services/authService";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Llamamos al backend para login
      const data = await loginUser({ username: form.username, password: form.password });

      document.cookie = `access_token=${data.access}; path=/;`;
      document.cookie = `refresh_token=${data.refresh}; path=/;`;

      router.push("/gastos");

      // Mostramos mensaje de éxito (opcional)
      setMessage("Login exitoso!");


    } catch (err) {
      setMessage("Hubo un error al intentar iniciar sesión. Revisa tu correo o contraseña.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      
      <Card>
        <CardHeader>
          <CardTitle>Inicia Sesión con tu usuario</CardTitle>
          <CardDescription>Ingresa tu usuario para iniciar sesión</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">usuario</FieldLabel>
                <Input
                  id="usuario"
                  type="text"
                  placeholder="tunombre"
                  required
                  value={form.username}
                  onChange={(e) => {
                    setForm({ ...form, username: e.target.value });
                    setMessage(""); // Limpiar mensaje al escribir
                  }}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) => {
                    setForm({ ...form, password: e.target.value });
                    setMessage(""); // Limpiar mensaje al escribir
                  }}
                />
              </Field>

              {message && (
                <span className="mt-2 text-center text-red-600">{message}</span>
              )}

              <Field>
                <Button type="submit">Iniciar sesión</Button>
                <FieldDescription className="text-center">
                  No tienes una cuenta? <Link href="/registro">Registrarse</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
