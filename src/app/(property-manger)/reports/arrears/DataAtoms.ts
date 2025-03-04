import { Payment } from "@/lib/types";
import { atom } from "jotai";

export const filterData=atom<Payment[]>([])