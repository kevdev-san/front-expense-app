"use client";

import { useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
    SheetClose,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { NuevoGasto } from "@/services/gastosService";

interface AddExpenseSheetProps {
    onAdd: (nuevo: NuevoGasto) => Promise<void> | void;
}

const CATEGORIES = ["Comida", "Transporte", "Entretenimiento", "Salud", "Otro"];

export default function AddExpenseSheet({ onAdd }: AddExpenseSheetProps) {
    const [formData, setFormData] = useState<NuevoGasto>({
        title: "",
        amount: 0,
        category: CATEGORIES[0],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "amount" ? Number(value) : value,
        }));
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData((prev) => ({ ...prev, category: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title || !formData.amount || !formData.category) {
            alert("Por favor completa todos los campos correctamente");
            return;
        }

        const nuevoGasto: NuevoGasto = {
            title: formData.title,
            amount: Number(formData.amount),
            category: formData.category,
        };

        await onAdd(nuevoGasto);

        setFormData({
            title: "",
            amount: 0,
            category: CATEGORIES[0],
        });
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="bg-blue-600 text-white hover:bg-blue-700">+ Agregar gasto</Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-full sm:max-w-md">
                <SheetHeader>
                    <SheetTitle>Agregar gasto</SheetTitle>
                    <SheetDescription>
                        Completa la información del nuevo gasto.
                    </SheetDescription>
                </SheetHeader>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 mt-4 px-4" // ✅ agregamos px-4 para espacio horizontal
                >
                    <div className="space-y-2">
                        <Label htmlFor="title">Nombre</Label>
                        <Input
                            id="title"
                            name="title"
                            placeholder="Ej. Supermercado"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="amount">Monto</Label>
                        <Input
                            id="amount"
                            name="amount"
                            type="number"
                            placeholder="Ej. 250"
                            value={formData.amount}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category">Categoría</Label>
                        <select
                            id="category"
                            value={formData.category}
                            onChange={handleCategoryChange}
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

                        <SheetClose asChild>
                            <Button type="submit" className="bg-blue-600 text-white">
                                Guardar
                            </Button>
                        </SheetClose>
                    </SheetFooter>
                </form>

            </SheetContent>
        </Sheet>
    );
}
