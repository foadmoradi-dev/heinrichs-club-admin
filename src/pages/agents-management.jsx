import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {getAgents} from "../lib/queries/agent-actions";
import AgentCard from "../components/agent/agent-card";


const AgentsManagementPage = () => {
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({}); // { order: "date" | "phone_number" | "az" | "za" | "level_a" | "level_d", query: "" }
    const limit = 16;

    // Fetch agents with React Query
    const { data, isLoading, isError, error, isFetching } = useQuery({
        queryKey: ["agents", page, filters],
        queryFn: () => getAgents({ page, limit, filters }),
        keepPreviousData: true,
    });

    if (isLoading) return <div>Loading agents...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    const totalPages = Math.ceil(data.total / limit);

    // Handlers
    const handleOrderChange = (e) => {
        setFilters((prev) => ({ ...prev, order: e.target.value }));
        setPage(1); // reset page when filter changes
    };

    const handleSearchChange = (e) => {
        setFilters((prev) => ({ ...prev, query: e.target.value }));
        setPage(1);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Agents Management</h1>

            {/* Search & Order */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search by name, phone, or email"
                    value={filters.query || ""}
                    onChange={handleSearchChange}
                    className="border p-2 rounded flex-1"
                />

                <select
                    value={filters.order || "date"}
                    onChange={handleOrderChange}
                    className="border p-2 rounded"
                >
                    <option value="date">Date</option>
                    <option value="phone_number">Phone</option>
                    <option value="az">A → Z</option>
                    <option value="za">Z → A</option>
                    <option value="level_a">Level Asc</option>
                    <option value="level_d">Level Desc</option>
                </select>
            </div>

            {/* Agents List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data.agents.map((agent) => (
                    <AgentCard key={agent.id} agent={agent} />
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

export default AgentsManagementPage;
