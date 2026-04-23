import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rateLimit";
import { isAllowedTrackingSearch } from "@/lib/trackingSearchValidation";

const NEW_TRACKING_BASE =
	process.env.TRACKING_NEW_URL ||
	process.env.NEXT_PUBLIC_TRACKING_NEW_URL ||
	"https://api.ctenvios.com";

const MAX_INPUT_LENGTH = 64;
const CACHE_LOOKUP_OK = "public, s-maxage=60, stale-while-revalidate=300, max-age=60";
const CACHE_NO_STORE = "private, no-store";

function validateInput(value) {
	if (!value || typeof value !== "string") return { valid: false };
	const trimmed = value.trim();
	if (!trimmed || trimmed.length > MAX_INPUT_LENGTH) return { valid: false };
	if (!isAllowedTrackingSearch(trimmed)) return { valid: false };
	return { valid: true, trimmed };
}

function fetchWithTimeout(url, options = {}, ms = 8000) {
	const controller = new AbortController();
	const id = setTimeout(() => controller.abort(), ms);
	return fetch(url, { ...options, signal: controller.signal }).finally(() =>
		clearTimeout(id),
	);
}

async function fetchFromNewApi(trimmedId) {
	const isOrderId = /^\d{1,7}$/.test(trimmedId);
	const params = new URLSearchParams(
		isOrderId ? { order_id: trimmedId } : { tracking: trimmedId },
	);
	const url = `${NEW_TRACKING_BASE}/api/v1/tracking/lookup?${params}`;
	const res = await fetchWithTimeout(url, {}, 8000);
	if (!res.ok) throw new Error(`New API responded ${res.status}`);
	const data = await res.json();
	if (!data?.parcels?.length) throw new Error("No parcels in new API response");
	return data;
}

export async function GET(request) {
	const { searchParams } = new URL(request.url);
	const tracking = searchParams.get("tracking");
	const orderId = searchParams.get("order_id");
	const value = orderId ?? tracking;

	const { allowed, remaining, resetIn } = checkRateLimit(request);
	if (!allowed) {
		return NextResponse.json(
			{ message: "Demasiadas solicitudes. Intente de nuevo en un minuto." },
			{
				status: 429,
				headers: {
					"Cache-Control": CACHE_NO_STORE,
					"Retry-After": String(resetIn),
					"X-RateLimit-Remaining": String(remaining),
				},
			},
		);
	}

	const validation = validateInput(value);
	if (!validation.valid) {
		return NextResponse.json(
			{ message: "Parámetro de búsqueda inválido" },
			{ status: 400, headers: { "Cache-Control": CACHE_NO_STORE } },
		);
	}

	let trimmedId = validation.trimmed;
	if (trimmedId.length > 3 && /cte$/i.test(trimmedId)) {
		trimmedId = trimmedId.slice(0, -3).trim();
	}
	if (!trimmedId) {
		return NextResponse.json(
			{ message: "Parámetro de búsqueda inválido" },
			{ status: 400, headers: { "Cache-Control": CACHE_NO_STORE } },
		);
	}

	try {
		const data = await fetchFromNewApi(trimmedId);
		return NextResponse.json(data, {
			headers: {
				"Cache-Control": CACHE_LOOKUP_OK,
				"X-RateLimit-Remaining": String(remaining - 1),
			},
		});
	} catch (err) {
		console.error("[tracking/lookup] new API error:", err?.message);
		return NextResponse.json(
			{ message: "No se encontró el envío" },
			{ status: 404, headers: { "Cache-Control": CACHE_NO_STORE } },
		);
	}
}
