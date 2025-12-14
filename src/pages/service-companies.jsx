import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    fetchServiceCompanies,
    deleteServiceCompany,
    toggleServiceCompany,
} from "../lib/queries/service-actions";
import ServiceInfoCard from "../components/service/service-company-info-card";
import {Link} from "react-router-dom";

export default function ServiceCompaniesPage() {
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
        queryKey: ["serviceCompanies"],
        queryFn: fetchServiceCompanies,
    });

    const deleteMutation = useMutation({
        mutationFn: deleteServiceCompany,
        onSuccess: () => queryClient.invalidateQueries(["serviceCompanies"]),
    });

    const toggleMutation = useMutation({
        mutationFn: ({ id, is_active }) =>
            toggleServiceCompany(id, { is_active }),
        onSuccess: () => queryClient.invalidateQueries(["serviceCompanies"]),
    });



    if (isLoading) return <p>Loading companies...</p>;

    return (
        <div className="flex flex-col p-6">
            <div className="flex flex-row ">
                <h1 className="text-2xl font-bold mb-6 flex-1">Service Companies</h1>
                <Link
                    className={'bg-black text-white px-4 py-2 rounded-2xl shadow-2xl cursor-pointer hover:bg-white hover:text-black'}
                    to={'/dashboard/service-companies-management/new-service-company'}
                >
                    New Service
                </Link>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data?.map((company) => (
                    <ServiceInfoCard
                        key={company.id}
                        company={company}
                        onDelete={() => {
                            if (confirm("Delete this company?")) {
                                deleteMutation.mutate(company.id);
                            }
                        }}
                        onToggle={() =>
                            toggleMutation.mutate({
                                id: company.id,
                                is_active: !company.is_active,
                            })
                        }
                    />
                ))}
            </div>
        </div>
    );
}
