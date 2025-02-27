import { Unit } from "@/lib/types";
import { atom } from "jotai";

export const units= atom<Unit[]>([])
export const unit=atom<Unit>()

