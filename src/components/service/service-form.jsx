// src/pages/services/ServiceForm.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import Input from "../../widgets/input";
import FormButton from "../../widgets/form-button";

import {
    fetchServiceCompanyById,
    newServiceCompany,
    updateServiceCompany,
} from "../../lib/queries/service-actions";

export default function ServiceForm() {
    const { id } = useParams();
    const isEdit = !!id;
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [errors, setErrors] = useState({});
    const [defaultValues, setDefaultValues] = useState({});

    /** Fetch data in edit mode */
    const { data, isLoading } = useQuery({
        queryKey: ["service-company", id],
        queryFn: () => fetchServiceCompanyById(id),
        enabled: isEdit,
    });

    useEffect(() => {
        if (data && isEdit) {
            setDefaultValues(data);
        }
    }, [data, isEdit]);

    /** Validation */
    const validate = (data) => {
        const temp = {};

        if (!data.company_name) temp.company_name = "Company name is required";
        if (!data.company_manager) temp.company_manager = "Manager is required";
        if (!data.email) temp.email = "Email is required";
        if (!data.company_id) temp.company_id = "Company ID is required";

        if (!isEdit) {
            if (!data.password) temp.password = "Password is required";
            if (data.password !== data.repeat_password)
                temp.repeat_password = "Passwords do not match";
        }

        setErrors(temp);
        return Object.keys(temp).length === 0;
    };

    /** Mutation */
    const { mutate, isPending } = useMutation({
        mutationFn: (payload) =>
            isEdit
                ? updateServiceCompany(id, payload)
                : newServiceCompany(payload),

        onSuccess: () => {
            queryClient.invalidateQueries(["serviceCompanies"]);
            navigate("/dashboard/service-companies-management");
        },
    });

    /** Submit */
    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        if (!validate(data)) return;

        // remove passwords in edit mode
        if (isEdit) {
            delete data.password;
            delete data.repeat_password;
        }

        mutate(data);
    };

    if (isLoading) return <p className="text-center py-10">Loading...</p>;

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
            <h1 className="text-2xl font-bold mb-6">
                {isEdit ? "Edit Service Company" : "New Service Company"}
            </h1>

            <form onSubmit={submitHandler} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <Input
                    name="company_manager"
                    label="Company Manager"
                    value={data.company_manager}
                    error={!!errors.company_manger}
                    helperText={errors.company_manger}
                />

                <Input
                    name="company_name"
                    label="Company Name"
                    value={data.company_name}
                    error={!!errors.company_name}
                    helperText={errors.company_name}
                />

                <Input
                    name="company_id"
                    label="Company ID"
                    value={data.company_id}
                    error={!!errors.company_id}
                    helperText={errors.company_id}
                />

                <Input
                    type="email"
                    name="email"
                    label="Email"
                    value={data.email}
                    error={!!errors.email}
                    helperText={errors.email}
                />

                <Input
                    name="phone_number"
                    label="Phone Number"
                    value={data.phone_number}
                    defaultValue={defaultValues.phone_number}
                />

                <Input
                    name="company_phone_customer"
                    label="Customer Phone"
                    value={data.company_phone_customer}
                    defaultValue={defaultValues.company_phone_customer}
                />

                <Input
                    name="company_phone"
                    label="Company Phone"
                    value={data.company_phone}
                    defaultValue={defaultValues.company_phone}
                />

                <Input
                    name="company_address"
                    label="Company Address"
                    value={"company_address"}
                    defaultValue={defaultValues.company_address}
                />

                <Input
                    name="company_website"
                    label="Company Website"
                    value={data.company_website}
                    defaultValue={defaultValues.company_website}
                />
                <Input
                    name="company_sms_service"
                    label="Company SMS Service"
                    value={data.company_sms_service}
                    defaultValue={defaultValues.company_sms_service}
                />

                {!isEdit && (
                    <>
                        <Input
                            type="password"
                            name="password"
                            label="Password"
                            error={!!errors.password}
                            helperText={errors.password}
                        />

                        <Input
                            type="password"
                            name="repeat_password"
                            label="Repeat Password"
                            error={!!errors.repeat_password}
                            helperText={errors.repeat_password}
                        />
                    </>
                )}

                <div className="col-span-full">
                    <FormButton
                        type="submit"
                        title={isPending ? "Saving..." : isEdit ? "Update Company" : "Create Company"}
                        disabled={isPending}
                    />
                </div>
            </form>
        </div>
    );
}
