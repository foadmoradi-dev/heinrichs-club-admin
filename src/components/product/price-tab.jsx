// src/components/product/PricesTab.jsx
import React from "react";
import { Controller } from "react-hook-form";

const PricesTab = ({ control }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Dollar Price</label>
                <Controller
                    name="product_dollar_price"
                    control={control}
                    render={({ field }) => (
                        <input {...field} type="number" step="0.01" className="mt-1 w-full border rounded-md p-2" />
                    )}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Wholesale Price</label>
                <Controller
                    name="product_wholesale_price"
                    control={control}
                    render={({ field }) => (
                        <input {...field} type="number" step="0.01" className="mt-1 w-full border rounded-md p-2" />
                    )}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Retail Price</label>
                <Controller
                    name="product_retail_price"
                    control={control}
                    render={({ field }) => (
                        <input {...field} type="number" step="0.01" className="mt-1 w-full border rounded-md p-2" />
                    )}
                />
            </div>
        </div>
    );
};

export default PricesTab;
