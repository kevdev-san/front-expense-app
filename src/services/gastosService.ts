const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Gasto {
    id: number;
    title: string;
    amount: number;
    category: string;
}

export interface NuevoGasto {
    title: string;
    amount: number;
    category: string;
}

/**
 * Obtiene todos los gastos del usuario autenticado.
 */
export async function obtenerGastos(token: string): Promise<Gasto[]> {
    try {
        const response = await fetch(`${API_URL}/api/expenses`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store", // asegura datos actualizados en SSR
        });

        if (!response.ok) {
            throw new Error("Error al intentar obtener los gastos");
        }

        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
}

/**
 * Agrega un nuevo gasto al backend.
 */
export async function agregarGasto(token: string, gasto: NuevoGasto): Promise<Gasto | null> {
    try {
        if (!token) throw new Error("Token no proporcionado");

        const response = await fetch(`${API_URL}/api/expenses/`, { // ✅ barra final
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, 
            },
            body: JSON.stringify(gasto),
        });

        if (!response.ok) {
            throw new Error(`Error al intentar agregar el gasto: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

export async function eliminarGasto(token: string, id: number): Promise<boolean> {
    try {
        const response = await fetch(`${API_URL}/api/expenses/${id}/`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            console.error("Error al eliminar gasto");
            return false;
        }

        return true;
    } catch (error) {
        console.error("Error de red al eliminar gasto:", error);
        return false;
    }
}

export async function editarGasto(token: string, id: number, gasto: NuevoGasto): Promise<Gasto | null> {
    try {
        const response = await fetch(`${API_URL}/api/expenses/${id}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,  // ← Asegúrate que esto esté
            },
            body: JSON.stringify(gasto),
        });

        if (!response.ok) {
            console.error("Error al editar el gasto:", response.status);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error("Error de red al editar gasto:", error);
        return null;
    }
}