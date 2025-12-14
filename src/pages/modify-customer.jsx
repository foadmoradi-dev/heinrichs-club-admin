import EditCustomerForm from "../components/customer/customer-form";
import GuaranteeTable from "../components/guaranties/guarantee-table";
import GuaranteeReceipt from "../components/guaranties/guarantee-receipt";
import {getGuaranteesForCustomer} from "../lib/queries/guarantee-actions";
import {useParams} from "react-router-dom";
import DiscountCardTable from "../components/card/discount-card-table";
import {fetchDiscountCardsOfCustomer} from "../lib/queries/card-actions";
import BurnToggleButton from "../widgets/burn-toggle-button";

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
const discount_card_columns = [
    { id: "title", label: "Title", tKey: "cards_page.title" },
    { id: "price", label: "Price", tKey: "cards_page.price" },
    { id: "discount_percent", label: "Discount Percent", tKey: "cards_page.discount_percent" },
    { id: "description", label: "Description", tKey: "cards_page.description" },
    { id: "redeemed_at", label: "Redeemed At", tKey: "cards_page.redeemed_at" },

    // 🔥 New Burn Column
    {
        id: "burned",
        label: "Burn",
        tKey: "cards_page.burn",
        align: "center",
        render: (value, row) => (
            <BurnToggleButton row={row} />
        )
    }
];
const ModifyCustomerPage = () => {
    const { id } = useParams();
    return (
        <div className="p-6 space-y-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Modify Customer
            </h1>

            <div className={'flex  justify-center'}>
                <EditCustomerForm />
                <DiscountCardTable
                    queryFn={fetchDiscountCardsOfCustomer}
                    queryKey="discount_card"
                    columns={discount_card_columns}
                    filters={{role:"customer",role_id:id}}
                />
            </div>

            <div className="hidden md:block">
                <GuaranteeTable
                    queryFn={getGuaranteesForCustomer}
                    queryKey="guarantees"
                    columns={columns}
                    filters={{role:"customer",role_id:id}}
                />
            </div>

            {/* Discount Cards */}
            {/*<CustomerDiscountCardsTable />*/}
        </div>
    )
}
export default ModifyCustomerPage;