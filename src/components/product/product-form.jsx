// src/pages/ProductForm.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Tab } from "@headlessui/react";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom"; // or next/router
import {
    useProduct,
    useCategories,
} from "../../lib/queries/product-actions";
import DescriptionsTab from "./description-tab";
import PricesTab from "./price-tab";
import EntityScoreTab from "./entity-score-tab";
import CategorySelector from "./category-selector-tab";
import ImageUploader from "./image-uploader-tab";
import clsx from "clsx";
import api from "../../api/api";
import {useMutation, useQueryClient} from "@tanstack/react-query";


const tabs = ["Descriptions", "Prices", "Entity & Score", "Categories", "Image"];

const ProductForm = () => {
    const { id } = useParams(); // product id or undefined for new
    const navigate = useNavigate();
    const isEdit = !!id;

    const { data: productData, isLoading: isLoadingProduct } = useProduct(id);
    const { data: categories } = useCategories();
    const queryClient = useQueryClient();
    const createMutate =  useMutation({
        mutationFn: async (payload) => {
            const { data } = await api.post("/product", payload, {
                headers: {
                    'content-type': 'application/json'
                },
                withCredentials: true
            });
            return data;
        },
        onSuccess: () => queryClient.invalidateQueries(["products"]),
    });

    const updateMutate = useMutation({
        mutationFn: async ({ id, payload }) => {
            const { data } = await api.patch(`/product/${id}`, payload, {
                headers: {
                    'content-type': 'application/json'
                },
                withCredentials: true
            });
            return data;
        },
        onSuccess: () => queryClient.invalidateQueries(["products"]),
    });

    const methods = useForm({
        defaultValues: {
            product_name: "",
            product_model: "",
            product_dollar_price: "",
            product_short_desc: "",
            product_long_desc: "",
            product_wholesale_price: "",
            product_retail_price: "",
            product_entity: "",
            product_score: "",
            product_image_id: null,
        },
    });

    const { control, register, setValue, handleSubmit, reset } = methods;

    // selected categories as Set for quick toggling
    const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);

    useEffect(() => {
        if (isEdit && productData) {
            // map backend product fields to form
            const p = productData;
            reset({
                product_name: p.product_name ?? "",
                product_model: p.product_model ?? "",
                product_dollar_price: p.product_dollar_price ?? "",
                product_short_desc: p.product_short_desc ?? "",
                product_long_desc: p.product_long_desc ?? "",
                product_wholesale_price: p.product_wholesale_price ?? "",
                product_retail_price: p.product_retail_price ?? "",
                product_entity: p.product_entity ?? "",
                product_score: p.product_score ?? "",
                product_image_id: p.product_image_id ?? null,
            });

            // productData should include categories array [ { category_id } ] or ids
            const catIds = (p.categories || []).map(c => c.category_id || c.id || c);
            setSelectedCategoryIds(catIds);
        }
    }, [isEdit, productData, reset]);

    useEffect(() => {
        if (isEdit && productData) {
            const catIds = (productData.categories || []);
            setSelectedCategoryIds(catIds);  // ← array of ids
        }
    }, [isEdit, productData]);



    const handleRemoveImage = () => {
        setValue("product_image_id", null);
    };

    const onSubmit = async (values) => {
        const payload = {
            ...values,
            product_image_id: values.product_image_id ?? null,
            categories: Array.from(selectedCategoryIds),
        };
        try {
            if (isEdit) {
                await updateMutate.mutate({ id, payload }); // ✅ use mutateAsync
            } else {
                await createMutate.mutate(payload); // ✅ use mutateAsync
            }

            //navigate("/dashboard/products-management");
        } catch (err) {
            console.error("Save failed", err);
            alert("Failed to save product");
        }
    };

    if (isEdit && isLoadingProduct) return <div>Loading product...</div>;

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow">
            <h1 className="text-2xl font-bold mb-4">{isEdit ? "Edit Product" : "Add Product"}</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Product Title</label>
                    <input
                        {...register("product_name", { required: true })}
                        className="mt-1 w-full border rounded-md p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Product Model</label>
                    <input {...register("product_model")} className="mt-1 w-full border rounded-md p-2" />
                </div>

                <Tab.Group>
                    <Tab.List className="flex border-b">
                        {tabs.map((tab) => (
                            <Tab key={tab}
                                 className={({ selected }) =>
                                     clsx(
                                         "px-4 py-2 text-sm font-medium border-b-2 transition",
                                         selected
                                             ? "text-blue-600"
                                             : "border-transparent text-gray-500 hover:text-blue-600"
                                     )
                                 }
                            >
                                {tab}
                            </Tab>
                        ))}
                    </Tab.List>

                    <Tab.Panels className="mt-6">
                        <Tab.Panel className="max-w-6xl mx-auto">
                            <DescriptionsTab control={control}  />
                        </Tab.Panel>

                        <Tab.Panel  className="max-w-6xl mx-auto">
                            <PricesTab control={control} />
                        </Tab.Panel>

                        <Tab.Panel  className="max-w-6xl mx-auto">
                            <EntityScoreTab control={control} />
                        </Tab.Panel>

                        <Tab.Panel  className="max-w-6xl mx-auto">
                            <div className="mt-2">
                                <CategorySelector
                                    categories={categories || []}
                                    selectedIds={selectedCategoryIds}
                                    setSelectedIds={setSelectedCategoryIds}
                                />
                            </div>
                        </Tab.Panel>

                        <Tab.Panel  className="max-w-6xl mx-auto">
                            <div className="mt-2">
                                <ImageUploader
                                    initialImageId={productData?.product_image_id}
                                    setValue={setValue}
                                    onRemove={handleRemoveImage}
                                />
                                {/* hidden input for product_image_id is inside ImageUploader */}
                            </div>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>

                <div className="flex justify-end gap-3">
                    <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-200 rounded">
                        Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
