import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "../lib/queries/customer-actions";
import CustomerCard from "../components/customer/customer-card";
import { FiEye } from "react-icons/fi"; // view icon

const CustomersManagementPage = () => {
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({});
    const limit = 16;

    const { data, isLoading, isError, error, isFetching } = useQuery({
        queryKey: ["customers", page, filters],
        queryFn: () => getCustomers({ page, limit, filters }),
        keepPreviousData: true,
    });

    if (isLoading) return <div>Loading customers...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    const totalPages = Math.ceil(data.total / limit);

    const handleSearchChange = (e) => {
        setFilters((prev) => ({ ...prev, query: e.target.value }));
        setPage(1);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Customers Management</h1>

            {/* Search */}
            <div className="flex mb-4">
                <input
                    type="text"
                    placeholder="Search by name, phone, or email"
                    value={filters.query || ""}
                    onChange={handleSearchChange}
                    className="border p-2 rounded w-full"
                />
            </div>

            {/* Customers List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data?.customers?.map((customer) => (
                    <CustomerCard key={customer.id} customer={customer} />
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-6 gap-2">
                <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Prev
                </button>

                <span>
                    Page {page} of {totalPages} {isFetching && "(Loading...)"} 
                </span>

                <button
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default CustomersManagementPage;
