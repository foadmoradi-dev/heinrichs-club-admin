import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCard, fetchCard } from "../lib/queries/card-actions";

export default function CardsManagementPage() {
    const queryClient = useQueryClient();

    // Fetch cards
    const { data: cards, isLoading, isError } = useQuery({
        queryKey: ["cards"],
        queryFn: fetchCard, // expect array of cards
    });

    // Delete card mutation
    const deleteMutation = useMutation({
        mutationFn: deleteCard,
        onSuccess: () => {
            queryClient.invalidateQueries(["cards"]);
        },
    });

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this card?")) {
            deleteMutation.mutate(id);
        }
    };

    if (isLoading) return <p className="text-center py-10">Loading cards...</p>;
    if (isError) return <p className="text-center py-10 text-red-500">Failed to load cards.</p>;

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Cards Management</h1>
                <Link
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
                    to={'/dashboard/cards-management/new-card'}>
                    Create New Card
                </Link>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {cards?.map((card) => (
                    <div
                        key={card.id}
                        className="bg-white rounded-xl shadow p-5 border hover:shadow-lg transition"
                    >
                        {/* Card Image */}
                            <img
                                src={`https://heinrichs-club.com/assets/img/cards/${card.image}.jpg`}
                                alt={card.title}
                                className="w-full h-40 object-cover rounded-lg mb-3"
                            />


                        <h2 className="text-lg font-semibold mb-2">{card.title}</h2>

                        <div className="text-gray-600 text-sm mb-4">
                            <p><span className="font-bold">Price:</span> {card.price} ⭐</p>
                            <p><span className="font-bold">Discount:</span> {card.discount_percent}%</p>
                        </div>

                        <div className="flex gap-2">
                            <Link
                                to={`/dashboard/cards-management/${card.id}`}
                                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-center">
                                Edit
                            </Link>
                            <button
                                onClick={() => handleDelete(card.id)}
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
