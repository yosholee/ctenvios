/**
 * Strips trailing "CTE"/"cte" when input length is greater than 3 (same rule as lookup proxy).
 * @param {string} value
 * @returns {string}
 */
export function stripTrackingInputSuffix(value) {
	const trimmed = String(value ?? "").trim();
	if (trimmed.length > 3 && (trimmed.endsWith("CTE") || trimmed.endsWith("cte"))) {
		return trimmed.slice(0, -3).trim();
	}
	return trimmed;
}

/**
 * Allowed tracking search:
 * - Order id: 1–7 digits only
 * - HBL / tracking: non-empty string that starts with "CTE" (case-insensitive)
 */
export function isAllowedTrackingSearch(value) {
	if (value == null || typeof value !== "string") return false;
	const t = value.trim();
	if (!t) return false;
	if (/^\d{1,7}$/.test(t)) return true;
	if (/^cte/i.test(t)) return true;
	return false;
}
