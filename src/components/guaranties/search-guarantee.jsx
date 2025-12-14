import GuaranteeTable from "./guarantee-table";
import { getGuarantiesBySearch } from "../../lib/queries/customer-actions";
import GuaranteeReceipt from "./guarantee-receipt";
import { useState } from "react";


const SearchGuarantees = () => {

    const isRTL = document.documentElement.getAttribute("dir") === "rtl";

    const [barcode, setBarcode] = useState("");
    const [phone, setPhone] = useState("");

    const columns = [
        { id: "barcode", label: "Barcode" },
        { id: "agent_name", label: "Customer Name" },
        { id: "agent_phone_number", label: "Agent Phone" },
        { id: "customer_name", label: "Customer Name" },
        { id: "customer_phone_number", label: "Customer Phone" },
        { id: "product_model", label: "Product Model" },
        { id: "price", label: "Price" },

        { id: "remain_days", label: "Remain Days" },
        {
            id: "receipt",
            label: "Receipt",
            render: (_, row) => <GuaranteeReceipt data={row} />,
        },
        {
            id: "status",
            label: "guaranties_page.status",
            render: (value) => (
                <span
                    className={`px-2 py-1 rounded text-xs ${
                        value === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                    }`}
                >
                    {value === "Active" ? "Active" : "Expired"}
                </span>
            ),
        },
    ];

    return (
        <div
            className="w-11/12 mx-auto mt-16 mb-8"

        >
            <h2 className="text-xl font-semibold text-center text-gray-800 mb-6 italic">
                Guaranties Table
            </h2>

            {/* Search Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

                {/* Barcode Search */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {"Barcode"}
                    </label>
                    <input
                        type="text"
                        value={barcode}
                        onChange={(e) => setBarcode(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        placeholder={"Barcode"}
                    />
                </div>

                {/* Phone Search */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {"Phone number"}
                    </label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        placeholder={"Phone number"}
                    />
                </div>

            </div>

            <div className="hidden md:block">
                <GuaranteeTable
                    queryFn={getGuarantiesBySearch}
                    queryKey="search-guarantees"
                    columns={columns}
                    filters={{ barcode, phone }}
                />
            </div>

        </div>
    );
};

export default SearchGuarantees;
