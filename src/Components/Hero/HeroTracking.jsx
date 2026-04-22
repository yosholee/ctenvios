"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { MagnifyingGlassIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { MdOutlineWhatsapp } from "react-icons/md";
import { ShadowBg1, ShadowBg2 } from "../ui/ShadowBg1";
import { TrackingDetails } from "../TrackingDetails/TrackingDetails";
import { useFetchByInvoiceOrHBL } from "@/Hooks/useFetchByInvoiceOrHBL";
import {
	isAllowedTrackingSearch,
	stripTrackingInputSuffix,
} from "@/lib/trackingSearchValidation";

const FORMAT_HINT =
	"Use un número de orden de 1 a 7 dígitos o un HBL que empiece por CTE (ej. CTE2603002CJ302).";

const normalizeForLookup = (value) => stripTrackingInputSuffix(value);

export const HeroTracking = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const urlSearch = searchParams.get("search") ?? "";

	const [inputValue, setInputValue] = useState(urlSearch);
	const [searchTerm, setSearchTerm] = useState(urlSearch);

	useEffect(() => {
		const normalized = normalizeForLookup(urlSearch);
		if (urlSearch && isAllowedTrackingSearch(normalized)) {
			setInputValue(urlSearch);
			setSearchTerm(normalized);
		}
	}, [urlSearch]);

	const normalizedInput = normalizeForLookup(inputValue);
	const inputAllowed = isAllowedTrackingSearch(normalizedInput);

	const { data: invoice, isLoading, isError, isFetched, error } =
		useFetchByInvoiceOrHBL(searchTerm);

	const formatError =
		inputValue.trim().length > 0 && !inputAllowed ? FORMAT_HINT : "";

	const showNotFound =
		isFetched && !isError && invoice === null && Boolean(searchTerm.trim());

	const handleOnSubmit = (e) => {
		e.preventDefault();
		if (!inputAllowed) return;
		const normalized = normalizedInput;
		setSearchTerm(normalized);
		const params = new URLSearchParams(searchParams.toString());
		params.set("search", normalized);
		const base = pathname || "/tracking";
		router.replace(`${base}?${params.toString()}`, { scroll: false });
	};

	return (
		<div className="max-w-7xl mx-auto">
			<ShadowBg1 />
			<div className="grid px-4 mx-auto container py-6 lg:pt-20 pb-">
				<div className="mt-10 sm:mb-8 sm:flex sm:justify-center">
					<div className="max-w-xl lg:max-w-lg w-full">
						<div className="flex flex-col gap-4">
							<MapPinIcon
								className={`w-16 h-16 mx-auto text-blue-500 ${
									isLoading && Boolean(searchTerm.trim()) ? "animate-spin" : "animate-bounce"
								}`}
							/>
							<h2 className="mt-4 text-center text-2xl font-extrabold tracking-tight text-slate-900 xl:text-3xl xl:leading-[2.5rem]">
								Rastreo de Envíos a Cuba en Tiempo Real
							</h2>
							<p className="text-center text-sm text-slate-600 max-w-md mx-auto">
								Ingrese su número de orden (1–7 dígitos) o HBL (CTE…) y pulse Buscar.
							</p>
						</div>

						<div className="mt-8 rounded-2xl bg-white/90 ring-1 ring-slate-900/10 shadow-md px-4 py-6 sm:px-8 sm:py-8">
							<h3 className="text-lg font-semibold text-slate-900">Buscar envío</h3>
							<p className="mt-1 text-sm text-slate-500">
								El enlace se actualiza al buscar; la consulta solo se ejecuta al pulsar el botón.
							</p>
							<form onSubmit={handleOnSubmit} className="mt-6">
								<div className="flex flex-col md:flex-row max-w-md gap-x-4 gap-y-3 md:items-stretch">
									<label htmlFor="search" className="sr-only">
										Búsqueda
									</label>
									<input
										id="search"
										name="search"
										type="text"
										autoComplete="off"
										value={inputValue}
										onChange={(e) => setInputValue(e.target.value)}
										className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2.5 shadow-sm ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
										placeholder="Nº orden (1–7 dígitos) o HBL (CTE…)"
										title={FORMAT_HINT}
									/>
									<button
										type="submit"
										disabled={isLoading || !inputAllowed}
										className="inline-flex justify-center items-center gap-2 rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:opacity-60 disabled:pointer-events-none md:min-w-[140px]"
									>
										{isLoading ? (
											<>
												<Loader2 className="h-5 w-5 animate-spin shrink-0" aria-hidden />
												Buscando
											</>
										) : (
											<>
												<MagnifyingGlassIcon className="h-5 w-5 shrink-0" aria-hidden />
												Buscar
											</>
										)}
									</button>
								</div>
							</form>
						</div>

						{formatError && (
							<p className="mt-3 text-sm text-amber-700" role="status">
								{formatError}
							</p>
						)}
						{isError && (
							<div
								className="mt-6 max-w-md mx-auto rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-rose-900"
								role="alert"
							>
								<p className="font-semibold text-sm">No se encontraron resultados</p>
								<p className="mt-1 text-sm text-rose-800/90">
									{error?.message ??
										"Verifique el número e intente de nuevo. Puede buscar por HBL o número de orden."}
								</p>
							</div>
						)}
						{showNotFound && (
							<div className="mt-6 max-w-2xl mx-auto rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 px-6 py-10 text-center">
								<MapPinIcon
									className="mx-auto h-10 w-10 text-slate-400"
									aria-hidden
								/>
								<p className="mt-3 font-medium text-slate-900">No se encontraron resultados</p>
								<p className="mt-2 text-sm text-slate-600 max-w-sm mx-auto">
									Verifique el número e intente de nuevo. Puede buscar por HBL o número de orden.
								</p>
							</div>
						)}
					</div>
				</div>
				{invoice ? (
					<TrackingDetails invoice={invoice} />
				) : showNotFound ? null : (
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
				)}
			</div>
			<ShadowBg2 />
		</div>
	);
};
