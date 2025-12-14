// src/components/product/EntityScoreTab.jsx
import React from "react";
import { Controller } from "react-hook-form";

const EntityScoreTab = ({ control }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Entity</label>
                <Controller
                    name="product_entity"
                    control={control}
                    render={({ field }) => (
                        <input {...field} type="text" className="mt-1 w-full border rounded-md p-2" />
                    )}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Score</label>
                <Controller
                    name="product_score"
                    control={control}
                    render={({ field }) => (
                        <input {...field} type="number" min="0" max="100" className="mt-1 w-full border rounded-md p-2" />
                    )}
                />
            </div>
        </div>
    );
};

export default EntityScoreTab;
