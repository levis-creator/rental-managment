"use client"
import { Button } from "@/components/ui/button"
import { Payment } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"


export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "invoiceId",
        header: "InvoiceId",
    },
    {
        accessorKey: "transactionId",
        header: "Transaction Id",
    },
    {
        accessorKey: "paymentDate",
        header: "Payment Date",
    },
    {
        accessorKey: "paymentMethod",
        header: "Payment Method",
    },
    {
        accessorKey: "unitName",
        header: "For Unit",
    },
    {
        accessorKey: "amountPaid",
        header: ({ column }) => {
            return (
                <div className="text-right">

                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Amount
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amountPaid"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
]