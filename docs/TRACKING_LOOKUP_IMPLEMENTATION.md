# Tracking Lookup Implementation Reference

This document describes the tracking lookup flow implemented for the CTEnvios landing page. Use it as a reference when adding the same approach to other landing pages.

> **Cursor rule:** `.cursor/rules/tracking-lookup.mdc` – applies when editing HeroTracking, useFetchByInvoiceOrHBL, or `/api/tracking/**`.

> **New page checklist:** [TRACKING_NEW_PAGE.md](./TRACKING_NEW_PAGE.md)

---

## Overview

The tracking search:
1. **First** tries the new API (`/api/v1/tracking/lookup`)
2. **Then** falls back to production (`tracking.ctenvios.com`) if not found
3. Runs through a **proxy API route** with rate limiting and validation
4. Supports **tracking number** and **order_id** (numeric-only) lookups

---

## Architecture

```
User Input → useFetchByInvoiceOrHBL hook → /api/tracking/lookup (proxy)
                                                    ↓
                                    Rate limit + validation
                                                    ↓
                                    New API (?tracking= or ?order_id=)
                                                    ↓ (if not found)
                                    Production API (parcels/invoice or parcels/hbl)
                                                    ↓
                                    Response → TrackingDetails UI
```

---

## Files Involved

| File | Purpose |
|------|---------|
| `src/Hooks/useFetchByInvoiceOrHBL.js` | React Query hook – calls proxy, handles errors |
| `src/app/api/tracking/lookup/route.js` | Proxy API – rate limit, validation, new→production fallback |
| `src/lib/rateLimit.js` | IP-based rate limiter (15 req/min per IP) |
| `src/Components/Hero/HeroTracking.jsx` | Search form + error display |
| `src/Components/TrackingDetails/TrackingDetails.jsx` | Renders `invoice.parcels` |
| `src/Components/Cards/TrackingCard.jsx` | Renders each parcel |

---

## API Proxy (`/api/tracking/lookup`)

**Query params:**
- `tracking` – tracking number (e.g. `CTE2603002CJ302`)
- `order_id` – numeric order ID (e.g. `1`, `12`)

**Logic:**
- If input is digits only → use `order_id`
- Otherwise → use `tracking`
- New API: `GET {NEW_TRACKING_BASE}/api/v1/tracking/lookup?tracking=X` or `?order_id=X`
- Production: `parcels/invoice/{id}` (4–6 chars) or `parcels/hbl/{id}` (else)
- "Not found" from new API: `message` contains "not found" or no `parcels` array

**Rate limit:** 15 requests/minute per IP (in-memory)

**Validation** (`src/lib/trackingSearchValidation.js`):
- Max 64 chars
- **Order id:** `1–7` digits only
- **Tracking / HBL:** must start with `CTE` (case-insensitive)
- Trailing `CTE`/`cte` stripped only when input length &gt; 3

---

## Environment Variables

```env
# New tracking API base (default: http://localhost:3000)
TRACKING_NEW_URL=http://localhost:3000
# or
NEXT_PUBLIC_TRACKING_NEW_URL=http://localhost:3000

# Production API key (optional, has default)
TRACKING_API_KEY=c3VwYmFzZWNyZXQ=
```

---

## Hook Usage

```jsx
const { data: invoice, isLoading, isError, error } = useFetchByInvoiceOrHBL(searchTerm);

// Query only runs when input is valid (numeric or ≥3 chars)
// 429 rate limit throws Error with Spanish message
```

---

## Expected Response Shape

Both APIs must return (or be normalized to):

```json
{
  "parcels": [
    {
      "hbl": "...",
      "description": "...",
      "events": [...]
    }
  ],
  "agency": "...",
  "invoiceId": "...",
  "province": "...",
  "city": "..."
}
```

---

## Reusing on Other Landing Pages

1. **Copy or share** the hook, API route, and rate limit utility.
2. **Add a search form** that updates `searchTerm` and passes it to `useFetchByInvoiceOrHBL(searchTerm)`.
3. **Render** `TrackingDetails` when `invoice` has data; show error when `isError`.
4. **URL sync** (optional): use `?search=` in the URL and `useSearchParams` like `HeroTracking`.
5. **Ensure** the proxy route is under `/api/tracking/lookup` or update the hook’s fetch URL.

---

## Key Implementation Details

- **Input trimming:** Remove "CTE" suffix before lookup.
- **Order ID detection:** `/^\d+$/.test(trimmed)` → use `order_id` param.
- **Enabled condition:** `isAllowedTrackingSearch(trimmed)` (1–7 digits or `CTE…` prefix)
- **Error handling:** 429 → show "Demasiadas solicitudes. Intente de nuevo en un minuto."
- **Empty/not found:** Return `null` from hook → UI shows placeholder or "no encontrado".
