import { lazy, Suspense } from "react";
import Link from "next/link";
import { TrackingContent } from "@/Components/Content/TrackingContent";
import { Hero } from "@/Components/Hero/Hero";
import NewsLetter from "@/Components/Newsletter/Newsletter";
import { SocialMedia } from "@/Components/SocialMedia/SocialMedia";
import { Stats } from "@/Components/Stats/Stats";
import Faq from "@/Components/Faq/Faq";
import { OffersSection } from "./sections/offers-section";

const PriceCards = lazy(() => import("@/Components/Cards/PricesCards"));
const TrackingSection = lazy(() => import("./sections/tracking-section"));

export const metadata = {
	title: "Envíos a Cuba desde Miami | Agencia CTEnvios",
	description:
		"CTEnvios es tu agencia de envíos a Cuba desde Miami: marítimo y aéreo, precios por libra, entrega puerta a puerta y tracking.",
	keywords: [
		"envíos a cuba",
		"envíos a cuba desde miami",
		"agencia envíos cuba miami",
		"paquetería cuba miami",
		"enviar paquete a cuba precio",
		"envío puerta a puerta cuba",
	],
	alternates: {
		canonical: "/",
	},
	openGraph: {
		title: "Envíos a Cuba desde Miami | CTEnvios",
		description:
			"Agencia de paquetería a Cuba con envíos marítimos y aéreos, cotización rápida y soporte por WhatsApp.",
		url: "https://ctenvios.com",
		type: "website",
	},
};

const LoadingFallback = ({ height }) => (
	<div className={`flex justify-center items-center ${height}`}>
		<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
	</div>
);
export default function Home() {
	return (
		<main>
			<Hero />
		
			<Suspense fallback={<LoadingFallback height="h-80" />}>
				<PriceCards />
				<OffersSection />
				<TrackingSection />
			</Suspense>
			<Stats />
			<TrackingContent />
			<SocialMedia />
			<section className="mx-auto mt-2 max-w-5xl px-4">
				<h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
					Servicios de envíos a Cuba más buscados
				</h2>
				<p className="mt-3 text-gray-600">
					Elige el servicio ideal según tu presupuesto, urgencia y tipo de paquete.
				</p>
				<div className="mt-5 flex flex-wrap gap-3">
					<Link href="/envios-maritimos-cuba" className="rounded-full border px-4 py-2 text-sm font-semibold">
						Envíos marítimos a Cuba
					</Link>
					<Link href="/envios-aereos-cuba" className="rounded-full border px-4 py-2 text-sm font-semibold">
						Envíos aéreos a Cuba
					</Link>
					<Link href="/envio-alimentos-cuba" className="rounded-full border px-4 py-2 text-sm font-semibold">
						Envío de alimentos
					</Link>
					<Link
						href="/envio-electrodomesticos-cuba"
						className="rounded-full border px-4 py-2 text-sm font-semibold"
					>
						Envío de electrodomésticos
					</Link>
					<Link href="/envios-cuba-miami" className="rounded-full border px-4 py-2 text-sm font-semibold">
						Agencia en Miami
					</Link>
					<Link href="/blog" className="rounded-full border px-4 py-2 text-sm font-semibold">
						Blog aduanal y precios
					</Link>
				</div>
			</section>
			<Faq />
			<NewsLetter />
		</main>
	);
}
