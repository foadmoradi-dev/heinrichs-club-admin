import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ProductsTable = ({ products }) => {
    const [productToDelete, setProductToDelete] = useState(null);

    const confirmDelete = (product) => {
        setProductToDelete(product);
    };

    const handleDeleteConfirmed = () => {
        if (productToDelete) {
            // Call your API to delete here
            setProductToDelete(null);
        }
    };

    const handleCancelDelete = () => setProductToDelete(null);

    return (
        <div className="hidden md:flex justify-center overflow-x-auto rounded-lg shadow-lg bg-white">
            <table className="w-full text-sm text-left border-collapse rounded-lg">
                <thead className="bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 rounded-t-lg">
                <tr>
                    <th className="px-5 py-3 text-left font-medium">Image</th>
                    <th className="px-5 py-3 text-left font-medium">Product Name</th>
                    <th className="px-5 py-3 text-left font-medium">Model</th>
                    <th className="px-5 py-3 text-left font-medium">Wholesale Price</th>
                    <th className="px-5 py-3 text-left font-medium">Retail Price</th>
                    <th className="px-5 py-3 text-left font-medium">Entity</th>
                    <th className="px-5 py-3 text-center font-medium">Actions</th>
                </tr>
                </thead>

                <tbody>
                {products?.map((p) => (
                    <tr
                        key={p.id}
                        className="border-b hover:bg-gray-50 transition duration-150 ease-in-out cursor-pointer"
                    >
                        <td className="px-5 py-3">
                            <img
                                src={`https://heinrichs-club.com/assets/img/p/${p.product_image_id}.jpg`}
                                className="w-16 h-16 object-cover rounded-lg shadow-sm"
                                alt={p.product_name}
                            />
                        </td>

                        <td className="px-5 py-3 font-medium text-gray-800">{p.product_name || "---"}</td>
                        <td className="px-5 py-3 text-gray-600">{p.product_model || "---"}</td>
                        <td className="px-5 py-3 text-blue-600 font-semibold">${p.product_wholesale_price ?? "---"}</td>
                        <td className="px-5 py-3 text-blue-600 font-semibold">${p.product_retail_price ?? "---"}</td>
                        <td className="px-5 py-3 text-gray-600">{p.product_entity || "---"}</td>

                        <td className="px-5 py-3 text-center flex justify-center items-center gap-3">
                            <Link
                                to={`/dashboard/products-management/${p.id}`}
                                className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition"
                            >
                                <Edit className="w-5 h-5 text-blue-600" />
                            </Link>
                            <button
                                onClick={() => confirmDelete(p)}
                                className="p-2 bg-red-100 rounded-lg hover:bg-red-200 transition"
                            >
                                <Trash2 className="w-5 h-5 text-red-600" />
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Delete Confirmation Modal */}
            {productToDelete && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-xl p-6 w-96 shadow-xl animate-fadeIn">
                        <h2 className="text-2xl font-semibold mb-3 text-gray-800">Confirm Delete</h2>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete <span className="font-medium">{productToDelete.product_name}</span>?
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={handleCancelDelete}
                                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteConfirmed}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductsTable;
