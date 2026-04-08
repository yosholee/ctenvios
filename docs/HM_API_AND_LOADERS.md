# HM API, Loaders & Third-Party Integrations

This document describes how the CTEnvios landing uses the HM (Historial) API, external loaders, and loading patterns.

---

## HM API (Historial / History)

The HM API provides shipment history events for parcels. It is used to enrich tracking data from the main tracking API with additional events (e.g. warehouse movements, delivery confirmations).

### Architecture

```
TrackingCard (parcel.hbl)
    → useFetchHMHistory(hbl)
    → GET /api/historial/[hbl]
    → HM API: http://72.60.114.241/api/historial/envio/{hbl}/
    → mergeAndNormalizeEvents(parcel.events, hmHistory)
    → TrackingHistoryCard(mergedEvents)
```

### Files Involved

| File | Purpose |
|------|---------|
| `src/app/api/historial/[hbl]/route.js` | Proxy to HM API – timeout, cache, error handling |
| `src/Hooks/useFetchHMHistory.js` | React Query hook – fetches via proxy |
| `src/Utils/eventMerger.js` | Merges base events + HM events, normalizes, deduplicates |
| `src/Components/Cards/TrackingCard.jsx` | Uses hook + merger, passes merged events to history card |
| `src/Components/Cards/TrackingHistoryCard.jsx` | Renders events, shows loading spinner when HM is loading |

### Proxy Route (`/api/historial/[hbl]`)

- **Upstream:** `http://72.60.114.241/api/historial/envio/{hbl}/`
- **Timeout:** 2 seconds (AbortController)
- **Cache:** `next: { revalidate: 3600 }` (1 hour)
- **On error/timeout:** Returns `{ historial: [] }` with 400/504

### HM API Response Shape

```json
{
  "historial": [
    {
      "evento": "Entrada en almacén",
      "detalle": "Almacén Miami...",
      "tipo": "entradarecibida",
      "fecha": "2024-01-15T10:00:00",
      "fecha_objeto": "2024-01-15T10:00:00",
      "usuario": "admin"
    }
  ]
}
```

### Event Merger (`eventMerger.js`)

- **Sources:** `NEW` (base API parcels.events) and `HM` (HM historial)
- **Typo fixes:** `Trasncargo` → `Transcargo`
- **Status mapping:** `entradarecibida`, `transferenciaalmacen`, `despachomensajero` → normalized codes
- **Delivery detection:** `entrega exitosa` / `entrega confirmada` → `DELIVERED`
- **Sort:** locationId ≤ 5 first (by locationId), then rest by date
- **Deduplication:** by `timestamp|statusCode|location`
- **Delivery conflicts:** Prefer HM delivery over NEW when duplicates exist
- **Terminal cut:** Events after last delivery are removed

### Hook Usage

```jsx
const { data: hmHistory, isLoading: isLoadingHM } = useFetchHMHistory(parcel?.hbl);
const mergedEvents = useMemo(
  () => mergeAndNormalizeEvents(parcel.events, hmHistory),
  [parcel?.events, hmHistory]
);
```

- **enabled:** Only when `hbl` is non-empty
- **staleTime:** 5 minutes
- **retry:** 1

---

## Loaders & Third-Party Scripts

### TrustIndex (Reviews Widget)

- **Purpose:** Displays customer reviews
- **Script:** `https://cdn.trustindex.io/loader.js`
- **Widget URL:** `https://cdn.trustindex.io/loader.js?f96f64553f08894d5836d420e58`
- **Component:** `src/Components/Reviews/ReviewsWidget.jsx`
- **Strategy:** `afterInteractive` (loads after page becomes interactive)
- **Note:** Host div is cleared in `useEffect` and a placeholder with `src` attribute is appended (TrustIndex uses this to inject the widget)

### Google Analytics (gtag)

- **Purpose:** Analytics tracking
- **Script:** `https://www.googletagmanager.com/gtag/js?id=G-DMGE29VG1R`
- **Location:** `src/app/layout.js`
- **Strategy:** `lazyOnload` (loads when browser is idle)

---

## Loading Patterns

### Dynamic Imports + Loading Fallbacks

Used for code splitting on the home page:

| Component | Dynamic Import | Fallback |
|-----------|----------------|----------|
| `PriceCards` | `dynamic(() => import("@/Components/Cards/PricesCards"))` | `LoadingFallback height="h-80"` |
| `OffersSection` | `dynamic(() => import("./sections/offers-section"))` | `LoadingFallback height="h-80"` |
| `TrackingSection` | `dynamic(() => import("./sections/tracking-section"))` | `LoadingFallback height="h-80"` |
| `NewsLetter` | `dynamic(() => import("@/Components/Newsletter/Newsletter"))` | `LoadingFallback height="h-64"` |
| `AnimatedListEvents` | `dynamic(() => import("@/Components/Animated/animated-list-events"))` | `h-[500px] rounded-xl bg-white/60` |

### LoadingFallback

- **Location:** `src/app/page.js`
- **UI:** Centered spinner (`animate-spin`, `h-12 w-12`, `border-t-2 border-b-2 border-gray-900`)
- **Props:** `height` – e.g. `h-80`, `h-64`

### TrackingHistoryCard Loading

- **Component:** `src/Components/Cards/TrackingHistoryCard.jsx`
- **Prop:** `isLoading` – shows "Cargando historial..." spinner
- **Behavior:** Spinner appears below existing events when HM is loading; "No hay eventos disponibles" only when `!isLoading && !hasEvents`

### Suspense (Tracking Page)

- **Location:** `src/app/tracking/page.jsx`
- **Fallback:** `<div>Cargando...</div>` for search params–dependent content

---

## Reusing on Other Landing Pages

1. **HM API:** Copy proxy route, hook, and `eventMerger.js`. Use `TrackingCard` + `TrackingHistoryCard` or adapt to your UI.
2. **TrustIndex:** Use `ReviewsWidget` or replicate the Script + host div pattern.
3. **Dynamic imports:** Use `next/dynamic` with `loading` for heavy sections.
4. **LoadingFallback:** Reuse or create similar spinners for consistency.
