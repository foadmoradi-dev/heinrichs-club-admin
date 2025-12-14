import Api from "../../api/api";

export const getOrders = async () => {
    const { data } = await Api.get("order");
    return data;
};

export const getOrderById = async (id) => {
    const { data } = await Api.get(`order/${id}`);
    return data;
};


export const placeOrder = async (cart) => {
    const payload = {
        total_price: cart.products.reduce(
            (sum, item) => sum + item.product_dollar_price * item.count,
            0
        ),
        status: 1, // 1 = "New"
        product_ids: cart.products.map((item) => ({
            id: item.id,
            count: item.count,
            product_dollar_price: item.product_dollar_price,
        })),
    };

    const res = await Api.post("order", payload);
    return res.data;
};


export const updateOrderStatus = async ({orderId, statusId}) => {
    console.log(orderId);
    const res = await Api.patch(
        `/order/${orderId}`,
        { status:statusId },
        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        }
    );
    return res.data;
};
