import { FiXCircle, FiCheckCircle } from "react-icons/fi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {toggleBurnStatus} from "../lib/queries/card-actions";

const BurnToggleButton = ({ row }) => {
    const queryClient = useQueryClient();
    console.log(row)
    const mutation = useMutation({
        mutationFn: () => toggleBurnStatus(row.redeemed_id),
        onSuccess: () => {
            queryClient.invalidateQueries(["customer-discount-cards", row.customer_id]);
            toast.success("Status updated");
        },
        onError: () => {
            toast.error("Failed to update");
        },
    });

    const handleClick = (e) => {
        e.stopPropagation(); // prevent triggering row click
        mutation.mutate();
    };

    return (
        <button onClick={handleClick} className="p-1">
            {row.burned === 1 ? (
                <FiCheckCircle className="text-green-600" size={20} />
            ) : (
                <FiXCircle className="text-red-500" size={20} />
            )}
        </button>
    );
};

export default BurnToggleButton;
