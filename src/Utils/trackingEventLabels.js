/** @typedef {{ statusCode?: string|null, statusName?: string|null, statusDescription?: string|null, location?: string|null, timestamp?: string|null, userName?: string|null, source?: string|null }} TrackingEventLike */

const STATUS_LABELS_ES = {
	IN_AGENCY: "En agencia",
	IN_PALLET: "En pallet",
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

/** Prefer Spanish label over English {@code statusName} when both exist */
const SPANISH_PRIMARY_CODES = new Set([
	...CONTAINER_PHASE_CODES,
	"IN_AGENCY",
	"IN_PALLET",
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
 * Keeps only trusted markup from HM/API copy: normalized {@code <strong>} and {@code <br />}.
 * Strips any other tags so {@code dangerouslySetInnerHTML} stays constrained.
 * @param {string} html
 * @returns {string}
 */
export const sanitizeTrustedTrackingHtml = (html) => {
	if (!html || typeof html !== "string") return "";
	let s = html.replace(/\r\n/g, "\n");
	s = s.replace(/<\s*script\b[^>]*>[\s\S]*?<\s*\/\s*script\s*>/gi, "");
	s = s.replace(/<\s*style\b[^>]*>[\s\S]*?<\s*\/\s*style\s*>/gi, "");
	s = s.replace(/<\s*br\s*\/?>/gi, "{{BR}}");
	s = s.replace(/<\s*\/\s*strong\s*>/gi, "{{/S}}");
	s = s.replace(/<\s*strong\b[^>]*>/gi, "{{S}}");
	s = s.replace(/<[^>]+>/g, "");
	s = s.replace(/\{\{BR\}\}/g, "<br />");
	s = s.replace(/\{\{S\}\}/g, "<strong>");
	s = s.replace(/\{\{\/S\}\}/g, "</strong>");
	return s.trim();
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
 * HM/backend rows that look like real events but carry no actionable shipment info.
 * @param {TrackingEventLike} ev
 * @returns {boolean}
 */
const isNoisePlaceholderTrackingEvent = (ev) => {
	const code = (ev.statusCode || "").toUpperCase();
	const desc = String(ev.statusDescription || "").trim();
	const descLower = desc.toLowerCase();

	if (
		/evento\s+de\s+tipo\s+['"]?predespacho['"]?\s+sin\s+detalle/i.test(desc)
	) {
		return true;
	}

	if (
		(code === "UNKNOWN" || code === "DESCONOCIDO") &&
		descLower.includes("sin detalle")
	) {
		return true;
	}

	return false;
};

/**
 * Drops duplicate rows with the same status + container line + description (system echoes
 * minutes or hours apart). Keeps the earliest timestamp for each key.
 * @param {TrackingEventLike[]|null|undefined} events
 * @returns {TrackingEventLike[]}
 */
export const dedupeTrackingEventsForDisplay = (events) => {
	if (!events?.length) return [];
	const filtered = events.filter((ev) => !isNoisePlaceholderTrackingEvent(ev));
	const sorted = [...filtered].sort((a, b) => eventTimeMs(a) - eventTimeMs(b));
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
 * @returns {{ primary: string, contextLine: string|null, detail: string|null, locationHtml: string|null, statusCode: string }}
 */
export const getTrackingEventPresentation = (ev) => {
	const code = (ev.statusCode || "").toUpperCase();
	const name = (ev.statusName || "").trim();
	const detailRaw = ev.statusDescription ? String(ev.statusDescription).trim() : "";
	const detailPlain = detailRaw ? stripInternalUsuarioClauses(detailRaw) : null;
	const detail = detailPlain ? sanitizeTrustedTrackingHtml(detailPlain) : null;

	const fromMap = STATUS_LABELS_ES[code];

	let primary;
	if (SPANISH_PRIMARY_CODES.has(code) && fromMap) {
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

	const locRaw = ev.location ? String(ev.location).trim() : "";
	const locationHtml = locRaw ? sanitizeTrustedTrackingHtml(locRaw) : null;

	return {
		primary,
		contextLine,
		detail,
		locationHtml,
		statusCode: code,
	};
};
