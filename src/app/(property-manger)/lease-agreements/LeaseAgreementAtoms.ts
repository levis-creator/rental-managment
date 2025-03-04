import { LeaseAgreement } from "@/lib/types";
import { atom } from "jotai";

export const leaseAgreements= atom<LeaseAgreement[]>([])
export const leaseAgreement=atom<LeaseAgreement>()
export const pageTitle=atom("Lease Agreement")
