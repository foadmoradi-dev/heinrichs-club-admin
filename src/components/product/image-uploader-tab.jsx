import React, { useState, useEffect } from "react";

const ImageUploader = ({ initialImageId = null, onRemove, setValue }) => {
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        if (initialImageId) {
            setPreviewUrl(`https://heinrichs-club.com/assets/img/p/${initialImageId}.jpg`);
            setValue("product_image_id", initialImageId);
        }
    }, [initialImageId, setValue]);

    const handleFile = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // live preview
        setPreviewUrl(URL.createObjectURL(file));

        // generate image id if new
        const imageId = crypto.randomUUID();
        setValue("product_image_id", imageId);

        // convert to base64
        const base64 = await toBase64(file);
        setValue("product_image_data", base64);
    };

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
        });

    const handleRemove = () => {
        setPreviewUrl(null);
        setValue("product_image_id", null);
        setValue("product_image_data", null);
        onRemove?.();
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-4">
                <div className="w-32 h-32 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center border">
                    {previewUrl ? (
                        <img src={previewUrl} alt="preview" className="w-full h-full object-cover" />
                    ) : (
                        <div className="text-sm text-gray-400">No image</div>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <input type="file" accept="image/*" onChange={handleFile} />

                    <button
                        type="button"
                        onClick={handleRemove}
                        className="px-3 py-1 bg-gray-200 rounded"
                    >
                        Remove
                    </button>
                </div>
            </div>

            {/* hidden fields for backend */}
            <input type="hidden" {...setValue("product_image_id")} />
            <input type="hidden" {...setValue("product_image_data")} />
        </div>
    );
};

export default ImageUploader;
