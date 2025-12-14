// /src/lib/queries/products.js

import Api from "../../api/api";
import api from "../../api/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

/* ---------------------------------------------
   FETCH PRODUCTS (ADMIN PAGINATION)
--------------------------------------------- */
export const fetchProductsForAdmin = async ({ queryKey }) => {
    const [_key, page] = queryKey;

    try {
        const res = await Api.get(`product?page=${page}`, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        });

        // token refresh (backend returns 201)
        if (res.status === 201) {
            await Api.get("refresh.php", {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });

            const refreshed = await Api.get(`product?page=${page}`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });

            return refreshed.data;
        }

        return res.data;
    } catch (err) {
        console.error("Error fetching products:", err);
        throw new Error("Failed to fetch products");
    }
};

/* ---------------------------------------------
   FETCH SINGLE PRODUCT
--------------------------------------------- */
export const fetchProduct = async (id) => {
    const { data } = await Api.get(`/product/${id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    });
    return data;
};

export const useProduct = (id) =>
    useQuery({
        queryKey: ["product", id],
        queryFn: () => fetchProduct(id),
        enabled: !!id,
    });

/* ---------------------------------------------
   FETCH ALL CATEGORIES
--------------------------------------------- */
export const fetchCategories = async () => {
    const { data } = await api.get("/cat.php", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    });
    return data;
};

export const useCategories = () =>
    useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,
    });



