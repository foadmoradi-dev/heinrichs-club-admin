import Api from "../../api/api";


export async function fetchStatistics() {
    const res = await Api.get(`statistics.php`, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    })
    return res.data
}


export const checkBarcode = async (barcode) => {
    const response = await Api.post("/check-barcode.php", { barcode });
    return response.data;
};


export async function getCategories() {
    const res = await Api.get(`cat.php`, {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    });
    console.log(res.data);
    return res.data;
}

export async function getProductsByCategory(cat, page = 1) {
    const res = await Api.get("products.php", {
        params: { cat, page },
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    });
    return res.data;
}

