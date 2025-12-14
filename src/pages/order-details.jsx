import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getOrderById, updateOrderStatus } from "../lib/queries/order-actions";
import toast from "react-hot-toast";

const status =  [
    { id:1, title:"New"}, {id:2, title:"In Progress"}, {id:3, title:"Rejected"},
    {id:4, title:"Pending"}, {id:5, title:"Paid"}, {id:6, title:"Dispatched"}, {id:7, title:"Delivered"}, {id:8, title:"Archived"}
]
const OrderDetailsPage = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: order, isLoading, isError } = useQuery({
        queryKey: ["order", orderId],
        queryFn: () => getOrderById(orderId),
        enabled: !!orderId,
    });

    const statusMutation = useMutation({
        mutationFn: updateOrderStatus,
        onSuccess: () => {
            toast.success("Status updated");
            queryClient.invalidateQueries(["order", orderId]);
        },
        onError: () => {
            toast.error("Failed to update status");
        }
    });

    const handleStatusChange = (e) => {
        const newStatusId = e.target.value;
        statusMutation.mutate({ orderId, statusId: newStatusId });
    };

    if (isLoading) return <div className="p-10 text-center">Loading order...</div>;
    if (isError) return <div className="p-10 text-center text-red-500">Failed to load order.</div>;

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-6">

            {/* Back Button */}
            <button
                onClick={() => navigate("/dashboard/orders-management")}
                className="text-blue-600 hover:underline"
            >
                ← Back to Orders
            </button>

            {/* Order Header */}
            <div className="bg-white shadow rounded-xl p-6 border">
                <h1 className="text-3xl font-bold mb-3">Order #{order.id}</h1>

                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div>
                        <p className="font-semibold">Total Price:</p>
                        <p className="text-xl font-bold text-green-600">${order.total_price}</p>
                    </div>

                    <div className="md:ml-auto">
                        <p className="font-semibold mb-1">Order Status:</p>

                        <select
                            value={order.status_id}
                            onChange={handleStatusChange}
                            className="border rounded-lg px-3 py-2 text-sm focus:ring focus:ring-blue-200"
                        >
                            {status?.map((st) => (
                                <option key={st.id} value={st.id}>
                                    {st.title}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white shadow rounded-xl p-6 border overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                    <thead>
                    <tr className="bg-gray-100 text-gray-700 uppercase text-xs">
                        <th className="p-3 border">Image</th>
                        <th className="p-3 border">Product</th>
                        <th className="p-3 border">Count</th>
                        <th className="p-3 border">Price</th>
                        <th className="p-3 border">Total</th>
                    </tr>
                    </thead>

                    <tbody>
                    {order.products?.map((p) => (
                        <tr key={p.product_id} className="hover:bg-gray-50">
                            <td className="border p-2">
                                <img
                                    src={`https://heinrichs-club.com/assets/img/p/${p.product_image_id}.jpg`}
                                    alt={p.product_name}
                                    className="w-16 h-16 object-cover rounded"
                                />
                            </td>
                            <td className="border p-2">{p.product_name}</td>
                            <td className="border p-2 text-center">{p.count}</td>
                            <td className="border p-2 text-center">${p.price}</td>
                            <td className="border p-2 text-center font-semibold">
                                ${p.count * p.price}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default OrderDetailsPage;
