"use client";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import React, { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import SelectInput from "@/components/form/SelectInput";
import TextInput from "@/components/form/TextInput";
import FormModal from "@/components/FormModal";
import { API_URL, ENDPOINTS } from "@/constants/ApiUrls";
import { fetchData } from "@/lib/db_operations";
import { enumToArray } from "@/lib/EnumToArray";
import { LeaseStatus } from "@/lib/status";
import { LeaseAgreement, Tenant, Unit } from "@/lib/types";
import { tenants } from "../tenants/TenantAtoms";
import { units } from "../units/unitAtoms";
import { leaseAgreement, leaseAgreements, pageTitle } from "./LeaseAgreementAtoms";

interface LeaseAgreementFormProps {
    edit?: boolean;
    head: string;
    handleClose: () => void;
}

const LeaseAgreementForm: React.FC<LeaseAgreementFormProps> = ({ edit = false, head, handleClose }) => {
    const statusOptions = enumToArray(LeaseStatus);
    const leaseAgreementEdit = useAtomValue(leaseAgreement);
    const refreshData = useSetAtom(leaseAgreements);
    const [tenantData, setTenantData] = useAtom(tenants);
    const [unitData, setUnitData] = useAtom(units);
    const pageHead = useAtomValue(pageTitle);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm<LeaseAgreement>({
        defaultValues: leaseAgreementEdit || {
            tenantId: 0,
            unitId: null,
            startDate: "",
            endDate: "",
            rentAmount: 10000,
            status: LeaseStatus.Active,
        },
    });

    useEffect(() => {
        const fetchTenantsAndUnits = async () => {
            try {
                const [tenantsData, unitsData] = await Promise.all([
                    fetchData<Tenant[]>(`${API_URL.EXTERNAL_API_URL}${ENDPOINTS.TENANT}`),
                    fetchData<Unit[]>(`${API_URL.EXTERNAL_API_URL}${ENDPOINTS.UNIT}`),
                ]);
                setTenantData(tenantsData || []);
                setUnitData(unitsData || []);
            } catch (error) {
                toast.error("Failed to fetch tenants or units.");
                console.error("Fetch error:", error);
            }
        };
        fetchTenantsAndUnits();
    }, [setTenantData, setUnitData]);

    useEffect(() => {
        reset(leaseAgreementEdit || {
            tenantId: 0,
            unitId: null,
            startDate: "",
            endDate: "",
            rentAmount: 10000,
            status: LeaseStatus.Active,
        });
    }, [leaseAgreementEdit, reset]);

    const fetchLatestData = useCallback(async () => {
        try {
            const dataItems = await fetchData<LeaseAgreement[]>(`${API_URL.EXTERNAL_API_URL}${ENDPOINTS.LEASEAGREEMENTSUMMARY}`);
            refreshData(dataItems || []);
        } catch (error) {
            toast.error("Failed to load lease agreements");
            console.error("Fetch error:", error);
        }
    }, [refreshData]);

    const onSubmit: SubmitHandler<LeaseAgreement> = useCallback(async (data) => {
        if (!data.tenantId || !data.unitId) {
            toast.error("Tenant and Unit are ");
            return;
        }

        if (new Date(data.startDate) >= new Date(data.endDate)) {
            toast.error("Start Date must be earlier than End Date");
            return;
        }

        setIsSubmitting(true);
        try {
            const url = `${API_URL.EXTERNAL_API_URL}${ENDPOINTS.LEASE_AGREEMENT}${edit ? `/${leaseAgreementEdit?.id}` : ""}`;
            const method = edit ? "PUT" : "POST";

            await fetchData<LeaseAgreement>(url, { method, body: data });
            await fetchLatestData();
            toast.success(`${head} ${pageHead} successfully`);
            handleClose();
        } catch (error) {
            console.error("Submit error:", error);
            toast.error(`Unable to ${edit ? "edit" : "add"} ${pageHead}`);
        } finally {
            setIsSubmitting(false);
        }
    }, [edit, leaseAgreementEdit, handleClose, head, pageHead, fetchLatestData]);

    return (
        <FormModal title={`${head} ${pageHead}`} handleClose={handleClose}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full max-w-4xl p-4 bg-white rounded-lg shadow dark:bg-gray-800 mx-auto my-3">
                <div className="grid gap-4 sm:grid-cols-2">
                    <SelectInput display="fullName" options={tenantData} value="id" name="tenantId" label="Tenant" register={register}   />
                    <SelectInput display="unitNumber" options={unitData} value="id" name="unitId" label="Unit" register={register}   />
                    <TextInput name="startDate" label="Start Date" register={register} errors={errors} type="date"  />
                    <TextInput name="endDate" label="End Date" register={register} errors={errors} type="date"  />
                    <TextInput name="rentAmount" label="Rent Amount" register={register} errors={errors} type="number"  />
                    <SelectInput display="name" options={statusOptions} value="value" name="status" label="Status" register={register}  />
                </div>
                <button type="submit" disabled={isSubmitting} className="mt-4 bg-blue-700 text-white rounded-lg px-5 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed">
                    {isSubmitting ? "Submitting..." : edit ? "Save Changes" : `Add ${pageHead}`}
                </button>
            </form>
        </FormModal>
    );
};

export default LeaseAgreementForm;
