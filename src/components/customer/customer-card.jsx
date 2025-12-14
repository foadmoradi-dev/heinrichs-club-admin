import { useState } from "react";
import {
    FaTrash,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaStar,
    FaEye
} from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Api from "../../api/api";

export default function CustomerCard({ customer }) {
    const queryClient = useQueryClient();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Helper
    const display = (value) => value || "---";

    // Delete request
    const deleteCustomer = async (id) => {
        const res = await Api.delete(`/customer/${id}`);
        return res.data;
    };

    const deleteMutation = useMutation({
        mutationFn: deleteCustomer,
        onSuccess: () => {
            queryClient.invalidateQueries(["customers"]);
            setShowDeleteModal(false);
        }
    });

    return (
        <>
            {/* Main Card */}
            <div className="p-5 rounded-2xl shadow-md border bg-white hover:shadow-lg transition flex flex-col justify-between h-full">

                {/* Top row */}
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">
                            {display(customer.first_name)} {display(customer.last_name)}
                        </h2>
                    </div>

                    <div className="flex gap-3 items-center">

                        {/* View */}
                        <Link to={`/dashboard/customers-management/${customer.id}`}>
                            <FaEye className="text-blue-500 text-xl cursor-pointer hover:text-blue-700 transition" />
                        </Link>

                        {/* Delete */}
                        <FaTrash
                            className="text-red-500 text-xl cursor-pointer hover:text-red-700 transition"
                            onClick={() => setShowDeleteModal(true)}
                        />
                    </div>
                </div>

                {/* Info Section */}
                <div className="mt-4 space-y-2 text-gray-700">
                    <p className="flex items-center gap-2">
                        <FaEnvelope className="text-blue-500" />
                        {display(customer.email)}
                    </p>

                    <p className="flex items-center gap-2">
                        <FaPhone className="text-green-600" />
                        {display(customer.phone_number)}
                    </p>

                    <p className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-red-500" />
                        {display(customer.full_address)}, {display(customer.address_country)}
                    </p>

                    <p className="flex items-center gap-2">
                        <FaStar className="text-yellow-500" />
                        {customer.star ?? 0} Stars
                    </p>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-xl p-6 w-80">
                        <h3 className="text-lg font-semibold text-gray-800">
                            Confirm Delete
                        </h3>

                        <p className="text-gray-600 mt-2">
                            Are you sure you want to delete{" "}
                            <strong>
                                {display(customer.first_name)} {display(customer.last_name)}
                            </strong>
                            ?
                        </p>

                        <div className="mt-5 flex justify-end gap-3">
                            <button
                                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Cancel
                            </button>

                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                onClick={() => deleteMutation.mutate(customer.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
