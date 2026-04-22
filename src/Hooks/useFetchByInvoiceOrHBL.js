import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function isAllowedTrackingSearch(value) {
   if (value == null || typeof value !== "string") return false;
   const t = value.trim();
   if (!t) return false;
   if (/^\d{1,7}$/.test(t)) return true;
   if (/^cte/i.test(t)) return true;
   return false;
}

export async function getProductData(hbl) {
   try {
      const res = await axios.get(
         `https://api.ctenvios.com/api/v1/tracking/lookup/${hbl}`,
         {
            headers: {
               "Cache-Control": "no-cache",
               Pragma: "no-cache",
            },
         },
      );
      return res.data;
   } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 429) {
         throw new Error("Demasiadas solicitudes. Intente de nuevo en un minuto.");
      }
      return null;
   }
}

export function useFetchByInvoiceOrHBL(id) {
   const trimmed = id?.trim() ?? "";
   const hasSearch = isAllowedTrackingSearch(trimmed);

   return useQuery({
      queryKey: ["fetchProductByHBL", id],
      queryFn: () => getProductData(id),
      enabled: hasSearch,
      staleTime: 0,
      gcTime: 0,
      refetchOnMount: "always",
   });
}
