// Known typos from HM history data
const TYPO_CORRECTIONS = {
	Trasncargo: "Transcargo",
};

/**
 * Fixes known typos in text from HM history
 * @param {string|null} text - The text to correct
 * @returns {string|null} - Corrected text or original if no corrections needed
 */
const fixKnownTypos = (text) => {
	if (!text) return text;
	let corrected = text;
	for (const [typo, correction] of Object.entries(TYPO_CORRECTIONS)) {
		corrected = corrected.replace(new RegExp(typo, "gi"), correction);
	}
	return corrected;
};

// HM Status mapping for event types
const HM_STATUS_MAP = {
	entradarecibida: {
		code: "AT_WAREHOUSE",
		name: "Entrada en almacén",
	},
	transferenciaalmacen: {
		code: "WAREHOUSE_TRANSFER",
		name: "Transferencia entre almacenes",
	},
	despachomensajero: {
		code: "OUT_FOR_DELIVERY",
		name: "Despachado a mensajero",
	},
};


/**
 * Extracts location from the detail text
 * Checks for "almacén X" or "provincia X" patterns
 * @param {string|null} detalle - The detail text
 * @returns {string|null} - The extracted location or null
 */
const extractLocationFromDetalle = (detalle) => {
	if (!detalle) return null;

	// Try to extract warehouse location
	const warehouseRegex = /almac[eé]n\s+([^\.]+)/i;
	const warehouseMatch = detalle.match(warehouseRegex);
	if (warehouseMatch && warehouseMatch[1]) {
		return warehouseMatch[1].trim();
	}

	// Try to extract province (e.g., "para provincia PINAR DEL RIO")
	const provinceRegex = /provincia\s+([^\.]+)/i;
	const provinceMatch = detalle.match(provinceRegex);
	if (provinceMatch && provinceMatch[1]) {
		return provinceMatch[1].trim();
	}

	return null;
};

/**
 * Safely converts a date value to ISO string
 * Returns null if the date is invalid
 * @param {string|Date|null} dateValue - The date value to convert
 * @returns {string|null} - ISO string or null if invalid
 */
const safeToISOString = (dateValue) => {
	if (!dateValue) return null;
	const date = new Date(dateValue);
	if (isNaN(date.getTime())) return null;
	return date.toISOString();
};

/**
 * Legacy parcel events: location checkpoints without statusCode.
 * @param {object} ev
 * @returns {boolean}
 */
const isLegacyLocationOnlyEvent = (ev) => {
	if (!ev || ev.statusCode) return false;
	return ev.updatedAt != null || ev.locationId != null;
};

/**
 * Maps events from the base API (parcels) to normalized tracking event format
 * @param {object} ev - Event from base API (legacy location rows or new status rows)
 * @returns {object} - Normalized tracking event
 */
const mapNewEventToTrackingEvent = (ev) => {
	if (!isLegacyLocationOnlyEvent(ev)) {
		const ts = safeToISOString(ev.timestamp ?? ev.updatedAt);
		return {
			timestamp: ts,
			statusCode: (ev.statusCode || "UNKNOWN").toUpperCase(),
			statusName: ev.statusName ?? ev.statusCode ?? "Unknown",
			statusDescription: ev.statusDescription ?? null,
			location: ev.location ?? null,
			locationId: ev.locationId ?? null,
			updateMethod: ev.updateMethod || "SYSTEM",
			userName: ev.userName ?? null,
			source: ev.source || "NEW",
		};
	}

	const ts = safeToISOString(ev.updatedAt);

	return {
		timestamp: ts,
		statusCode: `LOCATION_${ev.locationId || "UNKNOWN"}`,
		statusName: ev.location || "Unknown",
		statusDescription: null,
		location: ev.location || null,
		locationId: ev.locationId || null,
		updateMethod: "SYSTEM",
		userName: null,
		source: "NEW",
	};
};

/**
 * Maps HM history events to normalized tracking event format
 * @param {object} hm - Event from HM history API
 * @returns {object} - Normalized tracking event
 */
