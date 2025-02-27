import { InvoiceStatus, LeaseStatus, UnitStatus } from "./status";

export interface PropertyOwner {
    id?: number;
    fullName: string;
    email: string
    phone: string;
}
export interface Apartment {
    id?: number;
    apartmentName: string;
    address: string;
    ownerId?: string;
}
export interface Unit {
    id?: number;
    unitNumber: string;
    status: UnitStatus;
    statusDescription?:string;
    apartmentName?:string;
    apartmentId?: number;
}
export interface Tenant {
    id?: number;
    fullName: string;
    email: string;
    phone: string;
    unit?: object
    unitId?: number;
}
export interface LeaseAgreement {
    id?: number;
    tenantId?: number;
    tenantName?: string;
    unitId?: number | null;
    unitNumber?: string;
    unit?: object;
    startDate: string;
    endDate: string;
    rentAmount: number;
    status?: LeaseStatus;
    statusDescription?:string
}
export interface Invoice {
    id?: number;
    leaseId?: number|null;
    tenantName?: string
    amountDue: number;
    status?: InvoiceStatus
    statusDescription?:string
}

export interface Payment{
    id?:number;
    invoiceId?:number;
    tenantName?:string;
    amountPaid:number;
    paymentDate:string;
    paymentMethod:string;
    transactionId:string;
}

export interface PaymentTransfer{
    id?:number;
    tenantId?:number;
    tenantName?:string;
    toUnitId?:number;
    unitNumber?:string;
    transferDate:string;
}
