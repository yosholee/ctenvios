import { useQuery } from "@tanstack/react-query";
import { isAllowedTrackingSearch } from "@/lib/trackingSearchValidation";

/**
 * @param {string} trimmed
 * @returns {Promise<unknown | null>}
 */
const fetchTrackingLookup = async (trimmed) => {
	const isOrderId = /^\d{1,7}$/.test(trimmed);
	const params = new URLSearchParams(
		isOrderId ? { order_id: trimmed } : { tracking: trimmed },
	);
	const res = await fetch(`/api/tracking/lookup?${params}`);
	if (res.status === 429) {
		throw new Error("Demasiadas solicitudes. Intente de nuevo en un minuto.");
	}
	if (res.status === 404) {
		return null;
	}
	if (!res.ok) {
		const body = await res.json().catch(() => ({}));
		throw new Error(body.message || "No se encontró el envío");
	}
	return res.json();
};

/**
 * @param {string|undefined|null} id
 */
export const useFetchByInvoiceOrHBL = (id) => {
	const trimmed = id?.trim() ?? "";
	const enabled = trimmed.length > 0 && isAllowedTrackingSearch(trimmed);

	return useQuery({
		queryKey: ["tracking-lookup", trimmed],
		queryFn: () => fetchTrackingLookup(trimmed),
		enabled,
		staleTime: 1000 * 60 * 5,
	});
};
