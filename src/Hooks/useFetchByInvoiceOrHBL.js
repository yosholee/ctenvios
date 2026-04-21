import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { isAllowedTrackingSearch } from "@/lib/trackingSearchValidation";

const getProductData = async (hbl) => {
	
	try {
		const res = await axios.get(`https://api.ctenvios.com/api/v1/tracking/lookup/${hbl}`);
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
		enabled: hasSearch,
	});
};
