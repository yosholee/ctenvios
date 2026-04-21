"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { MagnifyingGlassIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { MdOutlineWhatsapp } from "react-icons/md";
import { parseAsString, useQueryState } from "nuqs";
import { ShadowBg1, ShadowBg2 } from "../ui/ShadowBg1";
import { TrackingDetails } from "../TrackingDetails/TrackingDetails";
import { useFetchByInvoiceOrHBL } from "@/Hooks/useFetchByInvoiceOrHBL";
import { isAllowedTrackingSearch } from "@/lib/trackingSearchValidation";

const FORMAT_HINT =
	"Use un número de orden de 1 a 7 dígitos o un HBL que empiece por CTE (ej. CTE2603002CJ302).";

/** URL updates while typing — use replace so history is not one entry per keystroke */
const searchParser = parseAsString.withDefault("").withOptions({ history: "replace" });

export const HeroTracking = () => {
	const [search, setSearch] = useQueryState("search", searchParser);
	const urlDraft = search.trim();

	const [committedQuery, setCommittedQuery] = useState("");
	const didHydrateFromUrl = useRef(false);

	useLayoutEffect(() => {
		if (didHydrateFromUrl.current) return;
		if (typeof window === "undefined") return;
		const fromUrl = new URLSearchParams(window.location.search).get("search")?.trim() ?? "";
		didHydrateFromUrl.current = true;
		if (fromUrl && isAllowedTrackingSearch(fromUrl)) {
			setCommittedQuery(fromUrl);
		}
	}, []);

	const { data: invoice, isLoading, isError, error } = useFetchByInvoiceOrHBL(committedQuery);

	const formatError =
		urlDraft.length > 0 && !isAllowedTrackingSearch(urlDraft) ? FORMAT_HINT : "";
	const isLookupLoading =
		Boolean(committedQuery) &&
		isAllowedTrackingSearch(committedQuery) &&
		isLoading;

	const handleOnSubmit = (e) => {
		e.preventDefault();
		const raw = search.trim();
		if (!raw || !isAllowedTrackingSearch(raw)) return;
		setCommittedQuery(raw);
	};

	return (
		<div className="max-w-7xl mx-auto">
			<ShadowBg1 />
			<div className="grid   px-4   mx-auto container  py-6  lg:pt-20  pb- ">
				<div className=" mt-10 sm:mb-8 sm:flex sm:justify-center ">
					<div className="max-w-xl lg:max-w-lg">
						<div className=" flex flex-col gap-4 ">
							<MapPinIcon
								className={`w-16 h-16 mx-auto text-blue-500 ${
									isLookupLoading ? "animate-spin" : "animate-bounce"
								}`}
							/>
							<h2 className="mt-4 text-center text-2xl font-extrabold tracking-tight text-slate-900 xl:text-3xl xl:leading-[2.5rem]">
								Rastreo de Envíos a Cuba en Tiempo Real
							</h2>
						</div>

						<form onSubmit={handleOnSubmit}>
							<div className="mt-6 flex flex-col  md:flex-row  max-w-md gap-x-4">
								<label htmlFor="search" className="sr-only">
									Traking
								</label>
								<input
									id="search"
									name="search"
									type="text"
									autoComplete="text"
									required
									value={search}
									onChange={(e) => {
										void setSearch(e.target.value);
									}}
									className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2  shadow-sm ring-1 ring-inset ring-blue/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
									placeholder="Nº orden (1–7 dígitos) o HBL (CTE…)"
									title={FORMAT_HINT}
								/>
								<button
									type="submit"
									disabled={isLookupLoading}
									className=" inline-flex justify-center my-4 md:my-0 items-center gap-2 rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
								>
									<MagnifyingGlassIcon className="h-5 w-5" />
									{isLookupLoading ? "Buscando " : "Buscar"}
								</button>
							</div>
						</form>
						{formatError && (
							<p className="mt-3 text-sm text-amber-700" role="status">
								{formatError}
							</p>
						)}
						{isError && (
							<p className="mt-3 text-sm text-red-600" role="alert">
								{error?.message ?? "Algo salió mal. Intente de nuevo."}
							</p>
						)}
					</div>
				</div>
				{invoice == null ? (
					<div className="flex flex-col max-w-2xl mx-auto gap-2 items-start">
						<p className="mt-4 text-md leading-8 text-gray-600">
							Rastree su paquete a Cuba fácilmente. Nuestro sistema de tracking le ofrece
							información actualizada 24/7 sobre sus envíos marítimos o aéreos. Seguimiento seguro,
							rápido y confiable.
						</p>
						<Link
							href="https://api.whatsapp.com/send?phone=%2B17542778810"
							target="_blank"
							rel="noopener noreferrer"
							className="self-center inline-flex items-center gap-2 text-gray-800 hover:text-green-500"
						>
							<MdOutlineWhatsapp className="h-5 w-5" />
							Contáctenos
						</Link>
					</div>
				) : (
					<TrackingDetails invoice={invoice} />
				)}
			</div>
			<ShadowBg2 />
		</div>
	);
};
