"use client";

import { useState } from "react";
import { Gasto, NuevoGasto, agregarGasto, eliminarGasto, editarGasto } from "@/services/gastosService";
import AddExpenseSheet from "@/components/AddExpenseSheet";
import EditExpenseSheet from "@/components/EditExpenseSheet";
import { Trash2, Pencil } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface GastosClientProps {
    initialGastos: Gasto[];
    token: string;
}

export default function GastosClient({ initialGastos, token }: GastosClientProps) {
    const [gastos, setGastos] = useState<Gasto[]>(initialGastos);
    const [eliminando, setEliminando] = useState<number | null>(null);
    const [gastoAEliminar, setGastoAEliminar] = useState<Gasto | null>(null);
    const [gastoAEditar, setGastoAEditar] = useState<Gasto | null>(null);
    const [editSheetOpen, setEditSheetOpen] = useState(false);

    const handleAddExpense = async (nuevo: NuevoGasto) => {
        const nuevoGasto = await agregarGasto(token, nuevo);
        if (nuevoGasto) {
            setGastos((prev) => [...prev, nuevoGasto]);
        }
    };

    const handleDeleteExpense = async () => {
        if (!gastoAEliminar) return;

        setEliminando(gastoAEliminar.id);
        const success = await eliminarGasto(token, gastoAEliminar.id);
        if (success) {
            setGastos((prev) => prev.filter((gasto) => gasto.id !== gastoAEliminar.id));
        }
        setEliminando(null);
        setGastoAEliminar(null);
    };

    const handleEditExpense = async (id: number, gastoEditado: NuevoGasto) => {
        console.log("Token:", token); // ← Agrega esto temporalmente
        console.log("Editando gasto:", id, gastoEditado); // ← Y esto

        const gastoActualizado = await editarGasto(token, id, gastoEditado);
        if (gastoActualizado) {
            setGastos((prev) =>
                prev.map((gasto) => (gasto.id === id ? gastoActualizado : gasto))
            );
        }
    };

    const openEditSheet = (gasto: Gasto) => {
        setGastoAEditar(gasto);
        setEditSheetOpen(true);
    };

    return (
        <div>
            <div className="flex justify-end mb-4">
                <AddExpenseSheet onAdd={handleAddExpense} />
            </div>
            {gastos.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No hay gastos registrados.</p>
            ) : (
                <ul className="space-y-2">
                    {gastos.map((gasto) => (
                        <li
                            key={gasto.id}
                            className="p-4 bg-white rounded-xl shadow flex justify-between items-center"
                        >
                            <div>
                                <p className="font-semibold">{gasto.title}</p>
                                <p className="text-sm text-gray-500">{gasto.category}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="font-bold">${gasto.amount}</span>
                                <button
                                    onClick={() => openEditSheet(gasto)}
                                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                    aria-label="Editar gasto"
                                >
                                    <Pencil size={18} />
                                </button>
                                <button
                                    onClick={() => setGastoAEliminar(gasto)}
                                    disabled={eliminando === gasto.id}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                    aria-label="Eliminar gasto"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <EditExpenseSheet
                gasto={gastoAEditar}
                open={editSheetOpen}
                onOpenChange={setEditSheetOpen}
                onEdit={handleEditExpense}
            />

            <Dialog open={!!gastoAEliminar} onOpenChange={(open) => !open && setGastoAEliminar(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>¿Eliminar gasto?</DialogTitle>
                        <DialogDescription>
                            ¿Estás seguro de que deseas eliminar el gasto "{gastoAEliminar?.title}"?
                            Esta acción no se puede deshacer.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setGastoAEliminar(null)}
                            disabled={eliminando !== null}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDeleteExpense}
                            disabled={eliminando !== null}
                        >
                            {eliminando !== null ? "Eliminando..." : "Eliminar"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}