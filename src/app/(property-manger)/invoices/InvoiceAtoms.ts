import { Invoice } from "@/lib/types";
import { atom } from "jotai";

export const PageTitle=atom("Invoice")
export const invoices= atom<Invoice[]>([])
export const invoice=atom<Invoice>()

