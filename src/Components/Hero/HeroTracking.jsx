"use client";
import { React, useState, useEffect } from "react";
import { ShadowBg1, ShadowBg2 } from "../ui/ShadowBg1";
import { MagnifyingGlassIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { TrackingDetails } from "../TrackingDetails/TrackingDetails";
import { useFetchByInvoiceOrHBL } from "@/Hooks/useFetchByInvoiceOrHBL";
import { useRouter, useSearchParams } from "next/navigation";
import { MdOutlineWhatsapp } from "react-icons/md";
import Link from "next/link";

export const HeroTracking = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
	
	const { data: invoice, isLoading, isError, error } = useFetchByInvoiceOrHBL(searchTerm);
	const [hasSearched, setHasSearched] = useState(!!searchParams.get("search"));

	useEffect(() => {
		const currentSearch = searchParams.get("search");
		if (currentSearch) {
			setSearchTerm(currentSearch);
			setHasSearched(true);
		}
	}, [searchParams]);

	const handleOnSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const newSearchTerm = formData.get("search");
		if (newSearchTerm !== searchTerm) {
			setSearchTerm(newSearchTerm);
			setHasSearched(true);
			router.push(`/tracking?search=${encodeURIComponent(newSearchTerm)}`);
		}
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
									hasSearched && isLoading ? "animate-spin" : "animate-bounce"
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
									defaultValue={searchTerm}
									className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2  shadow-sm ring-1 ring-inset ring-blue/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
									placeholder="Buscar por Factura o HBL"
								/>
								<button
									type="submit"
									disabled={isLoading}
									className=" inline-flex justify-center my-4 md:my-0 items-center gap-2 rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
								>
									<MagnifyingGlassIcon className="h-5 w-5" />
									{hasSearched && isLoading ? "Buscando " : "Buscar"}
								</button>
							</div>
						</form>
						{isError && (
							<p className="mt-3 text-sm text-red-600" role="alert">
								{error?.message ?? "Algo salió mal. Intente de nuevo."}
							</p>
						)}
					</div>
				</div>
				{invoice == undefined || invoice == null ? (
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
