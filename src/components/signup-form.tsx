"use client";
import Link from "next/link";
import { useState } from "react"
import { registerUser } from "@/services/authService"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) =>{
    e.preventDefault() //evita que se recargue la pagina
    //si la contraseña no es igual
    if(form.password !== form.confirmPassword){
      setMessage("Las contraseñas no coinciden")
      return
    }
    try {
      await registerUser({
        username: form.name,
        email: form.email,
        password: form.password,
      })
      setMessage("Registro exitoso, ya puedes iniciar sesión")
    } catch (err){
      setMessage("Hubo un error al registrarte")
    }
  }


  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Crea una cuenta</CardTitle>
        <CardDescription>
          Ingresa tu informacion debajo para crear tu cuenta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Usuario</FieldLabel>
              <Input id="name" type="text" placeholder="John Doe" required
              value={form.name}
              onChange={(e)=> setForm({...form, name: e.target.value})} />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Contraseña</FieldLabel>
              <Input id="password" type="password" required
              value={form.password}
              onChange={(e)=>setForm({...form, password: e.target.value})}
              />
              <FieldDescription>
                Debe ser mas larga de 8 caracteres
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirmar contraseña
              </FieldLabel>
              <Input id="confirm-password" type="password" required
              value={form.confirmPassword}
              onChange={(e)=>setForm({...form, confirmPassword: e.target.value})}
              />
              <FieldDescription>{message && <span className="mt-2 text-center text-blue-600">{message}</span>}</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Crear cuenta</Button>
                <FieldDescription className="px-6 text-center">
                  Ya tienes una cuenta? <Link href="/login">Iniciar Sesión</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
        
      </CardContent>
    </Card>
  )
}
