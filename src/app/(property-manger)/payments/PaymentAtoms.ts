import { Payment } from "@/lib/types";
import { atom } from "jotai";

export const PageTitle=atom("Payment")
export const payments= atom<Payment[]>([])
export const payment=atom<Payment>()

