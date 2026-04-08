import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { isAllowedTrackingSearch } from "@/lib/trackingSearchValidation";

const getProductData = async (id) => {
	let trimmedId = id.trim();
	if (!isAllowedTrackingSearch(trimmedId)) return null;

	if (
		trimmedId.length > 3 &&
		(trimmedId.endsWith("CTE") || trimmedId.endsWith("cte"))
	) {
		trimmedId = trimmedId.slice(0, -3).trim();
	}
	if (!trimmedId) return null;

	const isOrderIdParam = /^\d{1,7}$/.test(trimmedId);
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
	const hasSearch = isAllowedTrackingSearch(trimmed);

	return useQuery({
		queryKey: ["fetchProductByHBL", id],
		queryFn: () => getProductData(id),
		enabled: hasSearch,
		staleTime: 1000 * 60 * 5,
	});
};
