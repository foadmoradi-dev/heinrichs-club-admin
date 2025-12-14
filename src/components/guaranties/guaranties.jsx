// 📄 pages/GuaranteeList.jsx
import { useState } from "react";
import {Link} from "react-router-dom"
import toast from "react-hot-toast";
import GuaranteeTable from "./guarantee-table";
import Dropdown from "../../widgets/dropdown";
import {BarcodePrefix} from "../../assets/BarcodesPrefix/barcode-prefix";
import {getGuarantees} from "../../lib/queries/guarantee-actions";
import GuaranteeReceipt from "./guarantee-receipt";

const columns = [
    { id: "barcode", label: "Barcode", tKey: "guaranties_page.barcode" },
    { id: "agent_name", label: "Agent", tKey: "guaranties_page.agent_name" },
    { id: "agent_phone_number", label: "Agent Phone", tKey: "guaranties_page.agent_phone_number" },
    { id: "customer_name", label: "Customer", tKey: "guaranties_page.agent_name" },
    { id: "customer_phone_number", label: "Customer Phone", tKey: "guaranties_page.customer_phone_number" },
    { id: "product_model", label: "Product", tKey: "guaranties_page.product_model" },
    { id: "price", label: "Price", tKey: "guaranties_page.price" },
    { id: "remain_days", label: "Remain Days", tKey: "guaranties_page.remain_days" },
    {
        id: "receipt",
        label: "Receipt",
        tKey: "guaranties_page.receipt",
        render: (_, row) => {
            return  <GuaranteeReceipt data={row}  />
        }
    },
    {
        id: "status",
        label: "Status",
        tKey: "guaranties_page.status",

        render: (value) => (
            <span
                className={`px-2 py-1 rounded text-xs ${
                    value === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                }`}
            >
        {value}
      </span>
        ),
    },

];

export default function Guaranties() {
    const [selectedCategory, setSelectedCategory] = useState("hfr");
    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-3">
                {/* Buttons (order first on mobile, last on desktop) */}
                <div
                    className={`flex flex-1 justify-center gap-3 order-1 md:order-2`}
                >
                    <Link
                        to="/dashboard/guaranties-management/guarantee-activation"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg shadow-md transition active:scale-95 flex-1 md:flex-none text-center"
                    >
                        Guarantee Activation
                    </Link>

                    <Link
                        to="/dashboard/guaranties-management/guarantee-registration"
                        className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg shadow-md transition active:scale-95 flex-1 md:flex-none text-center"
                    >
                        {"Guarantee Registration"}
                    </Link>
                </div>

                {/* Dropdown (order second on mobile, first on desktop) */}
                <div className="flex flex-1 order-2 md:order-1">
                    <Dropdown
                        label="Type of Product"
                        options={BarcodePrefix}
                        value={selectedCategory}
                        onChange={(val) => {
                            setSelectedCategory(val);
                            toast.success("Category updated");
                        }}
                        placeholder="Choose a product type"
                        getLabel={(opt) => opt.name}
                        getValue={(opt) => opt.bre}
                        className="w-full"
                    />
                </div>
            </div>
            <div className="hidden md:block">
                <GuaranteeTable
                    queryFn={getGuarantees}
                    queryKey="guarantees"
                    columns={columns}
                    filters={{ category: selectedCategory }}
                />
            </div>

        </div>
    );
}
