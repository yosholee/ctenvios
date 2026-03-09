import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getProductData = async (id) => {
	let trimmedId = id.trim();
	if (!trimmedId) return [];
	const isOrderId = /^\d+$/.test(trimmedId);
	if (!isOrderId && trimmedId.length < 3) return [];

	if (trimmedId.endsWith("CTE") || trimmedId.endsWith("cte")) {
		trimmedId = trimmedId.slice(0, -3).trim();
	}

	const isOrderIdParam = /^\d+$/.test(trimmedId);
	const params = isOrderIdParam ? { order_id: trimmedId } : { tracking: trimmedId };

	try {
		const res = await axios.get("/api/tracking/lookup", {
			params,
			timeout: 15000,
		});
		return res.data;
	} catch (err) {
		if (err.response?.status === 429) {
			throw new Error("Demasiadas solicitudes. Intente de nuevo en un minuto.");
		}
		return null;
	}
};

export const useFetchByInvoiceOrHBL = (id) => {
	const trimmed = id?.trim() ?? "";
	const hasSearch = /^\d+$/.test(trimmed) || trimmed.length >= 3;

	return useQuery({
		queryKey: ["fetchProductByHBL", id],
		queryFn: () => getProductData(id),
		enabled: hasSearch,
		staleTime: 1000 * 60 * 5,
	});
};
