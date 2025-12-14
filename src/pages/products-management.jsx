import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProductsForAdmin } from "../lib/queries/product-actions";
import ProductsTable from "../components/product/products-table";
import {Link} from "react-router-dom";



const  ProductsManagementPage = () => {
    const [page, setPage] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const limit = 10;

    const { data, isLoading, isError } = useQuery({
        queryKey: ["products", page],
        queryFn: fetchProductsForAdmin,
        keepPreviousData: true,
    });

    if (isLoading) return <div className="p-10 text-center">Loading...</div>;
    if (isError) return <div className="p-10 text-center text-red-500">Error loading products.</div>;

    const { count, data: products } = data;
    const totalPages = Math.ceil(count / limit);


    return (
        <div className="min-h-screen py-10 px-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Product Catalog</h1>
                <Link
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                    to={`/dashboard/products-management/new-product`}>
                    Add New Product
                </Link>
            </div>

            {/* DESKTOP TABLE */}
            <ProductsTable
                products={products}
            />
            <div className="flex justify-center items-center gap-2 mt-8">
                <button
                    onClick={() => setPage(p => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
                >
                    Prev
                </button>

                <span className="text-gray-700">
                    Page <strong>{page}</strong> of {totalPages}
                </span>

                <button
                    onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
                >
                    Next
                </button>
            </div>

        </div>
    );
};

export default ProductsManagementPage;
