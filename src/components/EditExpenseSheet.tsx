"use client";

import { useState, useEffect } from "react";
import { Gasto, NuevoGasto } from "@/services/gastosService";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetFooter,
    SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EditExpenseSheetProps {
    gasto: Gasto | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onEdit: (id: number, gasto: NuevoGasto) => Promise<void>;
}

const CATEGORIES = ["Comida", "Transporte", "Entretenimiento", "Salud", "Otro"];

export default function EditExpenseSheet({ gasto, open, onOpenChange, onEdit }: EditExpenseSheetProps) {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState(CATEGORIES[0]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (gasto) {
            setTitle(gasto.title);
            setAmount(gasto.amount.toString());
            setCategory(gasto.category);
        }
    }, [gasto]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!gasto) return;

        if (!title || !amount || !category) {
            alert("Por favor completa todos los campos correctamente");
            return;
        }

        setLoading(true);
        await onEdit(gasto.id, {
            title,
            amount: parseFloat(amount),
            category,
        });
        setLoading(false);
        onOpenChange(false);
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="right" className="w-full sm:max-w-md">
                <SheetHeader>
                    <SheetTitle>Editar Gasto</SheetTitle>
                    <SheetDescription>
                        Modifica los detalles del gasto
                    </SheetDescription>
                </SheetHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4 px-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Nombre</Label>
                        <Input
                            id="title"
                            placeholder="Ej. Supermercado"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="amount">Monto</Label>
                        <Input
                            id="amount"
                            type="number"
                            step="0.01"
                            placeholder="Ej. 250"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="category">Categoría</Label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full border rounded px-2 py-1"
                        >
                            {CATEGORIES.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>
                    <SheetFooter className="pt-2 flex justify-end gap-2">
                        <SheetClose asChild>
                            <Button type="button" variant="outline">
                                Cancelar
                            </Button>
                        </SheetClose>
                        <Button type="submit" className="bg-blue-600 text-white" disabled={loading}>
                            {loading ? "Guardando..." : "Guardar cambios"}
                        </Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}