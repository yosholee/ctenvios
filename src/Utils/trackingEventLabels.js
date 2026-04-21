/** @typedef {{ statusCode?: string|null, statusName?: string|null, statusDescription?: string|null, location?: string|null, timestamp?: string|null, userName?: string|null, source?: string|null }} TrackingEventLike */

const STATUS_LABELS_ES = {
	IN_AGENCY: "En agencia",
	IN_DISPATCH: "En despacho",
	IN_WAREHOUSE: "En almacén (origen)",
	IN_CONTAINER: "En contenedor",
	IN_TRANSIT: "En tránsito",
	AT_PORT_OF_ENTRY: "En puerto de entrada",
	RELEASED_FROM_CUSTOMS: "Liberado de aduanas",
	RECEIVED_AT_WAREHOUSE: "Entrada en almacén",
	WAREHOUSE_TRANSFER: "Transferencia entre almacenes",
	DELIVERED: "Entrega exitosa",
	OUT_FOR_DELIVERY: "Despachado a mensajero",
	AT_WAREHOUSE: "En almacén",
};

/** statusName is often the same container line for all of these — title comes from the code instead */
const CONTAINER_PHASE_CODES = new Set([
	"IN_CONTAINER",
	"IN_TRANSIT",
	"AT_PORT_OF_ENTRY",
	"RELEASED_FROM_CUSTOMS",
]);

/**
 * True when statusName is the same technical token as statusCode (e.g. IN_AGENCY).
 * @param {string} name
 * @param {string} code
 * @returns {boolean}
 */
const isTechnicalDuplicateName = (name, code) => {
	if (!name || !code) return false;
	return name.trim().toUpperCase() === code.trim().toUpperCase();
};

/**
 * True when the name looks like an internal constant (ALL_CAPS_WITH_UNDERSCORES).
 * @param {string} name
 * @returns {boolean}
 */
const looksLikeRawCode = (name) => /^[A-Z][A-Z0-9_]+$/.test(name.trim());

/**
 * @param {string} code
 * @returns {string}
 */
const humanizeCode = (code) => {
	if (!code) return "Actualización";
	return code
		.split("_")
		.filter(Boolean)
		.map((part) => part.charAt(0) + part.slice(1).toLowerCase())
		.join(" ");
};

/**
 * Whether statusName carries shipment/container context we should show under the main title.
 * @param {string} name
 * @param {string} primary
 * @param {string} code
 * @returns {boolean}
 */
const shouldShowNameAsContext = (name, primary, code) => {
	if (!name || name === primary) return false;
	if (isTechnicalDuplicateName(name, code)) return false;
	if (looksLikeRawCode(name)) return false;
	return true;
};

/**
 * Removes internal operator mentions (e.g. "Usuario: Carlos") from API copy.
 * @param {string} text
 * @returns {string|null}
 */
const stripInternalUsuarioClauses = (text) => {
	if (!text) return null;
	const parts = text
		.split(/\./)
		.map((s) => s.replace(/\s*Usuario:\s*.*$/i, "").trim())
		.filter((s) => s.length > 0);
	const joined = parts.join(". ").trim();
	if (!joined) return null;
	return joined.endsWith(".") ? joined : `${joined}.`;
};

/**
 * @param {TrackingEventLike} ev
 * @returns {number}
 */
const eventTimeMs = (ev) => {
	if (!ev?.timestamp) return 0;
	const t = new Date(ev.timestamp).getTime();
	return Number.isNaN(t) ? 0 : t;
};

/**
 * Drops duplicate rows with the same status + container line + description (system echoes
 * minutes or hours apart). Keeps the earliest timestamp for each key.
 * @param {TrackingEventLike[]|null|undefined} events
 * @returns {TrackingEventLike[]}
 */
export const dedupeTrackingEventsForDisplay = (events) => {
	if (!events?.length) return [];
	const sorted = [...events].sort((a, b) => eventTimeMs(a) - eventTimeMs(b));
	const seen = new Set();
	const out = [];
	for (const ev of sorted) {
		const code = (ev.statusCode || "").toUpperCase();
		const key = `${code}|${String(ev.statusName || "").trim()}|${String(ev.statusDescription || "").trim()}`;
		if (seen.has(key)) continue;
		seen.add(key);
		out.push(ev);
	}
	return out;
};

/**
 * Readable lines for one tracking event (Spanish-first UI).
 * @param {TrackingEventLike} ev
 * @returns {{ primary: string, contextLine: string|null, detail: string|null, location: string|null, statusCode: string }}
 */
export const getTrackingEventPresentation = (ev) => {
	const code = (ev.statusCode || "").toUpperCase();
	const name = (ev.statusName || "").trim();
	const detailRaw = ev.statusDescription ? String(ev.statusDescription).trim() : "";
	const detail = detailRaw ? stripInternalUsuarioClauses(detailRaw) : null;

	const fromMap = STATUS_LABELS_ES[code];

	let primary;
	if (CONTAINER_PHASE_CODES.has(code) && fromMap) {
		primary = fromMap;
	} else if (fromMap && name && !isTechnicalDuplicateName(name, code) && !looksLikeRawCode(name)) {
		primary = name;
	} else {
		primary =
			fromMap ||
			(name && !looksLikeRawCode(name) && !isTechnicalDuplicateName(name, code) ? name : null) ||
			humanizeCode(code);
	}

	const contextLine = shouldShowNameAsContext(name, primary, code) ? name : null;

	return {
		primary,
		contextLine,
		detail,
		location: ev.location || null,
		statusCode: code,
	};
};
