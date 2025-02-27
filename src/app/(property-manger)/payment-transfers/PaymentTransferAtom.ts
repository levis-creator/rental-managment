import { PaymentTransfer } from "@/lib/types";
import { atom } from "jotai";

export const PageTitle=atom("Unit Transfer")
export const paymentTranfers= atom<PaymentTransfer[]>([])
export const paymentTransfer=atom<PaymentTransfer>()

