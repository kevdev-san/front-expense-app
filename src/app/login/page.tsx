import { loginUser } from "@/services/authService"
import { LoginForm } from "@/components/login-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Page() {
    return (
        <div>
            <Button className="m-2.5 absolute"><Link href="/">Regresar</Link></Button>
            <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">

                <div className="w-full max-w-sm">
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}
