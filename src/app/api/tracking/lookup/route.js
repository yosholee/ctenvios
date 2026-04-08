import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rateLimit";
import { isAllowedTrackingSearch } from "@/lib/trackingSearchValidation";

const PRODUCTION_URL = "https://tracking.ctenvios.com/api/v1";
const NEW_TRACKING_BASE =
	process.env.TRACKING_NEW_URL ||
	process.env.NEXT_PUBLIC_TRACKING_NEW_URL ||
	"https://api.ctenvios.com";
const API_KEY = process.env.TRACKING_API_KEY ?? "c3VwYmFzZWNyZXQ=";

const MAX_INPUT_LENGTH = 64;

/**
 * Edge cache: balances fewer invocations vs fresh status.
 * Fresher (default): ~15s at CDN; tune s-maxage up for more cache hits, down for live data.
 */
const CACHE_LOOKUP_OK =
	"public, s-maxage=15, stale-while-revalidate=45, max-age=10";
const CACHE_NO_STORE = "private, no-store";

function validateInput(value) {
	if (!value || typeof value !== "string") return { valid: false, reason: "missing" };
	const trimmed = value.trim();
	if (!trimmed) return { valid: false, reason: "empty" };
	if (trimmed.length > MAX_INPUT_LENGTH) return { valid: false, reason: "too_long" };
	if (!isAllowedTrackingSearch(trimmed)) return { valid: false, reason: "invalid_format" };
	return { valid: true, trimmed };
}

function isNotFoundFromNewApi(data) {
	if (!data) return true;
	if (data?.message?.toLowerCase().includes("not found")) return true;
	if (!data?.parcels?.length) return true;
	return false;
}

function fetchWithTimeout(url, options = {}, ms = 8000) {
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), ms);
	return fetch(url, { ...options, signal: controller.signal }).finally(() =>
		clearTimeout(timeoutId),
	);
}

async function fetchFromNewEndpoint(trimmedId) {
	const isOrderId = /^\d{1,7}$/.test(trimmedId);
	const params = new URLSearchParams(isOrderId ? { order_id: trimmedId } : { tracking: trimmedId });
	const url = `${NEW_TRACKING_BASE}/api/v1/tracking/lookup?${params}`;
	const res = await fetchWithTimeout(url, {}, 8000);
	if (!res.ok) throw new Error(res.statusText);
	return res.json();
}

async function fetchFromProduction(trimmedId) {
	const path =
		trimmedId.length >= 4 && trimmedId.length < 7
			? `parcels/invoice/${trimmedId}`
			: `parcels/hbl/${trimmedId}`;
	const url = `${PRODUCTION_URL}/${path}`;
	const res = await fetchWithTimeout(
		url,
		{ headers: { "api-key": API_KEY } },
		10000,
	);
	if (!res.ok) throw new Error(res.statusText);
	return res.json();
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
					"X-RateLimit-Remaining": String(remaining),
					"Retry-After": String(resetIn),
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
	if (
		trimmedId.length > 3 &&
		(trimmedId.endsWith("CTE") || trimmedId.endsWith("cte"))
	) {
		trimmedId = trimmedId.slice(0, -3).trim();
	}
	if (!trimmedId) {
		return NextResponse.json(
			{ message: "Parámetro de búsqueda inválido" },
			{ status: 400, headers: { "Cache-Control": CACHE_NO_STORE } },
		);
	}

	try {
		const newData = await fetchFromNewEndpoint(trimmedId);
		if (!isNotFoundFromNewApi(newData)) {
			return NextResponse.json(newData, {
				headers: {
					"Cache-Control": CACHE_LOOKUP_OK,
					"X-RateLimit-Remaining": String(remaining - 1),
				},
			});
		}
	} catch {
		// Fall through to production
	}

	try {
		const prodData = await fetchFromProduction(trimmedId);
		return NextResponse.json(prodData, {
			headers: {
				"Cache-Control": CACHE_LOOKUP_OK,
				"X-RateLimit-Remaining": String(remaining - 1),
			},
		});
	} catch (err) {
		return NextResponse.json(
			{ message: "No se encontró el envío" },
			{ status: 404, headers: { "Cache-Control": CACHE_NO_STORE } },
		);
	}
}
