import { useQuery } from "@tanstack/react-query";

/**
 * Fetches HM history for a given HBL
 * Uses local API route to proxy the request (avoids mixed content issues in production)
 * @param {string} hbl - The HBL code to fetch history for
 * @returns {Promise<object>} - The HM history response
 */
const fetchHMHistory = async (hbl) => {
	if (!hbl || hbl.trim() === "") {
		return { historial: [] };
	}

	const response = await fetch(`/api/historial/${hbl.trim()}`);
	
	if (!response.ok) {
		return { historial: [] };
	}
	
	return response.json();
};

/**
 * React Query hook to fetch HM history for a parcel
 * @param {string} hbl - The HBL code
 * @returns {object} - React Query result with data, isLoading, error
 */
export const useFetchHMHistory = (hbl) => {
	return useQuery({
		queryKey: ["fetchHMHistory", hbl],
		queryFn: () => fetchHMHistory(hbl),
		enabled: Boolean(hbl && hbl.trim() !== ""),
		staleTime: 1000 * 60 * 10, // align with edge cache (~10m); fewer duplicate /api/historial calls
		retry: 1,
	});
};
