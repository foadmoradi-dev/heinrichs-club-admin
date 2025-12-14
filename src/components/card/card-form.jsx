import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";
import {fetchCard, fetchCardById, newCard, updateCard} from "../../lib/queries/card-actions";

export default function CardForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;
    const queryClient = useQueryClient();

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [discountPercent, setDiscountPercent] = useState("");
    const [description, setDescription] = useState("");

    const [imagePreview, setImagePreview] = useState(null);
    const [imageBase64, setImageBase64] = useState(null);

    // Fetch card on edit mode
    const { data: cardData, isLoading } = useQuery({
        queryKey: ["card", id],
        queryFn: () => fetchCardById(id),
        enabled: isEdit,
    });

    useEffect(() => {
        if (cardData && isEdit) {
            setTitle(cardData.title);
            setPrice(cardData.price);
            setDiscountPercent(cardData.discount_percent);
            setDescription(cardData.description);

            // Load image from server
            if (cardData.image) {
                setImagePreview(`https://heinrichs-club.com/assets/img/cards/${cardData.image}.jpg`);
            }
        }
    }, [cardData, isEdit]);

    // Convert image to base64
    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => setImageBase64(reader.result);
        reader.readAsDataURL(file);

        setImagePreview(URL.createObjectURL(file));
    };

    const formMutation = useMutation({
        mutationFn: async () => {
            const payload = {
                title,
                price,
                discount_percent: discountPercent,
                description,
            };

            // Only send base64 image if selected
            if (imageBase64) {
                payload.card_image_data = imageBase64;
            }

            return isEdit
                ? updateCard(id, payload)
                : newCard(payload);
        },

        onSuccess: () => {
            queryClient.invalidateQueries(["discount-cards"]);
            navigate("/dashboard/cards-management");
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        formMutation.mutate();
    };

    if (isLoading) return <p className="text-center py-10">Loading...</p>;

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-6">
            <h1 className="text-2xl font-bold mb-4">
                {isEdit ? "Edit Card" : "Create New Card"}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-5">

                {/* Title */}
                <div>
                    <label className="block mb-1 font-medium">Title</label>
                    <input
                        type="text"
                        className="w-full border rounded-lg p-2"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="block mb-1 font-medium">Price</label>
                    <input
                        type="number"
                        className="w-full border rounded-lg p-2"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>

                {/* Discount percent */}
                <div>
                    <label className="block mb-1 font-medium">Discount Percent</label>
                    <input
                        type="number"
                        className="w-full border rounded-lg p-2"
                        value={discountPercent}
                        onChange={(e) => setDiscountPercent(e.target.value)}
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block mb-1 font-medium">Description</label>
                    <textarea
                        className="w-full border rounded-lg p-2"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                {/* Image */}
                <div>
                    <label className="block mb-1 font-medium">Card Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImage}
                        className="border p-2 rounded-lg w-full"
                    />

                    {imagePreview && (
                        <img
                            src={imagePreview}
                            className="w-40 h-40 object-cover rounded-lg mt-3 border"
                        />
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-lg"
                    disabled={formMutation.isPending}
                >
                    {formMutation.isPending
                        ? "Saving..."
                        : isEdit
                            ? "Update Card"
                            : "Create Card"}
                </button>
            </form>
        </div>
    );
}
