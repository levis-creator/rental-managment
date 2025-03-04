"use client";
import { Apartment } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";

export const getColumns = (
    handleEdit: (apartment: Apartment) => void,
    handleDelete: (apartment: Apartment) => void
): ColumnDef<Apartment>[] => [
    {
        accessorKey: "apartmentName",
        header: "Apartment Name",
    },
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const apartment = row.original;

            return (
                <div className="flex items-center py-4">
                    <button
                        onClick={() => handleEdit(apartment)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(apartment)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                    >
                        Remove
                    </button>
                </div>
            );
        },
    },
];