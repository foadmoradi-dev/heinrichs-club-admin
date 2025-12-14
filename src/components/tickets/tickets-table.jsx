const TicketsTable = ({
                          tickets = [],
                          columns,
                          isLoading = false,
                          page,
                          totalPages,
                          total,
                          onPageChange,
                          limit,
                          onLimitChange,
                      }) => {
    return (
        <div className="bg-white rounded-2xl shadow-md p-4 w-full">
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold">My Tickets</h2>
            </div>

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
                            <td
                                colSpan={columns.length}
                                className="p-4 text-center text-gray-500"
                            >
                                Loading...
                            </td>
                        </tr>
                    ) : tickets.length > 0 ? (
                        tickets.map((row) => (
                            <tr
                                key={row.id}
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
                            <td
                                colSpan={columns.length}
                                className="p-4 text-center text-gray-500"
                            >
                                No tickets found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                <div>
                    Page {page} of {totalPages} ({total.toLocaleString()} total)
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onPageChange(page - 1)}
                        disabled={page === 1}
                        className="px-3 py-1 border rounded-lg disabled:opacity-40"
                    >
                        Prev
                    </button>
                    <button
                        onClick={() => onPageChange(page + 1)}
                        disabled={page >= totalPages}
                        className="px-3 py-1 border rounded-lg disabled:opacity-40"
                    >
                        Next
                    </button>

                    <select
                        className="border rounded px-2 py-1 text-sm"
                        value={limit}
                        onChange={(e) => onLimitChange(Number(e.target.value))}
                    >
                        {[10, 25, 50, 100].map((opt) => (
                            <option key={opt} value={opt}>
                                {opt} / page
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default TicketsTable;
