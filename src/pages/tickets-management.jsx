import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Eye } from "lucide-react";
import { useSelector } from "react-redux";
import TicketsTable from "../components/tickets/tickets-table";
import DepartmentsDropdown from "../components/tickets/departments-dropdown";

// ➜ You must update your API to accept department + role
import { getTickets } from "../lib/queries/ticket-actions";

export default function TicketManagementPage() {
    const user = useSelector(state => state.userSlice.user);

    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedRole, setSelectedRole] = useState("all"); // NEW DROPDOWN
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(50);

    const { data, isLoading } = useQuery({
        queryKey: ["tickets", page, selectedDepartment, selectedRole],
        queryFn: () =>
            getTickets({
                page,
                limit,
                department: selectedDepartment || null,
                role: selectedRole || null,
            }),
        keepPreviousData: true,
    });

    const tickets = data?.items || [];
    const departments = data?.departments || [];
    const total = data?.totalCount || 0;
    const totalPages = Math.ceil(total / limit);

    const columns = [
        { id: "id", label: "Id" },
        { id: "subject", label: "Subject" },
        { id: "department_title", label: "Department", render: v => v || "—" },
        {
            id: "status_title",
            label: "Status",
            render: (val) => (
                <span
                    className={`px-2 py-1 rounded text-xs ${
                        val === "Open"
                            ? "bg-green-100 text-green-700"
                            : val === "Closed"
                                ? "bg-gray-200 text-gray-600"
                                : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                    {val}
                </span>
            ),
        },
        {
            id: "updated_at",
            label: "Last Update",
            render: (v) => new Date(v).toLocaleString(),
        },
        {
            id: "view",
            label: "View",
            align: "center",
            render: (_, row) => (
                <Link
                    to={`/dashboard/tickets-management/${row.id}`}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition"
                    title="View"
                >
                    <Eye className="w-5 h-5 text-gray-600" />
                </Link>
            ),
        },
    ];

    return (
        <div className="p-6 space-y-6">
            {/* ----------- FILTERS ------------ */}
            <div className="flex gap-3 items-center">
                {/* Department Dropdown */}
                <div className="flex-1">
                    <DepartmentsDropdown
                        label="Department"
                        value={selectedDepartment}
                        onChange={(val) => {
                            setSelectedDepartment(val);
                            setPage(1);
                            toast.success("Department Updated");
                        }}
                        departments={departments}
                    />
                </div>

                {/* ROLE DROPDOWN */}
                <div className="flex-1">
                    <select
                        className="border px-3 py-2 rounded w-full"
                        value={selectedRole}
                        onChange={(e) => {
                            setSelectedRole(e.target.value);
                            setPage(1);
                            toast.success("Role Updated");
                        }}
                    >
                        <option value="all">All</option>
                        <option value="agent">Agent</option>
                        <option value="customer">Customer</option>
                    </select>
                </div>
            </div>

            {/* ----------- TABLE ------------ */}
            <div className="hidden md:block">
                <TicketsTable
                    tickets={tickets}
                    columns={columns}
                    isLoading={isLoading}
                    page={page}
                    totalPages={totalPages}
                    total={total}
                    limit={limit}
                    onPageChange={setPage}
                    onLimitChange={setLimit}
                />
            </div>
        </div>
    );
}
