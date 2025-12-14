import OrdersTable from "../components/order/orders-table";
import {getOrders} from "../lib/queries/order-actions";
import {FiEye} from "react-icons/fi";
import {Link} from "react-router-dom";
import { Eye, Plus } from "lucide-react";
const order_columns =  [
    { id: "id", label: "ID", tKey: "orders_page.id" },
    { id: "agent_name", label: "Agent", tKey: "orders_page.agent_name" },
    { id: "agent_phone_number", label: "Agent Phone", tKey: "orders_page.agent_phone_number" },
    { id: "total_price", label: "Total Price", tKey: "orders_page.total_price" },
    {
        id: "status_title",
        label: "Status",
        tKey: "orders_page.status",
        render: (value) => (
            <span
                className={`px-2 py-1 rounded text-xs ${
                    value === "New" || value === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : value === "Paid" || value === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : value === "Rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-gray-100 text-gray-600"
                }`}
            >
                {value}
            </span>
        ),
    },
    { id: "created_at", label: "Created At", tKey: "orders_page.created_at" },
    { id: "updated_at", label: "Updated At", tKey: "orders_page.updated_at" },
    {
        id: "actions",
        label: "Actions",
        tKey: "orders_page.actions",
        render: (_, row) => (
            <Link to={`/dashboard/orders-management/${row.id}`} className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition" >
                <Eye className="w-5 h-5 text-gray-600" />
            </Link>
        ),
    },
];
const OrdersManagementPage = () => {
    return (
        <div>
           <OrdersTable
               queryFn={getOrders}
               queryKey="orders"
               columns={order_columns}

           />
        </div>
    )
}
export default OrdersManagementPage