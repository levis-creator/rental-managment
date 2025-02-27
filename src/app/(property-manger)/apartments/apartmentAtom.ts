import { Apartment } from "@/lib/types";
import { atom } from "jotai";

export const apartments= atom<Apartment[]>([])
export const apartment=atom<Apartment>()