const mapHmHistoryToTrackingEvent = (hm) => {
	// Fix known typos in HM data
	const evento = fixKnownTypos((hm.evento || "").trim());
	const detalle = fixKnownTypos(hm.detalle || "");

	let statusCfg = HM_STATUS_MAP[hm.tipo] || {
		code: hm.tipo ? hm.tipo.toUpperCase() : "HM_EVENT",
		name: evento || "Evento HM",
	};

	const eventoLower = evento.toLowerCase();
	const detalleLower = detalle.toLowerCase();

	// Detect successful delivery
	const isEntregaExitosaByEvento = eventoLower === "entrega exitosa";
	const isEntregaExitosaByDetalle = detalleLower.includes("entrega confirmada");

	if (isEntregaExitosaByEvento || isEntregaExitosaByDetalle) {
		statusCfg = {
			code: "DELIVERED",
			name: "Entrega exitosa",
		};
	}

	const ts = safeToISOString(hm.fecha_objeto || hm.fecha);

	return {
		timestamp: ts,
		statusCode: statusCfg.code,
		statusName: statusCfg.name,
		statusDescription: detalle || null,
		location: extractLocationFromDetalle(detalle),
		locationId: null,
		updateMethod: "HM_HISTORY",
		userName: hm.usuario || null,
		source: "HM",
	};
};

/**
 * Checks if an event is a delivery/terminal event
 * @param {object} ev - The event to check
 * @returns {boolean} - True if it's a delivery event
 */
const isDeliveryEvent = (ev) => {
	const code = (ev.statusCode || "").toUpperCase();
	const name = (ev.statusName || "").trim().toLowerCase();

	return (
		code === "DELIVERED" ||
		name === "entrega exitosa" ||
		name === "entregado"
	);
};

/**
 * Merges and normalizes events from both APIs
 * @param {Array} baseEvents - Events from base API (parcels)
 * @param {Array|object} hmHistoryRaw - Raw HM history response
 * @returns {Array} - Merged, sorted, and deduplicated events
 */
export const mergeAndNormalizeEvents = (baseEvents, hmHistoryRaw) => {
	const hmArray = Array.isArray(hmHistoryRaw)
		? hmHistoryRaw
		: hmHistoryRaw?.historial || [];

	const newEvents = (baseEvents || []).map(mapNewEventToTrackingEvent);
	const hmEvents = (hmArray || []).map(mapHmHistoryToTrackingEvent);

	let merged = [...newEvents, ...hmEvents];

	// 1. Sort: legacy locationId <= 5 first (by locationId), then everything by date
	merged.sort((a, b) => {
		const aLocId = typeof a.locationId === "number" ? a.locationId : Infinity;
		const bLocId = typeof b.locationId === "number" ? b.locationId : Infinity;
		const aIsFixed = aLocId <= 5;
		const bIsFixed = bLocId <= 5;

		if (aIsFixed && bIsFixed) {
			return aLocId - bLocId;
		}
		if (aIsFixed && !bIsFixed) {
			return -1;
		}
		if (!aIsFixed && bIsFixed) {
			return 1;
		}
		const aTime = a.timestamp ? new Date(a.timestamp).getTime() : 0;
		const bTime = b.timestamp ? new Date(b.timestamp).getTime() : 0;
		return aTime - bTime;
	});

	// 2. Remove duplicates
	const deduped = [];
	const seen = new Set();
	for (const ev of merged) {
		const key = `${ev.timestamp}|${ev.statusCode}|${ev.location || ""}|${(ev.statusDescription || "").slice(0, 80)}`;
		if (!seen.has(key)) {
			seen.add(key);
			deduped.push(ev);
		}
	}
	merged = deduped;

	// 3. Handle duplicate delivery events - prefer HM History
	const deliveryEvents = merged.filter(isDeliveryEvent);
	if (deliveryEvents.length > 1) {
		// Check if there's a delivery event from HM History
		const hmDelivery = deliveryEvents.find((ev) => ev.source === "HM");
		if (hmDelivery) {
			// Remove all delivery events from NEW source
			merged = merged.filter(
				(ev) => !isDeliveryEvent(ev) || ev.source === "HM"
			);
		}
	}

	// 4. Detect last terminal event ("Entrega exitosa")
	let lastTerminalIndex = -1;
	merged.forEach((ev, idx) => {
		if (isDeliveryEvent(ev)) {
			lastTerminalIndex = idx;
		}
	});

	// 5. If delivery exists, cut everything after it
	if (lastTerminalIndex >= 0) {
		merged = merged.slice(0, lastTerminalIndex + 1);
	}

	return merged;
};

