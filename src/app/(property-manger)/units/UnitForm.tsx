import React, { useCallback, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import toast from 'react-hot-toast';

import TextInput from '@/components/form/TextInput';
import FormModal from '@/components/FormModal';
import { API_URL, ENDPOINTS } from '@/constants/ApiUrls';
import { fetchData } from '@/lib/db_operations';
import { Apartment, Unit } from '@/lib/types';
import { unit, units } from './unitAtoms';
import { UnitStatus } from '@/lib/status';
import { apartments } from '../apartments/apartmentAtom';
import SelectInput from '@/components/form/SelectInput';
import { enumToArray } from '@/lib/EnumToArray';

interface unitFormProps {
    edit?: boolean;
    head: string;
    handleClose: () => void;
}

const UnitForm: React.FC<unitFormProps> = ({ edit = false, head, handleClose }) => {
    const unitEdit = useAtomValue(unit);
    const refreshData = useSetAtom(units);
    const statusOptions= enumToArray(UnitStatus)
    const [apartmentData, setApartmentData] = useAtom(apartments)
    const {
        register,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm<Unit>({
        defaultValues: unitEdit || { apartmentId: 0, status: UnitStatus.Available, unitNumber: '', id: undefined }, // Ensure default values
    });

    // Reset form when the modal opens
    useEffect(() => {
        if (apartmentData.length == 0) {
            fetchData(API_URL.EXTERNAL_API_URL as string + ENDPOINTS.APARTMENT).then(
                (dataItems) => {
                    setApartmentData(dataItems as Apartment[])
                }
            )
        }
        console.log("finite")
        reset(unitEdit || { apartmentId: 0, status: UnitStatus.Available, unitNumber: '', id: undefined });
    }, [unitEdit, reset, apartmentData, setApartmentData]);

    // Function to handle form submission
    const onSubmit: SubmitHandler<Unit> = useCallback(
        async (data) => {
            try {
                const url = `${API_URL.EXTERNAL_API_URL}${ENDPOINTS.UNIT}${edit ? `/${unitEdit?.id}` : ''}`;
                const method = edit ? 'PUT' : 'POST';

                await fetchData<Unit>(url, { method, body: data });

                refreshData((items) => (edit ? items.map((item) => (item.id === data.id ? data : item)) : [...items, data]));
                toast.success(edit ? 'Edited  successfully' : 'Added  successfully');
                handleClose();
            } catch {
                toast.error(edit ? 'Unable to edit ' : 'Unable to add ');
            }
        },
        [edit, unitEdit, refreshData, handleClose]
    );

    return (
        <FormModal title={head} handleClose={handleClose}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <TextInput name="unitNumber" label="Unit Number" register={register} errors={errors} />
                    <SelectInput display='apartmentName' options={apartmentData} name='apartmentId' label='Apartment Name' register={register} />
                    <SelectInput display='name' options={statusOptions} name='status' label='Status' register={register} />
                </div>

                <button type="submit" className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    {edit ? 'Edit' : 'Add'}
                </button>
            </form>
        </FormModal>
    );
};

export default UnitForm;
