import { PropertyOwner } from "@/lib/types";
import { atom } from "jotai";

export const propertyOwners= atom<PropertyOwner[]>([])
export const propertyOwner=atom<PropertyOwner>()

