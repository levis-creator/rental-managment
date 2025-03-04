"use client"
import { PropertyOwner } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"


export const getColumns = (
    handleEdit: (propertyOwner: PropertyOwner) => void,
    handleDelete: (propertyOwner: PropertyOwner) => void
): ColumnDef<PropertyOwner>[] => [
    {
        accessorKey: "fullName",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email Address",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const payment = row.original
      
            return (
                <div className="flex items-center py-4">
                    <button onClick={() => handleEdit(payment)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(payment)} className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Remove</button>
                </div>)
        }
    }

]