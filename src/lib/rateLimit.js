/**
 * In-memory IP-based rate limiter.
 * Resets on server restart. For production at scale, use Redis (e.g. @upstash/ratelimit).
 */

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 15;

const store = new Map();

function getClientIp(request) {
	const forwarded = request.headers.get("x-forwarded-for");
	if (forwarded) return forwarded.split(",")[0].trim();
	return request.headers.get("x-real-ip") ?? "unknown";
}

/**
 * @param {Request} request
 * @returns {{ allowed: boolean; remaining: number; resetIn: number }}
 */
export function checkRateLimit(request) {
	const ip = getClientIp(request);
	const now = Date.now();
	let entry = store.get(ip);

	if (!entry || now > entry.resetAt) {
		entry = { count: 0, resetAt: now + WINDOW_MS };
		store.set(ip, entry);
	}

	entry.count += 1;

	// Prune old entries periodically
	if (store.size > 1000) {
		for (const [key, val] of store.entries()) {
			if (now > val.resetAt) store.delete(key);
		}
	}

	return {
		allowed: entry.count <= MAX_REQUESTS,
		remaining: Math.max(0, MAX_REQUESTS - entry.count),
		resetIn: Math.ceil((entry.resetAt - now) / 1000),
	};
}
