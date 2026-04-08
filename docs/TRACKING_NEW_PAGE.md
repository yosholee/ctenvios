# Tracking on a new page — implementation guide

Use this checklist to add the same tracking flow to **another Next.js page** (same app or another landing).

For full technical detail, see **[TRACKING_LOOKUP_IMPLEMENTATION.md](./TRACKING_LOOKUP_IMPLEMENTATION.md)**.

---

## Prerequisites

| Requirement | Notes |
|-------------|--------|
| **React Query** | `@tanstack/react-query` + `QueryClientProvider` in your layout (this project already has it). |
| **API route** | `GET /api/tracking/lookup` must exist (or change the hook URL). |
| **Env vars** | `TRACKING_NEW_URL` / `NEXT_PUBLIC_TRACKING_NEW_URL`, optional `TRACKING_API_KEY`. |

---

## Files to copy (new repo or monorepo package)

Copy these paths **as-is** (adjust imports to your alias, e.g. `@/`):

1. `src/lib/rateLimit.js`
2. `src/app/api/tracking/lookup/route.js` → keep under `app/api/tracking/lookup/route.js`
3. `src/Hooks/useFetchByInvoiceOrHBL.js`
4. UI (optional but recommended): `TrackingDetails.jsx`, `TrackingCard.jsx`, `TrackingHistoryCard.jsx`, HM proxy `src/app/api/historial/[hbl]/route.js` + `useFetchHMHistory.js` + `eventMerger.js` if you want merged history.

---

## Minimal new page pattern

### 1. Client component (search + results)

```jsx
"use client";

import { useState } from "react";
import { useFetchByInvoiceOrHBL } from "@/Hooks/useFetchByInvoiceOrHBL";
import { TrackingDetails } from "@/Components/TrackingDetails/TrackingDetails";

export function TrackingSearchSection() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: invoice, isLoading, isError, error } =
    useFetchByInvoiceOrHBL(searchTerm);

  return (
    <section>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const value = new FormData(e.currentTarget).get("search");
          setSearchTerm(String(value ?? "").trim());
        }}
      >
        <input name="search" placeholder="Factura, HBL o número de orden" />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Buscando…" : "Buscar"}
        </button>
      </form>

      {isError && (
        <p role="alert" className="text-red-600">
          {error?.message ?? "Algo salió mal."}
        </p>
      )}

      {invoice != null && <TrackingDetails invoice={invoice} />}
    </section>
  );
}
```

### 2. Page shell (optional URL `?search=`)

If you want shareable links like `/mi-tracking?search=CTE123`:

- Wrap content in **`<Suspense>`** (required when using `useSearchParams` in Next.js App Router).
- Read `search` from `useSearchParams()` and pass it as initial `searchTerm` (see `HeroTracking.jsx`).

### 3. Server `page.jsx` / `page.tsx`

```jsx
import { Suspense } from "react";
import { TrackingSearchSection } from "./TrackingSearchSection"; // your client component

export default function MiTrackingPage() {
  return (
    <Suspense fallback={<p>Cargando…</p>}>
      <TrackingSearchSection />
    </Suspense>
  );
}
```

---

## Hook behavior (quick reference)

| Input | Behavior |
|-------|----------|
| Empty / whitespace | No request (`enabled: false`). |
| `1–7` digits only | `order_id` query param. |
| Starts with `CTE` (any case) | `tracking` query param; trailing `CTE`/`cte` stripped if length &gt; 3. |
| Anything else | No request; API returns 400. |

**Errors:** HTTP **429** → Spanish message: *Demasiadas solicitudes. Intente de nuevo en un minuto.*

**Success shape:** `invoice` with `parcels[]`, `agency`, `invoiceId`, `province`, `city` (see full doc).

---

## Environment (production)

```env
TRACKING_NEW_URL=https://your-new-api-host
TRACKING_API_KEY=...   # if production fallback needs auth
CONTACT_TO_EMAIL=...   # unrelated to tracking; only for contact forms
```

---

## Sanity check

1. `GET /api/tracking/lookup?tracking=YOUR_HBL` returns JSON or 404 from proxy.
2. Submitting a known **order id** (digits only) hits `?order_id=...`.
3. After 15+ requests/min from same IP, you get **429** and the UI shows the rate-limit message.

---

## Related docs

- [TRACKING_LOOKUP_IMPLEMENTATION.md](./TRACKING_LOOKUP_IMPLEMENTATION.md) — proxy logic, validation, HM merge
- [HM_API_AND_LOADERS.md](./HM_API_AND_LOADERS.md) — historial API + loaders
