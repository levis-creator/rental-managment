export const API_URL={
    EXTERNAL_API_URL: `${process.env.NEXT_PUBLIC_API_URL}`,
    INTERNAL: process.env.NEXT_PUBLIC_INTERNAL_API_URL
}
export const URL=process.env.NEXT_PUBLIC_EXTERNAL_API_URL;
export const ENDPOINTS={
    PROPERTY_OWNERS:"propertyowner",
    APARTMENT:"Apartment",
    INVOICE:"invoice",
    INVOICE_SUMMARY:"invoice/summary",
    ARREARS:"invoice/arrears",
    LEASE_AGREEMENT:"leaseagreement",
    LEASEAGREEMENTSUMMARY:"leaseagreement/summary",
    PAYMENT:"payment",
    PAYMENT_SUMMARY:"payment/summary",
    PAYMENT_TRANSFER:"paymenttransfer",
    PAYMENT_TRANSFER_SUMMARY:"paymenttransfer/summary",
    TENANT:"tenant",
    TENANT_INPUT_DTO:"tenant/create",
    TENANT_SUMMARY:"tenant/summary",
    UNIT:"unit",
    UNIT_SUMMARY:"unit/summary",
    UNIT_AVAILABLE:"unit/available"

} 