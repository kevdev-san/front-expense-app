import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { obtenerGastos, Gasto } from "@/services/gastosService";
import GastosClient from "@/components/GastosClient";

export default async function GastosPage() {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("access_token")?.value;

    if (!token) redirect("/login");

    const gastos: Gasto[] = await obtenerGastos(token);

    console.log("Token que envío al backend:", token)
    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Mis Gastos</h1>
            <GastosClient initialGastos={gastos} token={token} />
        </div>
    );
}
