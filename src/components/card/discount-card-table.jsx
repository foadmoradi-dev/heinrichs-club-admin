import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import toast from "react-hot-toast";


const DiscountCardTable = (
    {queryFn,
    columns,
    queryKey,
    onRowClick,
    filters = {},
    defaultLimit = 50}
) => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(defaultLimit);
    const { data, isLoading, isError, error, isFetching } = useQuery({
        queryKey: [queryKey, page, limit, filters],
        queryFn: () => queryFn({ page, limit, filters }),
        keepPreviousData: true,
    });

    if (isError) {
        toast.error("Loading Failed");
        return (
            <p className="text-center text-red-500 py-6">
                {error.message}
            </p>
        );
    }
    if (isError) {
        toast.error("Loading Failed");
        return (
            <p className="text-center text-red-500 py-6">
                {error.message}
            </p>
        );
    }

    const rows = data?.items || [];
    const total = data?.totalCount || 0;
    const totalPages = Math.ceil(total / limit);

    return (
        <div className="bg-white rounded-2xl shadow-md p-4 w-full border-1" >
            {/* Table Header */}
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold">{"Guaranties Table"}</h2>
                {isFetching && (
                    <span className="text-sm text-gray-400 animate-pulse">
                        {"Updating"}
                    </span>
                )}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                    <thead className="bg-gray-100 text-gray-700 uppercase">
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col.id}
                                className={`p-3 border-b ${
                                    col.align === "right"
                                        ? "text-right"
                                        : col.align === "center"
                                            ? "text-center"
                                            : "text-left"
                                }`}
                            >
                                {col.label}
                            </th>
                        ))}
                    </tr>
                    </thead>

                    <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan={columns.length} className="p-4 text-center text-gray-500">
                                Loading ...
                            </td>
                        </tr>
                    ) : rows.length > 0 ? (
                        rows.map((row) => (
                            <tr
                                key={row.id}
                                onClick={() => onRowClick && onRowClick(row)}
                                className="hover:bg-gray-50 transition cursor-pointer"
                            >
                                {columns.map((col) => (
                                    <td
                                        key={col.id}
                                        className={`p-3 border-b ${
                                            col.align === "right"
                                                ? "text-right"
                                                : col.align === "center"
                                                    ? "text-center"
                                                    : "text-left"
                                        }`}
                                    >
                                        {col.render
                                            ? col.render(row[col.id], row)
                                            : row[col.id] ?? "-"}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="p-4 text-center text-gray-500">
                                No Cards Found
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                <div>
                    {`Page ${page} of ${totalPages} — Total: ${total}`}
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        disabled={page === 1}
                        className="px-3 py-1 border rounded-lg disabled:opacity-40"
                    >
                        Prev
                    </button>
                    <button
                        onClick={() => setPage((p) => (p < totalPages ? p + 1 : p))}
                        disabled={page >= totalPages}
                        className="px-3 py-1 border rounded-lg disabled:opacity-40"
                    >
                        Next
                    </button>

                    <select
                        className="border rounded px-2 py-1 text-sm"
                        value={limit}
                        onChange={(e) => {
                            setLimit(Number(e.target.value));
                            setPage(1);
                        }}
                    >
                        {[10, 25, 50, 100].map((opt) => (
                            <option key={opt} value={opt}>
                                {opt} / {"Page"}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
export default DiscountCardTable;