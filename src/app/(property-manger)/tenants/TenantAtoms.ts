import { Tenant } from "@/lib/types";
import { atom } from "jotai";

export const tenants= atom<Tenant[]>([])
export const tenant=atom<Tenant>()

